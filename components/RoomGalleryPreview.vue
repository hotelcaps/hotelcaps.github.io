<script setup>
import { ref, onMounted } from 'vue';
import Swiper from 'swiper';
// Import the required Swiper modules
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

// This component receives the list of gallery images as a prop
const props = defineProps({
  galleryImages: {
    type: Array,
    required: true,
    default: () => []
  }
});

// Refs for our two Swiper instances
const thumbsSwiperRef = ref(null);
const mainSwiperRef = ref(null);
const thumbsSwiperInstance = ref(null);

onMounted(() => {
  if (thumbsSwiperRef.value && mainSwiperRef.value) {
    // Initialize the thumbnail slider first
    thumbsSwiperInstance.value = new Swiper(thumbsSwiperRef.value, {
      modules: [Navigation],
      spaceBetween: 4,
      slidesPerView: 4, // Show 4 thumbnails at a time
      freeMode: true,
      watchSlidesProgress: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    // Initialize the main preview slider, and link it to the thumbnails
    new Swiper(mainSwiperRef.value, {
      modules: [Thumbs],
      spaceBetween: 10,
      thumbs: {
        swiper: thumbsSwiperInstance.value,
      },
    });
  }
});
</script>

<template>
  <div class="room-gallery-container">
    <!-- Main Preview Image Slider -->
    <div ref="mainSwiperRef" class="swiper main-swiper">
      <div class="swiper-wrapper">
        <div v-for="(image, index) in galleryImages" :key="index" class="swiper-slide aspect-[3/2] ">
          <img
            :src="image" 
            :alt="`Room image ${index + 1}`"
            class="w-full h-full object-cover aspect-square rounded-2xl transform transition-transform duration-300 hover:scale-110"
            loading="lazy" 
          />
        </div>
      </div>
    </div>

    <!-- Thumbnail Slider -->
    <div class="relative mt-4">
      <div ref="thumbsSwiperRef" class="swiper thumbs-swiper">
        <div class="swiper-wrapper">
          <div v-for="(image, index) in galleryImages" :key="index" class="swiper-slide thumb-slide">
            <img
              :src="image" 
              :alt="`Room thumbnail ${index + 1}`"
              class="w-full h-full object-cover rounded-lg cursor-pointer"
              loading="lazy" 
            />
          </div>
        </div>
      </div>
      <!-- Navigation arrows are only shown if there are more than 4 images -->
      <template v-if="galleryImages.length > 4">
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.room-gallery-container {
  position: relative;
}

.main-swiper {
  border-radius: 1rem;
}

.thumbs-swiper {
  padding: 0 2.5rem; /* Make space for the arrows */
}

.thumb-slide {
  opacity: 0.5;
  transition: opacity 0.3s ease;
  border: 2px solid transparent;
  border-radius: 0.6rem;
}

.thumb-slide.swiper-slide-thumb-active {
  opacity: 1;
  border-color: #f59e0b; /* amber-500 */
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: #1c1917; /* stone-900 */
  width: 2rem;
  height: 2rem;
  background-color: rgba(255, 174, 0, 0.9);
  border-radius: 9999px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  top: 60%;
}
:deep(.swiper-button-next svg),
:deep(.swiper-button-prev svg) {
  width: .6rem;
}
:deep(.swiper-button-prev) {
  left: 0;
}
:deep(.swiper-button-next) {
  right: 0;
}
</style>
