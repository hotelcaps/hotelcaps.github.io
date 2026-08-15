<template>
  <!-- ROOT NODE FIX: Prevents the Vue Transition warning -->
  <div class="live-app-root">
    <ClientOnly>
      <div class="fixed inset-0 w-screen h-screen bg-black z-[9999] overflow-hidden select-none font-sans">
        
        <!-- 0. CLICK TO START OVERLAY (Fixes browser autoplay block) -->
        <div 
          v-if="!hasStarted"
          class="absolute inset-0 z-[100000] bg-black flex flex-col items-center justify-center cursor-pointer"
          @click="startLiveSignage"
        >
          <img src="/images/caps-solid-logo.png" alt="Hotel CAPS" class="h-24 opacity-50 mb-8" />
          <div class="text-white/70 font-sans tracking-[0.3em] uppercase text-xl animate-pulse">
            Click anywhere to Start CAPS Live
          </div>
        </div>

        <!-- 1. BACKGROUND & DYNAMIC LIGHT TINT -->
        <div class="absolute inset-0 z-0">
          <img src="/images/live/live-bg.jpg" alt="Background" class="w-full h-full object-cover" />
          <!-- Tint reduced to let the image show through clearly -->
          <div ref="bgTintRef" class="absolute opacity-70 inset-0 transition-colors duration-1000"></div>
        </div>

        <!-- 2. TOP BAR (Stacked Center Logo Left & Live Indicator Right) -->
        <div class="absolute top-0 left-0 w-full z-20 flex justify-between items-start p-8 lg:p-12">
          
          <!-- Stacked Logo -->
          <div class="flex flex-col items-center gap-1">
            <img src="/images/caps-solid-logo.png" alt="Hotel CAPS" class="h-12 lg:h-14" />
            <div class="text-white flex flex-col items-center font-display leading-none">
              <p class="text-sm font-medium tracking-widest">HOTEL</p>
              <p class="text-xl font-bold tracking-widest mt-0.5">CAPS</p>
            </div>
          </div>

          <!-- Live Indicator -->
          <div class="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full shadow-lg">
            <div class="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
            <span class="text-white text-sm font-bold tracking-widest uppercase">Now Serving</span>
          </div>
        </div>

        <!-- 3. MAIN STAGE (Content Slider) -->
        <div v-if="activeSlide && !isScreensaverActive" class="absolute inset-0 z-10 flex flex-row items-center pt-20 pb-28 px-12 lg:px-20">
          
          <!-- LEFT SIDE (Text Content) -->
          <div class="w-[45%] flex flex-col items-start pr-12 pt-10">
            
            <!-- Cursive Title (Rendered darker than the background tint for contrast) -->
            <h2 
              v-if="activeSlide.outlet" 
              class="live-text-item font-['Dancing_Script'] text-5xl lg:text-[4rem] font-bold mb-0 leading-tight"
              :style="{ color: activeSlide.darkHex }"
            >
              {{ activeSlide.outlet }}
            </h2>

            <!-- Main Giant Category Text (SPECIALS, ROOMS, etc.) -->
            <h1 class="live-text-item font-display font-bold uppercase tracking-wide leading-none mb-6">
              <span 
                class="block text-6xl lg:text-7xl xl:text-8xl"
                :style="{ color: activeSlide.mainTitleColor }"
              >
                {{ activeSlide.mainTitle }}
              </span>
            </h1>

            <h3 class="live-text-item font-sans font-bold text-white text-3xl lg:text-5xl mb-4 leading-tight">
              {{ activeSlide.title }}
            </h3>

            <p class="live-text-item font-sans text-zinc-300 text-lg lg:text-xl leading-relaxed mb-6 max-w-xl">
              {{ activeSlide.intro }}
            </p>

            <div v-if="activeSlide.price" class="live-text-item font-display font-bold text-[#f0cb52] text-4xl lg:text-5xl mb-10">
              {{ activeSlide.price }}
            </div>

            <!-- Feature Tags (Thin Icons) -->
            <div class="live-text-item flex flex-wrap gap-4 mt-auto">
              <div 
                v-for="(tag, tIdx) in activeSlide.tags" 
                :key="tIdx"
                class="flex items-center gap-2.5 bg-white/5 border border-white/20 px-4 py-2 rounded-xl text-white/90 text-sm lg:text-base font-medium tracking-wide backdrop-blur-sm shadow-md"
              >
                <div class="w-5 h-5 text-[#f0cb52]" v-html="tag.icon"></div>
                {{ tag.text }}
              </div>
            </div>

          </div>

          <!-- RIGHT SIDE (Visual Content) -->
          <div class="w-[55%] h-full relative flex items-center justify-center">
            
            <!-- Format A: Single Large Image -->
            <div v-if="activeSlide.format === 'A'" class="live-image-item w-full h-full flex items-center justify-center">
              <img 
                :src="activeSlide.images[0]" 
                :class="[
                  'max-w-full drop-shadow-2xl',
                  activeSlide.isRoom ? 'w-[90%] max-h-[75%] object-cover rounded-[2rem] border-4 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]' : 'max-h-[85%] object-contain'
                ]"
              />
            </div>

            <!-- Format B: Staggered 16:9 Non-Overlapping Grid -->
            <div v-if="activeSlide.format === 'B'" class="w-full h-full relative">
              <!-- Top Middle -->
              <img 
                :src="activeSlide.images[0]" 
                class="live-image-item absolute top-[8%] left-[20%] w-[45%] aspect-video object-cover rounded-2xl border-4 border-white/10 shadow-2xl z-10"
              />
              <!-- Bottom Middle -->
              <img 
                :src="activeSlide.images[1]" 
                class="live-image-item absolute bottom-[8%] left-[20%] w-[45%] aspect-video object-cover rounded-2xl border-4 border-white/10 shadow-2xl z-20"
              />
              <!-- Right Middle -->
              <img 
                :src="activeSlide.images[2]" 
                class="live-image-item absolute top-1/2 -translate-y-1/2 right-[0%] w-[45%] aspect-video object-cover rounded-2xl border-4 border-white/10 shadow-2xl z-30"
              />
            </div>

          </div>
        </div>

        <!-- 4. BOTTOM PANE (Progress Tracker) -->
        <div class="absolute bottom-0 left-0 w-full h-28 bg-[#0f172a] border-t border-white/10 z-30 flex items-center justify-between px-8 lg:px-16 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
          
          <div class="flex flex-col items-center text-[#d4af37] font-medium uppercase tracking-widest text-sm lg:text-base mr-8">
            <span>Next Up</span>
            <svg class="w-6 h-6 mt-1 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </div>

          <div class="flex-1 flex justify-between items-center max-w-6xl mx-auto">
            <template v-for="(cat, idx) in categories" :key="cat.id">
              
              <div 
                class="flex flex-col items-center gap-2 transition-all duration-700"
                :class="activeSlide && activeSlide.trackerId === cat.id ? 'opacity-100 scale-110' : 'opacity-40 scale-100'"
              >
                <div 
                  class="w-8 h-8 lg:w-10 lg:h-10 transition-colors duration-700"
                  :style="{ color: activeSlide && activeSlide.trackerId === cat.id ? activeSlide.lightHex : 'white' }"
                  v-html="cat.icon"
                ></div>
                <span class="text-[10px] lg:text-xs font-medium uppercase tracking-wider text-white text-center whitespace-nowrap">
                  {{ cat.name }}
                </span>
              </div>

              <!-- Connector Arrow -->
              <div v-if="idx < categories.length - 1" class="text-[#d4af37] px-2 lg:px-4 opacity-70">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
              </div>
            </template>
          </div>
        </div>

        <!-- 5. SCREENSAVER LOOP RESET -->
        <div v-if="isScreensaverActive" class="absolute inset-0 z-40 bg-[#040404] flex items-center justify-center screensaver-container">
          <div class="relative z-10 flex flex-col items-center">
            
            <!-- Direct exact image usage, fading in smoothly -->
            <img id="saver-logo" src="/images/caps-solid-logo.png" class="h-28 lg:h-32 mb-8 opacity-0" alt="Hotel CAPS" />

            <div class="perspective-[1000px] flex flex-col items-center font-display text-white">
              <p class="text-2xl font-medium tracking-[0.4em] leading-loose flex ml-[0.4em]">
                <span v-for="(char, i) in 'HOTEL'.split('')" :key="'sh-'+i" class="saver-h-char inline-block opacity-0">{{ char }}</span>
              </p>
              <p class="text-5xl font-bold tracking-[0.3em] mt-2 flex ml-[0.3em]">
                <span v-for="(char, i) in 'CAPS'.split('')" :key="'sc-'+i" class="saver-c-char inline-block opacity-0">{{ char }}</span>
              </p>
            </div>
          </div>
        </div>

      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
import { ref, nextTick, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';

definePageMeta({ layout: false });

// ============================================================================
// 1. DATA STRUCTURES & THIN SVG ASSETS (Stroke 1.2px)
// ============================================================================

// Tag Icons
const iconFresh = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22C12 22 20 18 20 12C20 6 12 2 12 2C12 2 4 6 4 12C4 18 12 22 12 22Z"/><path d="M12 22V12"/></svg>`;
const iconFlavors = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
const iconLove = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78v0z"/></svg>`;
const iconParking = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 8h4a2 2 0 010 4H9v4"/></svg>`;
const iconElevator = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M12 6v4m0-4l-2 2m2-2l2 2m-2 6v4m0 0l-2-2m2 2l2-2"/></svg>`;
const icon24h = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`;
const iconAV = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="12" rx="2"/><path d="M8 20h8M12 16v4M2 12h20"/></svg>`;
const iconCorp = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/></svg>`;
const iconDecor = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`;
const iconOutdoor = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6"/></svg>`;

const foodTags = [
  { text: "Always Fresh", icon: iconFresh },
  { text: "Authentic Flavors", icon: iconFlavors },
  { text: "Made With Love", icon: iconLove }
];
const roomTags = [
  { text: "Car Parking", icon: iconParking },
  { text: "Elevator Access", icon: iconElevator },
  { text: "24 Hour Service", icon: icon24h }
];
const hallTags = [
  { text: "A/V Capabilities", icon: iconAV },
  { text: "Corporate Events", icon: iconCorp },
  { text: "Grand Decor", icon: iconDecor }
];
const cateringTags = [
  { text: "Outdoor Setup", icon: iconOutdoor },
  { text: "Custom Menus", icon: iconFlavors },
  { text: "Live Counters", icon: iconFresh }
];

// Rebuilt Tracker Icons
const categories = [
  { id: 'specials', name: 'Specials', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>` },
  // Hemispherical Cloche for Restaurant
  { id: 'restaurant', name: 'Restaurant', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 17h18M12 4v2m-7 8a7 7 0 0114 0v3H5v-3z"/></svg>` },
  { id: 'chai', name: 'Chill N Chai', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 8H19C20.6569 8 22 9.34315 22 11C22 12.6569 20.6569 14 19 14H18M4 8H18V15C18 17.2091 16.2091 19 14 19H8C5.79086 19 4 17.2091 4 15V8ZM10 4V6M14 4V6M6 4V6"/></svg>` },
  // Skewer/Wrap for Arabic Corner
  { id: 'arabic', name: 'Arabic Corner', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 3l-6 6m-9 9l-3 3m5-6l4-4a3 3 0 014.2 0v0a3 3 0 010 4.2l-4 4a3 3 0 01-4.2 0v0a3 3 0 010-4.2"/></svg>` },
  // Scooter for Food Delivery
  { id: 'delivery', name: 'Food Delivery', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 19a2 2 0 100-4 2 2 0 000 4zm10 0a2 2 0 100-4 2 2 0 000 4z"/><path d="M10 15h6M2 15h4m12 0h2v-4l-3-4h-5v8M14 7v4"/></svg>` },
  // Proper Bed for Rooms
  { id: 'rooms', name: 'Rooms', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 11v5m16-5v5M4 11h16M4 11V7a2 2 0 012-2h12a2 2 0 012 2v4M6 11V9h4v2M14 11V9h4v2"/></svg>` },
  // Wavy Stage Curtains for Hall
  { id: 'hall', name: 'Events Hall', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4v16m16-16v16M4 4h16M4 4c2 4 4 4 6 0m4 0c-2 4-4 4-6 0m10 0c-2 4-4 4-6 0"/></svg>` },
  // Chafing Dish setup for Catering
  { id: 'catering', name: 'Catering', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 14h12M4 18h16M8 10h8m-10 4v4m12-4v4m-5-8V6m0 0a3 3 0 00-6 0h12a3 3 0 00-6 0z"/></svg>` }
];



const slidesDataOld = [
  // 1. General Specials
  { trackerId: 'specials', format: 'A', isFood: true, isRoom: false, colorHex: '#d97706', category: 'CAPS', outlet: '', title: 'Onasadhya', intro: 'Experience the grand traditional feast of Kerala, served on a banana leaf with 26 authentic delicacies.', price: '₹350', images: ['/images/live/c-1.png'] },
  // 2. Restaurant (6 Items)
  { trackerId: 'restaurant', format: 'A', isFood: true, isRoom: false, colorHex: '#16a34a', category: 'Restaurant', outlet: 'Multi-Cuisine Restaurant', title: 'Idiyappam & Veg Stew', intro: 'Soft, stringy rice noodles served with a mild, creamy coconut milk stew packed with farm-fresh vegetables.', price: '₹180', images: ['/images/live/res-1.png'] },
  { trackerId: 'restaurant', format: 'A', isFood: true, isRoom: false, colorHex: '#16a34a', category: 'Restaurant', outlet: 'Multi-Cuisine Restaurant', title: 'Ghee Roast', intro: 'Crispy, golden-brown dosa roasted in pure clarified butter, served with our signature chutneys.', price: '₹150', images: ['/images/live/res-2.png'] },
  { trackerId: 'restaurant', format: 'A', isFood: true, isRoom: false, colorHex: '#16a34a', category: 'Restaurant', outlet: 'Multi-Cuisine Restaurant', title: 'Royal Paneer Butter Masala', intro: 'Cottage cheese cubes simmered to perfection in a rich, velvety tomato and cashew gravy.', price: '₹260', images: ['/images/live/res-3.png'] },
  { trackerId: 'restaurant', format: 'A', isFood: true, isRoom: false, colorHex: '#16a34a', category: 'Restaurant', outlet: 'Multi-Cuisine Restaurant', title: 'Mughlai Mutton Curry', intro: 'Tender mutton pieces slow-cooked in a robust, aromatic blend of royal Indian spices.', price: '₹380', images: ['/images/live/res-4.png'] },
  { trackerId: 'restaurant', format: 'A', isFood: true, isRoom: false, colorHex: '#16a34a', category: 'Restaurant', outlet: 'Multi-Cuisine Restaurant', title: 'Charcoal Tandoori Chicken', intro: 'Juicy, yogurt-marinated chicken roasted over live charcoal for that perfect smoky finish.', price: '₹420', images: ['/images/live/res-5.png'] },
  { trackerId: 'restaurant', format: 'A', isFood: true, isRoom: false, colorHex: '#16a34a', category: 'Restaurant', outlet: 'Multi-Cuisine Restaurant', title: 'Kerala Spicy Prawn Masala', intro: 'Fresh prawns tossed in a fiery, coconut-infused masala native to the coastal spice route.', price: '₹340', images: ['/images/live/res-6.png'] },
  // 3. Chill N Chai (2 Items)
  { trackerId: 'chai', format: 'A', isFood: true, isRoom: false, colorHex: '#d97706', category: 'Chill N Chai', outlet: 'Chill N Chai', title: 'Royal Rose Falooda', intro: 'A decadent layered dessert drink with rose syrup, vermicelli, basil seeds, and premium ice cream.', price: '₹190', images: ['/images/live/cc-1.png'] },
  { trackerId: 'chai', format: 'A', isFood: true, isRoom: false, colorHex: '#d97706', category: 'Chill N Chai', outlet: 'Chill N Chai', title: 'Rose Pistachio Latte', intro: 'A warm, fragrant infusion of crushed pistachios, saffron, and delicate rose petals.', price: '₹140', images: ['/images/live/cc-2.png'] },
  // 4. Arabic Corner (2 Items)
  { trackerId: 'arabic', format: 'A', isFood: true, isRoom: false, colorHex: '#78350f', category: 'Arabic Corner', outlet: 'Arabic Corner', title: 'Grilled Shawarma Rolls', intro: 'Thinly sliced, marinated meat roasted on a slow-turning spit, wrapped with garlic toum and pickles. BUY 1 GET 1 FREE.', price: '₹160', images: ['/images/live/ar-1.png'] },
  { trackerId: 'arabic', format: 'A', isFood: true, isRoom: false, colorHex: '#78350f', category: 'Arabic Corner', outlet: 'Arabic Corner', title: 'Al Faham with Arabic Rice', intro: 'Middle-Eastern spiced grilled chicken served over a bed of fragrant, long-grain Arabic Mandi rice.', price: '₹280', images: ['/images/live/ar-2.png'] },
  // 5. Free Home Delivery
  { trackerId: 'delivery', format: 'A', isFood: true, isRoom: false, colorHex: '#0ea5e9', category: 'Delivery', outlet: '', title: 'Free Home Delivery', intro: 'Craving CAPS at home? Enjoy our entire menu delivered piping hot right to your doorstep.', price: 'FREE', images: ['/images/delivery/1.png'] },
  // 6. Rooms (3 Items)
  { trackerId: 'rooms', format: 'A', isFood: false, isRoom: true, colorHex: '#2563eb', category: 'Rooms', outlet: '', title: 'Standard Room', intro: 'Comfortable, elegantly furnished rooms designed for the perfect night of rest during your travels.', price: '₹1,500 / night', images: ['/images/rooms/standard/1.jpg'] },
  { trackerId: 'rooms', format: 'A', isFood: false, isRoom: true, colorHex: '#2563eb', category: 'Rooms', outlet: '', title: 'Deluxe Room', intro: 'Spacious luxury with premium bedding, advanced climate control, and stunning views.', price: '₹2,500 / night', images: ['/images/rooms/deluxe/1.jpg'] },
  { trackerId: 'rooms', format: 'A', isFood: false, isRoom: true, colorHex: '#2563eb', category: 'Rooms', outlet: '', title: 'Luxury Suite', intro: 'The ultimate CAPS experience. Featuring a private living area, premium bath amenities, and bespoke service.', price: '₹4,000 / night', images: ['/images/rooms/suite/1.jpg'] },
  // 7. Events Hall (Format B)
  { trackerId: 'hall', format: 'B', isFood: false, isRoom: false, colorHex: '#db2777', category: 'Events Hall', outlet: '', title: 'The Grand Venue', intro: 'A breathtaking space designed for weddings, corporate galas, and life’s most memorable celebrations.', price: null, images: ['/images/hall/live/1.jpg', '/images/hall/live/2.jpg', '/images/hall/live/3.jpg'] },
  // 8. Catering (Format B)
  { trackerId: 'catering', format: 'B', isFood: false, isRoom: false, colorHex: '#b91c1c', category: 'Catering', outlet: '', title: 'Outdoor Catering', intro: 'Bring the legendary taste of CAPS to your personal events. We handle everything from setup to service.', price: null, images: ['/images/catering/live/1.jpg', '/images/catering/live/2.jpg', '/images/catering/live/3.jpg'] }
];


// Slide Data - Incorporating darkHex for text, lightHex for icons (darkened for better contrast), and specific mainTitles
const slidesData = [
  // 1. General Specials
  { trackerId: 'specials', format: 'A', isRoom: false, mainTitle: 'SPECIALS', mainTitleColor: '#f0cb52', darkHex: '#a44309', lightHex: '#c96704', outlet: 'CAPS Specials', title: 'Onasadhya', intro: 'Experience the grand traditional feast of Kerala, served on a banana leaf with 26 authentic delicacies.', price: '₹350', images: ['/images/live/c-1.png'], tags: foodTags },
  // 2. Restaurant
  { trackerId: 'restaurant', format: 'A', isRoom: false, mainTitle: 'SPECIALS', mainTitleColor: '#f0cb52', darkHex: '#14532d', lightHex: '#16a34a', outlet: 'Multi-Cuisine Restaurant', title: 'Idiyappam & Veg Stew', intro: 'Soft, stringy rice noodles served with a mild, creamy coconut milk stew packed with farm-fresh vegetables.', price: '₹180', images: ['/images/live/res-1.png'], tags: foodTags },
  { trackerId: 'restaurant', format: 'A', isRoom: false, mainTitle: 'SPECIALS', mainTitleColor: '#f0cb52', darkHex: '#14532d', lightHex: '#16a34a', outlet: 'Multi-Cuisine Restaurant', title: 'Ghee Roast', intro: 'Crispy, golden-brown dosa roasted in pure clarified butter, served with our signature chutneys.', price: '₹150', images: ['/images/live/res-2.png'], tags: foodTags },
  { trackerId: 'restaurant', format: 'A', isRoom: false, mainTitle: 'SPECIALS', mainTitleColor: '#f0cb52', darkHex: '#14532d', lightHex: '#16a34a', outlet: 'Multi-Cuisine Restaurant', title: 'Royal Paneer Butter Masala', intro: 'Cottage cheese cubes simmered to perfection in a rich, velvety tomato and cashew gravy.', price: '₹260', images: ['/images/live/res-3.png'], tags: foodTags },
  { trackerId: 'restaurant', format: 'A', isRoom: false, mainTitle: 'SPECIALS', mainTitleColor: '#f0cb52', darkHex: '#14532d', lightHex: '#16a34a', outlet: 'Multi-Cuisine Restaurant', title: 'Mughlai Mutton Curry', intro: 'Tender mutton pieces slow-cooked in a robust, aromatic blend of royal Indian spices.', price: '₹380', images: ['/images/live/res-4.png'], tags: foodTags },
  { trackerId: 'restaurant', format: 'A', isRoom: false, mainTitle: 'SPECIALS', mainTitleColor: '#f0cb52', darkHex: '#14532d', lightHex: '#16a34a', outlet: 'Multi-Cuisine Restaurant', title: 'Charcoal Tandoori Chicken', intro: 'Juicy, yogurt-marinated chicken roasted over live charcoal for that perfect smoky finish.', price: '₹420', images: ['/images/live/res-5.png'], tags: foodTags },
  { trackerId: 'restaurant', format: 'A', isRoom: false, mainTitle: 'SPECIALS', mainTitleColor: '#f0cb52', darkHex: '#14532d', lightHex: '#16a34a', outlet: 'Multi-Cuisine Restaurant', title: 'Kerala Spicy Prawn Masala', intro: 'Fresh prawns tossed in a fiery, coconut-infused masala native to the coastal spice route.', price: '₹340', images: ['/images/live/res-6.png'], tags: foodTags },
  // 3. Chill N Chai
  { trackerId: 'chai', format: 'A', isRoom: false, mainTitle: 'SPECIALS', mainTitleColor: '#f0cb52', darkHex: '#78350f', lightHex: '#b45309', outlet: 'Chill N Chai', title: 'Royal Rose Falooda', intro: 'A decadent layered dessert drink with rose syrup, vermicelli, basil seeds, and premium ice cream.', price: '₹190', images: ['/images/live/cc-1.png'], tags: foodTags },
  { trackerId: 'chai', format: 'A', isRoom: false, mainTitle: 'SPECIALS', mainTitleColor: '#f0cb52', darkHex: '#78350f', lightHex: '#b45309', outlet: 'Chill N Chai', title: 'Rose Pistachio Latte', intro: 'A warm, fragrant infusion of crushed pistachios, saffron, and delicate rose petals.', price: '₹140', images: ['/images/live/cc-2.png'], tags: foodTags },
  // 4. Arabic Corner
  { trackerId: 'arabic', format: 'A', isRoom: false, mainTitle: 'SPECIALS', mainTitleColor: '#f0cb52', darkHex: '#451a03', lightHex: '#82300b', outlet: 'Arabic Corner', title: 'Grilled Shawarma Rolls', intro: 'Thinly sliced, marinated meat roasted on a slow-turning spit, wrapped with garlic toum and pickles. BUY 1 GET 1 FREE.', price: '₹160', images: ['/images/live/ar-1.png'], tags: foodTags },
  { trackerId: 'arabic', format: 'A', isRoom: false, mainTitle: 'SPECIALS', mainTitleColor: '#f0cb52', darkHex: '#451a03', lightHex: '#82300b', outlet: 'Arabic Corner', title: 'Al Faham with Arabic Rice', intro: 'Middle-Eastern spiced grilled chicken served over a bed of fragrant, long-grain Arabic Mandi rice.', price: '₹280', images: ['/images/live/ar-2.png'], tags: foodTags },
  // 5. Food Delivery
  { trackerId: 'delivery', format: 'A', isRoom: false, mainTitle: 'FOOD DELIVERY', mainTitleColor: '#0a65a9', darkHex: '#0c4a6e', lightHex: '#0284c7', outlet: '', title: 'Fresh & Fast', intro: 'Craving CAPS at home? Enjoy our entire menu delivered piping hot right to your doorstep.', price: 'FREE', images: ['/images/delivery/1.png'], tags: foodTags },
  // 6. Rooms
  { trackerId: 'rooms', format: 'A', isRoom: true, mainTitle: 'ROOMS', mainTitleColor: '#2563eb', darkHex: '#1e3a8a', lightHex: '#2063db', outlet: '', title: 'Standard Room', intro: 'Comfortable, elegantly furnished rooms designed for the perfect night of rest during your travels.', price: '₹1,500 / night', images: ['/images/rooms/standard/1.jpg'], tags: roomTags },
  { trackerId: 'rooms', format: 'A', isRoom: true, mainTitle: 'ROOMS', mainTitleColor: '#2563eb', darkHex: '#1e3a8a', lightHex: '#2063db', outlet: '', title: 'Deluxe Room', intro: 'Spacious luxury with premium bedding, advanced climate control, and stunning views.', price: '₹2,500 / night', images: ['/images/rooms/deluxe/1.jpg'], tags: roomTags },
  { trackerId: 'rooms', format: 'A', isRoom: true, mainTitle: 'ROOMS', mainTitleColor: '#2563eb', darkHex: '#1e3a8a', lightHex: '#2063db', outlet: '', title: 'Luxury Suite', intro: 'The ultimate CAPS experience. Featuring a private living area, premium bath amenities, and bespoke service.', price: '₹4,000 / night', images: ['/images/rooms/suite/1.jpg'], tags: roomTags },
  // 7. Events Hall (Format B)
  { trackerId: 'hall', format: 'B', isRoom: false, mainTitle: 'EVENTS HALL', mainTitleColor: '#db2777', darkHex: '#831843', lightHex: '#f22a87', outlet: '', title: 'The Grand Venue', intro: 'A breathtaking space designed for weddings, corporate galas, and life’s most memorable celebrations.', price: null, images: ['/images/hall/live/1.jpg', '/images/hall/live/2.jpg', '/images/hall/live/3.jpg'], tags: hallTags },
  // 8. Catering (Format B)
  { trackerId: 'catering', format: 'B', isRoom: false, mainTitle: 'CATERING', mainTitleColor: '#dc2626', darkHex: '#7f1d1d', lightHex: '#ec3631', outlet: '', title: 'Outdoor Catering', intro: 'Bring the legendary taste of CAPS to your personal events. We handle everything from setup to service.', price: null, images: ['/images/catering/live/1.jpg', '/images/catering/live/2.jpg', '/images/catering/live/3.jpg'], tags: cateringTags }
];

// ============================================================================
// 2. STATE & CORE LOGIC
// ============================================================================
const hasStarted = ref(false);
const activeSlideIndex = ref(-1);
const activeSlide = ref(null);
const isScreensaverActive = ref(false);
const bgTintRef = ref(null);

let loopTimeout = null;

const startLiveSignage = () => {
  if (typeof window !== 'undefined') {
    const elem = document.documentElement;
    if (!document.fullscreenElement && elem.requestFullscreen) {
      elem.requestFullscreen().catch(() => {});
    }
  }
  hasStarted.value = true;
  runCycle(0);
};

// ============================================================================
// 3. THE GSAP MASTER LOOP
// ============================================================================
const runCycle = async (index) => {
  if (index >= slidesData.length) {
    runScreensaver();
    return;
  }

  activeSlideIndex.value = index;
  activeSlide.value = slidesData[index];
  
  await nextTick();

  if (bgTintRef.value) {
    // Uses the vibrant lightHex for the subtle background overlay
    bgTintRef.value.style.backgroundColor = activeSlide.value.lightHex;
  }

  const tlIn = gsap.timeline();
  
  tlIn.fromTo('.live-text-item', 
    { x: -100, opacity: 0 }, 
    { x: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out' }, 
    0
  );

  tlIn.fromTo('.live-image-item', 
    { x: 100, opacity: 0, scale: 0.95 }, 
    { x: 0, opacity: 1, scale: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out' }, 
    0.2
  );

  gsap.to('.live-image-item', { 
    y: -15, 
    duration: 2.5, 
    yoyo: true, 
    repeat: 1, 
    ease: 'sine.inOut' 
  });

  loopTimeout = setTimeout(() => {
    gsap.to(['.live-text-item', '.live-image-item'], {
      x: (i, target) => target.classList.contains('live-text-item') ? -100 : 100,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.in',
      onComplete: () => {
        runCycle(index + 1);
      }
    });
  }, 5000); 
};

// ============================================================================
// 4. SCREENSAVER LOOP RESET (Image Based, Faster)
// ============================================================================
const runScreensaver = async () => {
  isScreensaverActive.value = true;
  activeSlide.value = null; 
  
  await nextTick();

  const tl = gsap.timeline({
    onComplete: () => {
      // Shorter hold: Reduced by 0.5s as requested
      setTimeout(() => {
        gsap.to('.screensaver-container', { 
          opacity: 0, 
          duration: 1, 
          onComplete: () => {
            isScreensaverActive.value = false;
            runCycle(0);
          }
        });
      }, 1000); // Used to be 1.5s
    }
  });

  // Fade in the image exactly
  tl.to('#saver-logo', { opacity: 1, duration: 1.5, ease: 'power2.out' })
    .fromTo('.saver-h-char',
      { opacity: 0, rotationY: 90 },
      { opacity: 1, rotationY: 0, duration: 1.5, stagger: 0.1, ease: "back.out(1.2)" },
      "-=0.5"
    )
    .fromTo('.saver-c-char',
      { opacity: 0, scale: 3 },
      { opacity: 1, scale: 1, duration: 1.2, stagger: 0.2, ease: "power3.out" },
      "-=0.8" 
    );
};

// Cleanup timeout if TV display is somehow destroyed
onBeforeUnmount(() => {
  clearTimeout(loopTimeout);
});
</script>

