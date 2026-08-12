<template>
  <section id="hero-slider" ref="swiperEl" class="swiper relative w-full h-screen">
    <div class="swiper-wrapper">
      <div v-for="slide in slides" :key="slide.title" class="swiper-slide">
        <img :src="slide.image" class="slide-bg-image" :alt="slide.alt" loading="lazy" />
        <div class="absolute inset-0 "></div>
        <div class="relative w-full h-full flex flex-col justify-center items-center text-center bg-black/70 text-white px-12 md:px-16">
          <div class="hero-slide-content">
            <h1 class="font-display mb-4 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold lg:font-semibold tracking-widest xl:tracking-widest leading-snug sm:leading-normal">{{ slide.title }}</h1>
            <p class="font-body max-w-sm sm:max-w-md md:max-w-4xl mt-4 sm:mt-6 text-2x1 sm:text-2xl font-light opacity-90 tracking-wider">{{ slide.subtitle }}</p>
            <NuxtLink v-if="slide.buttonLink" :to="slide.buttonLink" class="hero-bubble-button text-lg font-display tracking-wider mt-8 block font-normal py-3 px-8 rounded-lg">
              {{ slide.buttonText }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    
    <div class="swiper-pagination"></div>
    <div class="swiper-button-prev hero-swiper-button text-lg left-2 sm:left-4 opacity-70"></div>
    <div class="swiper-button-next hero-swiper-button text-sm right-2 sm:right-4 opacity-70"></div>
  </section>
</template>

<script setup>
// Import Vue features and our animation libraries
import { ref, onMounted } from 'vue';
import Swiper from 'swiper';
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules';
import { gsap } from 'gsap';

// Import Swiper's CSS
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// This is where we define the content for our slides.
// To change the hero content, you only need to edit this array.
const slides = [
  {
    image: '/images/home/hero/caps-hero.jpg',
    alt: 'A welcoming view of Hotel CAPS',
    title: 'Welcome to Hotel CAPS',
    subtitle: 'A premier destination for pleasant stays, delicious food and memorable events in the heart of Palakkad, Kerala.',
  },
  {
    image: '/images/home/hero/rooms-hero.jpg',
    alt: 'Hotel CAPS Rooms Reception',
    title: 'Sanctuary of Comfort',
    subtitle: 'Discover our elegant rooms and suites, designed for your ultimate comfort.',
    buttonText: 'See Our Rooms',
    buttonLink: '/pricing'
  },
  {
    image: '/images/home/hero/restaurant-hero.jpg',
    alt: 'Elegant dining area of the restaurant',
    title: 'A Culinary Journey',
    subtitle: 'Embark on an epicurean adventure with flavors that will delight your senses.',
    buttonText: 'View Restaurant',
    buttonLink: '/restaurant'
  },
  {
    image: '/images/home/hero/hall-hero.jpg',
    alt: 'A grand auditorium set for an event',
    title: 'Celebrate in Style',
    subtitle: 'Host your special occasions in our state of the art and versatile auditorium.',
    buttonText: 'Book an Event',
    buttonLink: '/hall'
  }
];

// Create a 'template ref' to get a direct reference to our main slider element
const swiperEl = ref(null);

// The onMounted hook ensures that our code only runs after the component's HTML is on the page.
// This is critical for libraries like Swiper and GSAP that need to find DOM elements.
onMounted(() => {
  if (swiperEl.value) {
    const swiper = new Swiper(swiperEl.value, {
      modules: [Navigation, Pagination, EffectFade, Autoplay],
      loop: true,
      effect: 'fade',
      allowTouchMove: false,
      speed: 1000,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      // This 'on' event is where we trigger our GSAP animations
      on: {
        init: function (swiper) {
          const activeSlide = swiper.slides[swiper.activeIndex];
          const content = activeSlide.querySelector('.hero-slide-content');
          if (content) {
            gsap.to(content.children, { opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: 'power3.out' });
          }
        },
        slideChange: function (swiper) {
          // Animate all slide contents out
          gsap.to('.hero-slide-content > *', {
            opacity: 0,
            y: 20,
            duration: 0.4,
            ease: 'power3.in'
          });

          // Animate in the active slide's content
          const activeSlide = swiper.slides[swiper.activeIndex];
          const activeSlideContent = activeSlide.querySelector('.hero-slide-content');
          if (activeSlideContent) {
            gsap.to(activeSlideContent.children, {
              delay: 0.4, // Wait for fade out
              opacity: 1,
              y: 0,
              stagger: 0.2,
              duration: 1,
              ease: 'power3.out'
            });
          }
        },
      }
    });
  }
});
</script>

<style scoped>
/* Scoped styles ensure these rules ONLY apply to this component */

/* --- Swiper Hero Section Styles --- */
#hero-slider {
  height: 100vh;
}

.swiper-slide {
  position: relative;
  overflow: hidden;
}

.slide-bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  transform: scale(1.1); /* Initial scale for zoom effect */
  transition: transform 8s ease-out;
}

.swiper-slide-active .slide-bg-image {
  transform: scale(1); /* Zoom out to normal scale on active slide */
}

/* We need to use :deep() to style Swiper's internal elements from a scoped style block */
:deep(.swiper-pagination-bullet) {
  width: 2rem;
  height: 4px;
  border-radius: 2px;
  background-color: rgba(255, 255, 255, 0.5);
  opacity: 1;
  transition: background-color 0.3s;
}

:deep(.swiper-pagination-bullet-active) {
  background-color: white;
}

.hero-swiper-button {
  color: white;
  transition: transform 0.2s ease-in-out;
}

.hero-swiper-button::after {  
  font-size: 2rem;
}
@media (min-width: 768px) {
  
  .hero-swiper-button::after {  
    font-size: 3rem;
  }
}


.hero-swiper-button:hover {
  transform: scale(1.2);
}

.hero-slide-content > * {
  opacity: 0; /* Initially hide for GSAP animation */
  transform: translateY(20px);
}

.hero-bubble-button {
  position: relative;
  overflow: hidden;
  display: inline-block;
  transition: color 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  z-index: 1;
  border: 2px solid white;
  color: white;
}

.hero-bubble-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.7, 0, 0.2, 1);
  z-index: -1;
}

.hero-bubble-button:hover {
  color: black;
}

.hero-bubble-button:hover::before {
  transform: scaleX(1);
}
</style>