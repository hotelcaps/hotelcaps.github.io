<template>
  <div :class="['w-full font-sans transition-colors duration-500', isDark ? 'dark bg-[#141414]' : 'bg-[#f9f7f3]']">
    
    <!-- Top Padding added to pull toggles away from the edge -->
    <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 lg:pt-12 relative">
      
      <!-- ==========================================
           CONTROLS: VEG TOGGLE & LIGHT/DARK
           ========================================== -->
      <div class="flex flex-wrap items-center justify-end gap-4 mb-8">
        
        <!-- Veg / Non-Veg Filter -->
        <div 
          @click="showOnlyVeg = !showOnlyVeg"
          class="flex items-center bg-white dark:bg-[#2a2a2a] border border-zinc-200 dark:border-[#2a2a2a] p-1 rounded-full cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 select-none"
        >
          <div :class="['px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase transition-colors flex items-center gap-1.5', !showOnlyVeg ? 'bg-red-600 text-white shadow-inner' : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300']">
            <div class="w-2 h-2 rounded-full border border-current flex items-center justify-center p-[1px]"><div class="w-full h-full rounded-full bg-current"></div></div> All
          </div>
          <div :class="['px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase transition-colors flex items-center gap-1.5', showOnlyVeg ? 'bg-green-600 text-white shadow-inner' : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300']">
            <div class="w-2 h-2 rounded-full border border-current flex items-center justify-center p-[1px]"><div class="w-full h-full rounded-full bg-current"></div></div> Veg
          </div>
        </div>

        <!-- Light / Dark Mode -->
        <div 
          @click="isDark = !isDark"
          class="flex items-center bg-white dark:bg-[#2a2a2a] border border-zinc-200 dark:border-[#2a2a2a] p-1 rounded-full cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 select-none"
        >
          <div :class="['px-5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase transition-colors', !isDark ? 'bg-[#d4af37] text-white shadow-inner' : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300']">
            Light
          </div>
          <div :class="['px-5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase transition-colors', isDark ? 'bg-[#d4af37] text-black shadow-inner' : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300']">
            Dark
          </div>
        </div>

      </div>

      <!-- ==========================================
           MOBILE & TABLET LAYOUT (< 1024px)
           ========================================== -->
      <div class="block lg:hidden">

        <!-- Outlet Tabs (Mobile - Grid Layout, No scroll) -->
        <div class="pt-3 pb-5 mb-5 grid grid-cols-3 gap-2 transition-colors duration-500 border-b border-zinc-200 dark:border-[#2a2a2a]">
          <button 
            v-for="outlet in outlets" :key="outlet.name" @click="activeOutlet = outlet.name"
            :class="[
              'flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl transition-all duration-300 border',
              activeOutlet === outlet.name 
                ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-[#d4af37] dark:text-[#0a0a0a] dark:border-[#d4af37] shadow-md' 
                : 'bg-white text-zinc-600 border-zinc-200 dark:bg-[#2a2a2a] dark:text-zinc-400 dark:border-[#2a2a2a] shadow-sm dark:shadow-none'
            ]"
          >
            <span v-html="outlet.icon" class="w-10 h-10"></span>
            <span class="text-center text-[11px] font-bold tracking-wider uppercase leading-tight" v-html="outlet.titleHtml"></span>
          </button>
        </div>

        <!-- Mobile Specials Slider (h-auto via Grid) -->
        <div 
          @touchstart="handleTouchStart" 
          @touchend="handleTouchEnd" 
          @mousedown="handleTouchStart" 
          @mouseup="handleTouchEnd"
          class="mb-8 relative w-full h-auto bg-white dark:bg-[#2a2a2a] rounded-3xl overflow-hidden shadow-md border border-zinc-100 dark:border-[#2a2a2a] transition-colors duration-500 flex flex-col cursor-grab active:cursor-grabbing select-none"
        >
          <div class="absolute top-2 right-2 z-20 flex items-center gap-2 bg-white/60 dark:bg-[#141414]/50 backdrop-blur-md px-4 py-2 rounded-full border border-zinc-200 dark:border-[#2a2a2a] shadow-sm">
            <svg class="w-3 h-3 text-[#d4af37]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span class="text-[.6rem] font-bold tracking-widest uppercase text-zinc-900 dark:text-white">Today's Special</span>
          </div>
          
          <div v-if="outletSpecials.length === 0" class="p-12 text-center text-zinc-500 dark:text-zinc-400 text-sm font-medium tracking-wide">
            Specials updating soon...
          </div>
                    
          <transition-group v-else name="fade" tag="div" class="grid w-full">
            <div v-for="(special, index) in outletSpecials" :key="special.title" v-show="index === currentSpecialIndex" class="col-start-1 row-start-1 w-full flex flex-col">
              
              <!-- Image locked to aspect ratio so it doesn't collapse -->
              <div class="w-full aspect-[4/3] relative bg-white border-b border-zinc-100 dark:border-zinc-800">
                <img :src="special.images[0]" :alt="special.title" class="w-full h-full object-contain p-2" />
              </div>
              
              <!-- Text auto-expands -->
              <div class="w-full p-6 pb-12 flex flex-col bg-white dark:bg-[#1c1c1c] transition-colors duration-500">
                <h3 class="text-2xl font-bold text-zinc-900 dark:text-white mb-2">{{ special.title }}</h3>
                <p class="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-3 mb-4">{{ special.intro }}</p>
                <div class="flex items-center gap-2 mt-auto">
                  <span class="text-[#d4af37] font-bold text-xl">{{ special.price }}</span>
                </div>
              </div>
            </div>
          </transition-group>
          
          <!-- Slider Indicators -->
          <div v-if="outletSpecials.length > 1" class="absolute bottom-5 inset-x-0 flex justify-center gap-2 z-20">
            <div v-for="(_, idx) in outletSpecials" :key="'dot-m-'+idx" :class="['h-2 rounded-full transition-all duration-300', currentSpecialIndex === idx ? 'w-6 bg-[#d4af37]' : 'w-2 bg-zinc-400 dark:bg-zinc-500']"></div>
          </div>
        </div>

        <!-- Mobile Accordions -->
        <div class="flex flex-col gap-4 pb-20">
          <div v-for="category in activeCategories" :key="category" :id="'acc-' + category.replace(/\s+/g, '')" class="bg-white dark:bg-[#2a2a2a] rounded-2xl border border-zinc-100 dark:border-[#2a2a2a] overflow-hidden shadow-sm transition-colors duration-500">
            
            <button @click="toggleAccordion(category)" class="w-full px-5 py-4 flex justify-between items-center bg-white dark:bg-[#2a2a2a] transition-colors duration-500">
              <span class="font-display font-bold text-lg text-zinc-900 dark:text-white">{{ category }}</span>
              <svg :class="['w-5 h-5 text-[#d4af37] transition-transform duration-300', openAccordions.includes(category) ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            
            <div class="grid transition-all duration-500 ease-in-out" :class="openAccordions.includes(category) ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'">
              <div class="overflow-hidden">
                <div class="p-5 pt-0 flex flex-col gap-6 border-t border-zinc-50 dark:border-[#2a2a2a]">
                  <div v-for="item in getItemsByCategory(category)" :key="item.id" class="flex gap-4">
                    <div class="w-24 h-18 shrink-0 rounded-xl overflow-hidden">
                      <img :src="item.image" :alt="item.name" class="w-full h-auto rounded-xl object-cover shadow-sm" />
                    </div>
                    <!-- <img :src="item.image" :alt="item.name" class="w-24 h-24 aspect-[4/3] object-contain rounded-xl border border-zinc-100 dark:border-white/5 shadow-sm" /> -->
                    <div class="flex-1 flex flex-col justify-center">
                      <h4 class="text-base font-bold text-zinc-900 dark:text-white leading-tight">{{ item.name }}</h4>
                      <p class="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-1 mb-2">{{ item.info }}</p>
                      
                      <div class="flex flex-col gap-1 mt-auto">
                        <!-- MOBILE INVISIBLE TEMPLATE -->
                        <template v-for="spec in item.specializations" :key="spec.name">
                          
                          <!-- MOBILE V-IF USING YOUR EXACT VARIABLE (showOnlyVeg) -->
                          <div v-if="!showOnlyVeg || spec.isVeg" class="flex items-center justify-between">
                            <div class="flex items-center gap-1.5">
                              <div class="w-3.5 h-3.5 flex items-center justify-center border rounded-sm p-[2px]" :class="spec.isVeg ? 'border-green-600' : 'border-red-600'">
                                <div class="w-full h-full rounded-full" :class="spec.isVeg ? 'bg-green-600' : 'bg-red-600'"></div>
                              </div>
                              <span class="text-xs font-medium text-zinc-600 dark:text-zinc-400">{{ spec.name || 'Regular' }}</span>
                            </div>
                            <span class="text-sm font-bold text-[#d4af37]">
                              {{ spec.price === 'Seasonal' ? 'Seasonal' : '₹' + spec.price }}
                            </span>
                          </div>
                        </template>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- ==========================================
           DESKTOP LAYOUT (>= 1024px)
           ========================================== -->
      <div class="hidden lg:flex gap-10 items-start">
        
        <!-- LEFT COLUMN: Sticky Specials Slider (h-auto via Grid) -->
        <aside class="w-[30%] xl:w-[25%] sticky top-[6rem] flex flex-col gap-6 pt-2">
          <div class="flex flex-col">
            <h2 class="font-display text-3xl font-bold mb-2 text-[#d4af37] tracking-wide uppercase transition-colors duration-500">Today's</h2>
            <h2 class="font-display text-4xl font-bold text-[#d4af37] tracking-wider uppercase -mt-1 drop-shadow-sm">Specials</h2>
          </div>

          <div 
            @touchstart="handleTouchStart" 
            @touchend="handleTouchEnd" 
            @mousedown="handleTouchStart" 
            @mouseup="handleTouchEnd"
            class="relative w-full h-auto bg-white dark:bg-[#2a2a2a] rounded-3xl overflow-hidden shadow-lg border border-zinc-100 dark:border-[#2a2a2a] transition-colors duration-500 flex flex-col cursor-grab active:cursor-grabbing select-none"
          >
            
            <div v-if="outletSpecials.length === 0" class="p-12 text-center text-zinc-500 dark:text-zinc-400 text-sm font-medium tracking-wide">
              Specials updating soon...
            </div>

            <transition-group v-else name="fade" tag="div" class="grid w-full">
              <div v-for="(special, index) in outletSpecials" :key="special.title" v-show="index === currentSpecialIndex" class="col-start-1 row-start-1 w-full flex flex-col">
                
                <div class="w-full aspect-[4/3] bg-white p-4 pb-0 flex items-center justify-center border-b border-zinc-100 dark:border-white/5">
                  <img :src="special.images[0]" :alt="special.title" class="w-full h-full object-contain rounded-2xl" />
                </div>
                
                <div class="w-full p-6 pb-12 flex flex-col bg-white dark:bg-[#1c1c1c] transition-colors duration-500">
                  <h3 class="text-2xl font-bold text-zinc-900 dark:text-white mb-2 leading-tight">{{ special.title }}</h3>
                  <p class="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-3 mb-4">{{ special.intro }}</p>
                  
                  <div class="mt-auto border-t border-zinc-50 dark:border-[#2a2a2a] pt-4 pb-2">
                    <div class="flex items-center justify-between">
                      <span class="text-sm font-medium text-zinc-600 dark:text-zinc-400">Today's Special</span>
                      <span class="text-[#d4af37] font-bold text-2xl">
                        {{ special.price }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </transition-group>
            
            <!-- Slider Indicators -->
            <div v-if="outletSpecials.length > 1" class="absolute bottom-4 inset-x-0 flex justify-center gap-2 z-20">
              <div v-for="(_, idx) in outletSpecials" :key="'dot-d-'+idx" :class="['h-2 rounded-full transition-all duration-300', currentSpecialIndex === idx ? 'w-6 bg-[#d4af37]' : 'w-2 bg-zinc-400 dark:bg-zinc-500']"></div>
            </div>
          </div>
        </aside>
        
        <!-- RIGHT COLUMN: The Catalog -->
        <main class="w-[70%] xl:w-[75%] flex flex-col min-h-screen">
          
          <!-- Outlet Tabs -->
          <div class="flex gap-4 pt-2 pb-4 transition-colors duration-500">
            <button 
              v-for="outlet in outlets" :key="'desktop-'+outlet.name" @click="activeOutlet = outlet.name"
              :class="[
                'flex flex-1 items-center justify-center gap-3 px-4 xl:px-6 py-3 rounded-xl transition-all duration-300 border',
                activeOutlet === outlet.name 
                  ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-[#d4af37] dark:text-[#0a0a0a] dark:border-[#d4af37] shadow-md' 
                  : 'bg-white text-zinc-600 border-zinc-200 dark:bg-[#2a2a2a] dark:text-zinc-400 dark:border-[#2a2a2a] hover:border-zinc-400 hover:text-zinc-900 dark:hover:text-white shadow-sm dark:shadow-none'
              ]"
            >
              <span v-html="outlet.icon" class="w-10 h-10"></span>
              <span class="text-left text-xs xl:text-sm font-bold tracking-widest uppercase leading-tight" v-html="outlet.titleHtml"></span>
            </button>
          </div>

          <!-- Category Pills -->
          <div class=" flex flex-wrap justify-center gap-5 py-4 mb-4 transition-colors duration-500 border-b border-zinc-200 dark:border-[#2a2a2a]">
            <button
              v-for="category in activeCategories" :key="'pill-'+category" @click="activeCategory = category"
              :class="[
                'px-5 py-2 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 border',
                activeCategory === category
                  ? 'bg-zinc-200 text-zinc-900 border-zinc-300 dark:bg-zinc-800 dark:text-white dark:border-zinc-700 shadow-sm'
                  : 'bg-white text-zinc-600 border-zinc-200 dark:bg-[#2a2a2a] dark:text-zinc-400 dark:border-[#2a2a2a] hover:border-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-300 shadow-sm dark:shadow-none'
              ]"
            >
              {{ category }}
            </button>
          </div>

          <!-- The Food Grid (GSAP Animated) -->
          <div class="flex flex-wrap justify-start gap-6 pb-20 pt-2">
            <div 
              v-for="item in activeDesktopItems" :key="'grid-'+item.id"
              class="menu-grid-card w-[280px] xl:w-[300px] flex flex-col bg-white dark:bg-[#2a2a2a] rounded-3xl border border-zinc-100 dark:border-[#2a2a2a] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group"
            >
              <!-- Image -->
              <div class="w-full aspect-[4/3] overflow-hidden relative border-b border-zinc-50 dark:border-[#2a2a2a]">
                <img :src="item.image" :alt="item.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
              </div>
              
              <!-- Content -->
              <div class="p-6 flex flex-col flex-1 bg-white dark:bg-[#2a2a2a] transition-colors duration-500">
                <h4 class="text-xl font-bold text-zinc-900 dark:text-white mb-2 leading-snug transition-colors duration-500">{{ item.name }}</h4>
                <p class="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 transition-colors duration-500">{{ item.info }}</p>
                
                <!-- Variants & Veg/Non-Veg -->
                <div class="mt-auto flex flex-col gap-3 pt-5 border-t border-zinc-50 dark:border-[#2a2a2a] mt-5">
                  
                  <!-- DESKTOP INVISIBLE TEMPLATE -->
                  <template v-for="spec in item.specializations" :key="spec.name">
                    
                    <!-- DESKTOP V-IF USING YOUR EXACT VARIABLE (showOnlyVeg) -->
                    <div v-if="!showOnlyVeg || spec.isVeg" class="flex justify-between items-center">
                      
                      <div class="flex items-center gap-2">
                        <!-- Dietary Indicator -->
                        <div class="w-4 h-4 flex items-center justify-center border rounded-sm p-[2px]" :class="spec.isVeg ? 'border-green-600' : 'border-red-600'">
                          <div class="w-full h-full rounded-full" :class="spec.isVeg ? 'bg-green-600' : 'bg-red-600'"></div>
                        </div>
                        <span class="text-sm font-medium text-zinc-600 dark:text-zinc-400">{{ spec.name || 'Regular' }}</span>
                      </div>
                      
                      <span class="text-[#d4af37] font-bold text-lg">
                        {{ spec.price === 'Seasonal' ? 'Seasonal' : '₹' + spec.price }}
                      </span>
                      
                    </div>
                    
                  </template>

                </div>
                
              </div>
            </div>
          </div>

        </main>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue';
import { gsap } from 'gsap';

const props = defineProps({
  menuData: { type: Array, required: true },
  dynamicSpecials: { type: Array, required: false, default: () => [] } // Accept dynamic specials
});

const isDark = ref(false);
const showOnlyVeg = ref(false); // Veg filter state

// Outlet Configuration with thicker SVG Icons
const outlets = [
  { 
    name: 'Multi Cuisine Restaurant', 
    titleHtml: 'Multi Cuisine<br/>Restaurant',
    icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 17h18M12 4v2m-7 8a7 7 0 0114 0v3H5v-3z"/></svg>` 
  },
  { 
    name: 'Arabic Corner', 
    titleHtml: 'Arabic<br/>Corner',
    icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 3l-6 6m-9 9l-3 3m5-6l4-4a3 3 0 014.2 0v0a3 3 0 010 4.2l-4 4a3 3 0 01-4.2 0v0a3 3 0 010-4.2"/></svg>` 
  },
  { 
    name: 'Chill N Chai', 
    titleHtml: 'Chill N<br/>Chai',
    icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M18 8H19C20.6569 8 22 9.34315 22 11C22 12.6569 20.6569 14 19 14H18M4 8H18V15C18 17.2091 16.2091 19 14 19H8C5.79086 19 4 17.2091 4 15V8ZM10 4V6M14 4V6M6 4V6"/></svg>` 
  }
];

const activeOutlet = ref('Multi Cuisine Restaurant');
const activeCategory = ref('');

// Change from a string to an array to hold multiple open accordions
const openAccordions = ref([]);

// --- SWIPE LOGIC FOR SLIDERS ---
const touchStartX = ref(0);
const touchEndX = ref(0);

const handleTouchStart = (e) => {
  // Capture the starting X coordinate (works for both touch and mouse)
  touchStartX.value = e.changedTouches ? e.changedTouches[0].screenX : e.screenX;
};

const handleTouchEnd = (e) => {
  // Capture the ending X coordinate
  touchEndX.value = e.changedTouches ? e.changedTouches[0].screenX : e.screenX;
  handleSwipe();
};

const handleSwipe = () => {
  const swipeThreshold = 50; // Minimum pixel drag to trigger a swipe
  const diff = touchStartX.value - touchEndX.value;
  
  if (Math.abs(diff) > swipeThreshold && outletSpecials.value.length > 1) {
    // Reset the 3-second autoplay timer so it doesn't instantly jump again
    startSlider(); 

    if (diff > 0) {
      // Swiped Left -> Next Slide
      currentSpecialIndex.value = (currentSpecialIndex.value + 1) % outletSpecials.value.length;
    } else {
      // Swiped Right -> Previous Slide
      currentSpecialIndex.value = (currentSpecialIndex.value - 1 + outletSpecials.value.length) % outletSpecials.value.length;
    }
  }
};

// --- UPDATED ACCORDION LOGIC ---
const toggleAccordion = (category) => {
  const index = openAccordions.value.indexOf(category);
  if (index > -1) {
    // If it's already open, close it
    openAccordions.value.splice(index, 1);
  } else {
    // If it's closed, open it and smoothly scroll to it
    openAccordions.value.push(category);
    
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const el = document.getElementById('acc-' + category.replace(/\s+/g, ''));
        if (el) {
          const yOffset = el.getBoundingClientRect().top + window.scrollY - 180;
          window.scrollTo({ top: yOffset, behavior: 'smooth' });
        }
      }, 350); 
    }
  }
};





// Extract unique categories belonging to the active outlet (Filtered by Veg state)
const activeCategories = computed(() => {
  const filtered = props.menuData.filter(item => {
    if (item.outlet !== activeOutlet.value) return false;
    if (showOnlyVeg.value) return item.specializations.some(spec => spec.isVeg);
    return true;
  });
  return [...new Set(filtered.map(item => item.category))];
});

// Helper for filtering items
const getItemsByCategory = (categoryName) => {
  let items = props.menuData.filter(item => item.category === categoryName);
  if (showOnlyVeg.value) {
    items = items.filter(item => item.specializations.some(spec => spec.isVeg));
  }
  return items;
};

const activeDesktopItems = computed(() => {
  return getItemsByCategory(activeCategory.value);
});

// --- SPECIALS SLIDER LOGIC ---
const currentSpecialIndex = ref(0);
let specialTimer = null;

// Updated computed property handling hydration and veg filtering
const outletSpecials = computed(() => {
  let specials = props.dynamicSpecials.filter(item => {
    // Match the exact outlet name (handling the hyphen difference)
    let targetOutlet = activeOutlet.value;
    if (targetOutlet === 'Multi Cuisine Restaurant') targetOutlet = 'Multi-Cuisine Restaurant';

    return item.category === targetOutlet;
  });

  // Apply the Veg toggle filter
  if (showOnlyVeg.value) {
    specials = specials.filter(item => item.isVeg);
  }

  // Hydrate with the exact keys the UI slider expects
  return specials.map(item => {
    return {
      title: item.name,
      intro: item.description,
      price: item.price,
      images: [item.image]
    };
  });
});

const startSlider = () => {
  if (typeof window === 'undefined') return;
  if (specialTimer) clearInterval(specialTimer);
  
  specialTimer = setInterval(() => {
    if (outletSpecials.value.length > 0) {
      currentSpecialIndex.value = (currentSpecialIndex.value + 1) % outletSpecials.value.length;
    }
  }, 3000); 
};

// --- UPDATED WATCHER ---
// Ensure the watcher resets the array properly when changing outlets
watch([activeOutlet, showOnlyVeg], () => {
  if (activeCategories.value.length > 0) {
    if (!activeCategories.value.includes(activeCategory.value)) activeCategory.value = activeCategories.value[0]; 
    
    // Automatically open the first accordion of the new outlet
    openAccordions.value = [activeCategories.value[0]]; 
  } else {
    activeCategory.value = '';
    openAccordions.value = [];
  }
  currentSpecialIndex.value = 0;
  startSlider(); 
}, { immediate: true });

// GSAP Subtle Entrance Animation
watch(activeCategory, async () => {
  if (typeof window === 'undefined') return;
  await nextTick();
  gsap.fromTo('.menu-grid-card',
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out', clearProps: 'all' }
  );
});

onMounted(() => {
  startSlider();
});

onUnmounted(() => {
  if (specialTimer) clearInterval(specialTimer);
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s ease-in-out;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>