<template>
  <div :class="['menu-wrapper transition-colors duration-500 font-sans', isDark ? 'dark bg-[#0a0a0a]' : 'bg-[#f9f7f3]']">
    
    <!-- LIGHT / DARK MODE TOGGLE -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex justify-end">
      <div 
        @click="isDark = !isDark"
        class="flex items-center gap-2 bg-white dark:bg-[#141414] border border-zinc-200 dark:border-white/10 p-1 rounded-full cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 select-none"
      >
        <div :class="['px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase transition-colors', !isDark ? 'bg-[#d4af37] text-white' : 'text-zinc-400']">
          Light
        </div>
        <div :class="['px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase transition-colors', isDark ? 'bg-[#d4af37] text-black' : 'text-zinc-400']">
          Dark
        </div>
      </div>
    </div>

    <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      
      <!-- ==========================================
           MOBILE & TABLET LAYOUT (< 1024px)
           ========================================== -->
      <div class="block lg:hidden">
        
        <!-- Mobile Specials Slider -->
        <div class="mb-8 relative w-full h-[45vh] bg-white dark:bg-[#141414] rounded-2xl overflow-hidden shadow-lg border border-zinc-200 dark:border-white/5 transition-colors duration-500">
          <!-- The 'Today's Special' tag is strictly text-zinc-900 in light mode, text-white in dark mode -->
          <div class="absolute top-4 left-4 z-20 flex items-center gap-2 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-black/5 dark:border-white/10 shadow-sm">
            <svg class="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span class="text-xs font-bold tracking-widest uppercase text-zinc-900 dark:text-white">Today's Special</span>
          </div>
          
          <transition-group name="fade" tag="div" class="w-full h-full relative">
            <div 
              v-for="(special, index) in outletSpecials" 
              :key="special.id"
              v-show="index === currentSpecialIndex"
              class="absolute inset-0 w-full h-full flex flex-col"
            >
              <div class="h-2/3 w-full relative">
                <img :src="special.image" :alt="special.name" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-white via-transparent dark:from-[#141414]"></div>
              </div>
              <div class="h-1/3 w-full p-5 flex flex-col justify-end bg-white dark:bg-[#141414] transition-colors duration-500">
                <h3 class="text-xl font-bold text-zinc-900 dark:text-white mb-1">{{ special.name }}</h3>
                <p class="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-1 mb-2">{{ special.info }}</p>
                <span class="text-[#d4af37] font-bold text-lg">₹{{ special.specializations[0]?.price }}</span>
              </div>
            </div>
          </transition-group>
        </div>

        <!-- Sticky Outlet Tabs -->
        <div class="sticky top-0 z-40 bg-[#f9f7f3] dark:bg-[#0a0a0a] pt-2 pb-4 mb-4 border-b border-zinc-200 dark:border-white/10 flex justify-center gap-2 sm:gap-4 transition-colors duration-500">
          <button 
            v-for="outlet in outlets" 
            :key="outlet"
            @click="activeOutlet = outlet"
            :class="[
              'px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 border',
              activeOutlet === outlet 
                ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-[#d4af37] dark:text-black dark:border-[#d4af37] shadow-md' 
                : 'bg-white text-zinc-600 border-zinc-300 dark:bg-[#141414] dark:text-zinc-400 dark:border-transparent hover:border-zinc-400 hover:text-zinc-900 dark:hover:text-white shadow-sm dark:shadow-none'
            ]"
          >
            {{ outlet }}
          </button>
        </div>

        <!-- Mobile Accordions -->
        <div class="flex flex-col gap-3 pb-20">
          <div 
            v-for="category in activeCategories" 
            :key="category"
            class="bg-white dark:bg-[#141414] rounded-2xl border border-zinc-200 dark:border-white/5 overflow-hidden shadow-sm transition-colors duration-500"
          >
            <!-- Accordion Header -->
            <button 
              @click="toggleAccordion(category)"
              class="w-full px-5 py-4 flex justify-between items-center bg-white dark:bg-[#141414] transition-colors duration-500"
            >
              <span class="font-display font-bold text-lg text-zinc-900 dark:text-white">{{ category }}</span>
              <svg 
                :class="['w-5 h-5 text-[#d4af37] transition-transform duration-300', openAccordion === category ? 'rotate-180' : '']" 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              ><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            
            <!-- Accordion Content -->
            <div 
              class="grid transition-all duration-500 ease-in-out"
              :class="openAccordion === category ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
            >
              <div class="overflow-hidden">
                <div class="p-5 pt-0 flex flex-col gap-5 border-t border-zinc-100 dark:border-white/5">
                  <div 
                    v-for="item in getItemsByCategory(category)" 
                    :key="item.id"
                    class="flex gap-4 items-center"
                  >
                    <!-- 4:3 Image -->
                    <img :src="item.image" :alt="item.name" class="w-20 h-15 aspect-[4/3] object-cover rounded-lg border border-zinc-100 dark:border-white/10 shadow-sm" />
                    <div class="flex-1">
                      <h4 class="text-sm font-bold text-zinc-900 dark:text-white">{{ item.name }}</h4>
                      <p class="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 my-0.5">{{ item.info }}</p>
                      <span class="text-sm font-bold text-[#d4af37]">₹{{ item.specializations[0]?.price }}</span>
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
        
        <!-- LEFT COLUMN: Sticky Specials Slider -->
        <aside class="w-[30%] xl:w-[25%] sticky top-8 flex flex-col gap-6">
          
          <!-- Explicitly text-zinc-900 in light mode -->
          <div class="flex flex-col">
            <h2 class="font-display text-3xl font-bold text-zinc-900 dark:text-white tracking-wide uppercase transition-colors duration-500">Today's</h2>
            <h2 class="font-display text-4xl font-bold text-[#d4af37] tracking-wider uppercase -mt-1">Specials</h2>
          </div>

          <div class="relative w-full aspect-[3/4] bg-white dark:bg-[#141414] rounded-2xl overflow-hidden shadow-xl border border-zinc-200 dark:border-white/5 transition-colors duration-500">
            <transition-group name="fade" tag="div" class="w-full h-full relative">
              <div 
                v-for="(special, index) in outletSpecials" 
                :key="special.id"
                v-show="index === currentSpecialIndex"
                class="absolute inset-0 w-full h-full flex flex-col"
              >
                <!-- 4:3 Image Container -->
                <div class="w-full aspect-[4/3] p-4 pb-0">
                  <img :src="special.image" :alt="special.name" class="w-full h-full object-cover rounded-xl shadow-md border border-zinc-100 dark:border-white/5" />
                </div>
                <!-- Details -->
                <div class="flex-1 p-6 flex flex-col justify-center">
                  <!-- Explicitly text-zinc-900 in light mode -->
                  <h3 class="text-2xl font-bold text-zinc-900 dark:text-white mb-2 leading-tight transition-colors duration-500">{{ special.name }}</h3>
                  <p class="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-4 transition-colors duration-500">{{ special.info }}</p>
                  <span class="text-[#d4af37] font-bold text-2xl mt-auto">₹{{ special.specializations[0]?.price }}</span>
                </div>
              </div>
            </transition-group>
            
            <!-- Slider Indicators -->
            <div class="absolute bottom-6 inset-x-0 flex justify-center gap-2 z-20">
              <div 
                v-for="(_, idx) in outletSpecials" 
                :key="'dot-'+idx"
                :class="['h-1.5 rounded-full transition-all duration-300', currentSpecialIndex === idx ? 'w-6 bg-[#d4af37]' : 'w-1.5 bg-zinc-300 dark:bg-zinc-600']"
              ></div>
            </div>
          </div>
        </aside>

        <!-- RIGHT COLUMN: The Catalog -->
        <main class="w-[70%] xl:w-[75%] flex flex-col min-h-screen">
          
          <!-- Outlet Tabs -->
          <div class="flex gap-4 border-b border-zinc-200 dark:border-white/10 pb-6 mb-6 transition-colors duration-500">
            <button 
              v-for="outlet in outlets" 
              :key="'desktop-'+outlet"
              @click="activeOutlet = outlet"
              :class="[
                'px-8 py-3 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 border',
                activeOutlet === outlet 
                  ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-[#d4af37] dark:text-black dark:border-[#d4af37] shadow-lg' 
                  : 'bg-white text-zinc-600 border-zinc-300 dark:bg-[#141414] dark:text-zinc-400 dark:border-transparent hover:border-zinc-400 hover:text-zinc-900 dark:hover:text-white shadow-sm dark:shadow-none'
              ]"
            >
              {{ outlet }}
            </button>
          </div>

          <!-- Category Pills (Horizontal Scroll - Removed mask fading edges) -->
          <div class="flex overflow-x-auto hide-scrollbar gap-3 pb-4 mb-6">
            <button
              v-for="category in activeCategories"
              :key="'pill-'+category"
              @click="activeCategory = category"
              :class="[
                'whitespace-nowrap px-5 py-2 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 border',
                activeCategory === category
                  ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white/10 dark:text-white dark:border-white/20 shadow-md'
                  : 'bg-white text-zinc-600 border-zinc-300 dark:bg-transparent dark:text-zinc-500 dark:border-transparent hover:border-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-300 shadow-sm dark:shadow-none'
              ]"
            >
              {{ category }}
            </button>
          </div>

          <!-- The Food Grid (Flex Wrap, Centered Orphans) -->
          <div class="flex flex-wrap justify-center gap-6 pb-20">
            <div 
              v-for="item in getItemsByCategory(activeCategory)" 
              :key="'grid-'+item.id"
              class="w-[280px] xl:w-[300px] flex flex-col bg-white dark:bg-[#141414] rounded-2xl border border-zinc-200 dark:border-white/5 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group"
            >
              <!-- 4:3 Image -->
              <div class="w-full aspect-[4/3] overflow-hidden relative border-b border-zinc-100 dark:border-white/5">
                <img 
                  :src="item.image" 
                  :alt="item.name" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                />
              </div>
              <!-- Content -->
              <div class="p-6 flex flex-col flex-1 bg-white dark:bg-[#141414] transition-colors duration-500">
                <h4 class="text-lg font-bold text-zinc-900 dark:text-white mb-2 leading-snug transition-colors duration-500">{{ item.name }}</h4>
                <p class="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-6 transition-colors duration-500">{{ item.info }}</p>
                <span class="text-[#d4af37] font-bold text-xl mt-auto">₹{{ item.specializations[0]?.price }}</span>
              </div>
            </div>
          </div>

        </main>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  menuData: {
    type: Array,
    required: true
  }
});

// --- THEME STATE ---
const isDark = ref(false);

// --- OUTLET & CATEGORY STATE ---
const outlets = ['Restaurant', 'Arabic Corner', 'Chill N Chai'];
const activeOutlet = ref('Restaurant');
const activeCategory = ref('');
const openAccordion = ref('');

// Computed: Extract unique categories belonging to the currently active outlet
const activeCategories = computed(() => {
  const cats = props.menuData
    .filter(item => item.outlet === activeOutlet.value)
    .map(item => item.category);
  return [...new Set(cats)];
});

const getItemsByCategory = (categoryName) => {
  return props.menuData.filter(item => item.category === categoryName);
};

// --- SPECIALS SLIDER LOGIC ---
const currentSpecialIndex = ref(0);
let specialTimer = null;

const outletSpecials = computed(() => {
  return props.menuData.filter(item => item.outlet === activeOutlet.value && item.isSpecial);
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

// --- WATCHERS ---
watch(activeOutlet, () => {
  if (activeCategories.value.length > 0) {
    activeCategory.value = activeCategories.value[0]; 
    openAccordion.value = activeCategories.value[0]; 
  }
  currentSpecialIndex.value = 0;
  startSlider(); 
}, { immediate: true });

const toggleAccordion = (category) => {
  openAccordion.value = openAccordion.value === category ? '' : category;
};

// --- LIFECYCLE ---
onMounted(() => {
  startSlider();
});

onUnmounted(() => {
  if (specialTimer) clearInterval(specialTimer);
});
</script>

<style scoped>
/* Smooth Fade Transition for the Auto-playing Specials Slider */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Hide Scrollbar for Desktop Category Pills */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>