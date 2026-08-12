<script setup>
import { ref, onMounted, onUnmounted, markRaw } from 'vue';
import Swiper from 'swiper';
import { Navigation, EffectFade, Autoplay } from 'swiper/modules';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PhUser } from '@phosphor-icons/vue';
import IconHexagon from '~/components/icons/IconHexagon.vue';

// Import Swiper's CSS
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

// Register the GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// --- DATA-DRIVEN CONTENT ---
const testimonials = ref([
  { quote: "An absolutely unforgettable experience. The attention to detail and the warmth of the staff made our stay perfect. We're already planning our next visit!", name: "Priya Sharma", location: "Mumbai, India" },
  { quote: "From the stunning views to the impeccable service, everything exceeded our expectations. It felt like a true home away from home. Highly recommended.", name: "Johnathan Lee", location: "Singapore" },
  { quote: "The perfect blend of luxury and comfort. We were blown away by the quality of the amenities and the serene atmosphere. A five-star experience all around.", name: "Aisha Al-Farsi", location: "Dubai, UAE" },
]);

const galleryImages = ref([
  { src: '/images/home/testimonial/rooms-t.jpg', alt: 'A beautifully set up hall for an event' },
  { src: '/images/home/testimonial/restaurant-t.jpg', alt: 'The welcoming exterior of Hotel CAPS' },
  { src: '/images/home/testimonial/hall-t.jpg', alt: 'A close-up of a luxurious suite' },
  { src: '/images/home/testimonial/caps-t.jpg', alt: 'A delicious dish served at the restaurant' }
]);

// Refs for GSAP and Swiper
const main = ref(null);
const swiperEl = ref(null);

// --- ANIMATION & LOGIC ---
onMounted(() => {
  const testimonialSwiper = new Swiper(swiperEl.value, {
    modules: [Navigation, EffectFade, Autoplay],
    loop: true,
    effect: 'fade',
    fadeEffect: { crossFade: true },
    autoplay: { delay: 5000, disableOnInteraction: false },
    navigation: {
      nextEl: '.testimonial-slider .swiper-button-next',
      prevEl: '.testimonial-slider .swiper-button-prev',
    },
  });

  let ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: main.value, start: "top 75%" }
    });

    // Animate the text content column
    tl.from('.text-content-col', { opacity: 0, x: -50, duration: 0.8, ease: 'power3.out' });

    // --- Converging Gallery Animation ---
    const galleryItems = gsap.utils.toArray('.gallery-item');
    const startPositions = [
      { x: -50, y: -50 }, // Top-left
      { x: 50, y: -50 },  // Top-right
      { x: -50, y: 50 },  // Bottom-left
      { x: 50, y: 50 }   // Bottom-right
    ];

    galleryItems.forEach((item, index) => {
      tl.from(item, {
        opacity: 0,
        x: startPositions[index].x,
        y: startPositions[index].y,
        duration: 0.7,
        ease: 'power3.out'
      }, "-=0.6"); // Overlap animations for a fluid effect
    });

    // Animate the Read Review Button
    tl.from('.review-btn-container', { 
      opacity: 0, 
      y: 30, 
      duration: 0.6, 
      ease: 'power3.out' 
    }, "-=0.4");

  }, main.value);

  onUnmounted(() => {
    ctx.revert();
  });
});
</script>

<template>
  <section ref="main" id="testimonials-component" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 overflow-hidden">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      
      <!-- Left Column: Text Content & Slider -->
      <div class="text-content-col space-y-8">
        <div>
          <p class="text-sm font-bold uppercase tracking-widest text-purple-700">Testimonials</p>
          <h2 class="text-gray-800 text-3xl sm:text-4xl lg:text-4xl font-display font-semibold tracking-wider mt-2">What Our Guests Say</h2>
          <p class="mt-4 text-lg text-gray-600 font-body">Hear directly from our valued guests about their memorable experiences and unforgettable stays with us.</p>
        </div>

        <!-- Swiper Slider -->
        <div class="testimonial-slider relative h-72">
          <div ref="swiperEl" class="swiper h-full">
            <div class="swiper-wrapper">
              <!-- Refactored slide structure for correct layout -->
              <div v-for="(testimonial, index) in testimonials" :key="index" class="swiper-slide flex items-center">
                <div class="flex items-start">
                  <!-- Vertical Bar -->
                  <div class="w-1 bg-purple-500 rounded-full flex-shrink-0 self-stretch"></div>
                  <!-- Content -->
                  <div class="pl-0">
                    <p class="testimonial-quote py-4 pr-3 text-lg md:text-lg text-gray-700 bg-purple-200 rounded-e-xl leading-relaxed font-body italic">
                      "{{ testimonial.quote }}"
                    </p>
                    <!-- Author Block -->
                    <div class="mt-4 flex items-center absolute bottom-0 space-x-4">
                      <IconHexagon class="text-purple-500 w-16 h-16" />
                      <div>
                        <p class="font-bold text-gray-800 font-sans">{{ testimonial.name }}</p>
                        <p class="text-sm text-gray-500 font-sans">{{ testimonial.location }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Navigation -->
          <div class="absolute bottom-0 right-0 flex space-x-2 z-10">
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </div>
        </div>
      </div>

      <!-- Right Column: 2x2 Image Gallery -->
      <div class="image-gallery-col">
        <div class="grid grid-cols-2 grid-rows-2 gap-4 aspect-square">
          <div v-for="(image, index) in galleryImages" :key="index" class="gallery-item group relative rounded-2xl overflow-hidden shadow-lg">
            <img 
              :src="image.src" 
              :alt="image.alt"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-black/10"></div>
          </div>
        </div>
      </div>

    </div>

    <!-- Read Reviews Button (Bottom Center) -->
    <div class="review-btn-container w-full flex justify-center mt-12 lg:mt-16">
      <a 
        href="https://search.google.com/local/reviews?placeid=ChIJ3wXSZcxtqDsRPs_NLF5MtAo" 
        target="_blank" 
        rel="noopener noreferrer"
        class="relative overflow-hidden inline-flex items-center justify-center px-8 py-2.5 rounded-lg border-2 border-purple-600 font-sans font-normal text-purple-700 group transition-all duration-300 shadow-[0_4px_12px_rgba(147,51,234,0.15)] hover:shadow-[0_6px_20px_rgba(147,51,234,0.3)] active:scale-95"
      >
        <!-- Left-to-Right Hover Fill -->
        <span class="absolute inset-0 w-full h-full bg-purple-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
        
        <!-- Button Text -->
        <span class="relative z-10 tracking-widest text-sm lg:text-lg font-display capitalize group-hover:text-white transition-colors duration-500 flex items-center">
          Read Reviews
        </span>
      </a>
    </div>

  </section>
</template>

<style scoped>
/* --- Testimonial Quote Styling --- */
.testimonial-quote {
  position: relative;
  padding-left: 1.5rem; /* Adjusted padding */
}
.testimonial-quote::before {
  content: '\201C'; /* Left double quotation mark */
  position: absolute;
  top: 0; /* Adjusted position */
  left: -1rem;
  font-family: 'Cinzel', serif;
  font-size: 5rem; /* Adjusted size */
  color: #c084fc; /* purple-400 */
  line-height: 1;
  opacity: 0;
}

/* Custom Swiper Navigation Styles */
:deep(.testimonial-slider .swiper-button-next),
:deep(.testimonial-slider .swiper-button-prev) {
  position: static;
  width: 3rem; height: 3rem;
  margin: 0;
  background-color: #f1f5f9;
  color: #475569;
  border-radius: 0.5rem;
  transition: background-color 0.3s, color 0.3s;
}
:deep(.testimonial-slider .swiper-button-next:hover),
:deep(.testimonial-slider .swiper-button-prev:hover) {
  background-color: #e2e8f0;
  color: #1e293b;
}
:deep(.testimonial-slider .swiper-button-next svg),
:deep(.testimonial-slider .swiper-button-prev svg) {
  width: 1rem;
}

/* --- HEXAGON AVATAR STYLES --- */
.hex-avatar {
  flex-shrink: 0;
  overflow: hidden;
  width: 4em; /* 64px */
  height: 3.46em; /* ~55px */
  transform: rotate(-30deg) skewX(30deg);
  border-radius: .5em;
  position: relative;
}

.hex-avatar-inner {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: inherit; height: inherit;
  border-radius: inherit;
  transform: skewX(-30deg) rotate(60deg) skewX(30deg);
  background: #e9d5ff; /* purple-200 */
}
.hex-avatar-inner > :deep(svg) {
  color: #6b21a8; /* purple-800 */
  transform: rotate(-30deg); /* Counter-rotate the icon */
}
</style>