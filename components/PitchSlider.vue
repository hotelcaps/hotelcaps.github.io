<template>
  <!-- Fixed full-screen container, sits above absolutely everything -->
  <div 
    class="fixed inset-0 w-screen h-screen bg-black z-[9999] overflow-hidden select-none"
    :class="{ 'cursor-none': isCursorHidden }"
    @mousemove="wakeCursor"
  >
    
    <!-- Slides Container: Removed Vue inline styles. GSAP handles visibility entirely. -->
    <div 
      v-for="(slide, index) in slides" 
      :key="slide.id"
      :ref="el => { if (el) slideRefs[index] = el }"
      class="absolute inset-0 w-full h-full flex items-center justify-center opacity-0 pitch-slide"
    >
      <img 
        :src="slide.image" 
        :alt="slide.alt" 
        class="w-full h-full object-contain"
      />
    </div>

    <!-- Invisible Click Zones for Navigation -->
    <div 
      class="absolute inset-y-0 left-0 w-1/2 z-20 cursor-w-resize" 
      @click="prevSlide"
    ></div>
    <div 
      class="absolute inset-y-0 right-0 w-1/2 z-20 cursor-e-resize" 
      @click="nextSlide"
    ></div>

    <!-- Subtle Navigation Hint -->
    <div 
      ref="hintRef"
      class="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 text-white/40 font-sans text-xs sm:text-sm tracking-[0.2em] uppercase pointer-events-none"
    >
      Click or use arrows to navigate &bull; Esc to exit
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';

const props = defineProps({
  slides: {
    type: Array,
    required: true
  }
});

// --- REFS & STATE ---
const slideRefs = ref([]);
const hintRef = ref(null);
const currentIndex = ref(0);
const isAnimating = ref(false);

const isCursorHidden = ref(false);
let cursorTimeout = null;

// --- FULLSCREEN LOGIC ---
const enforceFullscreen = () => {
  const elem = document.documentElement;
  if (!document.fullscreenElement) {
    elem.requestFullscreen().catch(() => {
      // Silently catch the error if the browser requires a hard user gesture.
    });
  }
};

const wakeCursor = () => {
  isCursorHidden.value = false;
  clearTimeout(cursorTimeout);
  cursorTimeout = setTimeout(() => {
    isCursorHidden.value = true;
  }, 2500); 
};

// --- ANIMATION LOGIC ---
const changeSlide = (newIndex) => {
  if (isAnimating.value || newIndex === currentIndex.value) return;
  if (newIndex < 0 || newIndex >= props.slides.length) return;

  enforceFullscreen();
  isAnimating.value = true;
  wakeCursor();

  const currentEl = slideRefs.value[currentIndex.value];
  const nextEl = slideRefs.value[newIndex];

  // Stage the next slide immediately above the current one
  gsap.set(nextEl, { zIndex: 20 });
  gsap.set(currentEl, { zIndex: 10 });

  const tl = gsap.timeline({
    onComplete: () => {
      // Clean up layers and unlock inputs
      gsap.set(currentEl, { zIndex: 0, opacity: 0, scale: 1 });
      gsap.set(nextEl, { zIndex: 10 });
      currentIndex.value = newIndex;
      isAnimating.value = false;
    }
  });

  // Crossfade with scale inversion
  tl.fromTo(nextEl,
    { opacity: 0, scale: 1.04 }, 
    { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.inOut' },
    0
  )
  .to(currentEl,
    { opacity: 0, scale: 0.96, duration: 1.5, ease: 'power2.inOut' }, 
    0
  );
};

const nextSlide = () => changeSlide(currentIndex.value + 1);
const prevSlide = () => changeSlide(currentIndex.value - 1);

// --- KEYBOARD CONTROLS ---
const handleKeydown = (e) => {
  if (e.key === 'ArrowRight' || e.key === ' ') {
    e.preventDefault(); // FIX: Stops the browser from scrolling down on Space/Arrows
    nextSlide();
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault(); // FIX: Stops the browser from scrolling
    prevSlide();
  }
};

// --- LIFECYCLE HOOKS ---
onMounted(() => {
  // FIX: Explicitly set the first slide to visible via GSAP to prevent Vue reactivity conflicts
  if (slideRefs.value.length > 0) {
    gsap.set(slideRefs.value[0], { opacity: 1, zIndex: 10 });
  }

  enforceFullscreen();
  wakeCursor();
  window.addEventListener('keydown', handleKeydown);

  // Fade out hint after 4s
  gsap.to(hintRef.value, { opacity: 0, duration: 2, delay: 4, ease: 'power2.inOut' });
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
  clearTimeout(cursorTimeout);
  
  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {});
  }
});
</script>