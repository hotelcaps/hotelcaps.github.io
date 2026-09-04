<template>
  <div class="live-app-root">
    <ClientOnly>
      <!-- OUTER SCREEN WRAPPER (Pitch Black Background for Letterboxing) -->
      <div class="fixed inset-0 w-screen h-screen bg-black z-[9999] flex items-center justify-center overflow-hidden select-none font-sans text-white">
        
        <!-- CLICK TO START OVERLAY (Full Screen, Exactly as original) -->
        <div 
          v-if="!hasStarted"
          class="absolute inset-0 z-[100000] bg-black flex flex-col items-center justify-center cursor-pointer"
          @click="startLiveSignage"
        >
          <img src="/images/caps-solid-logo.png" alt="Hotel CAPS" class="h-[5vw] opacity-50 mb-[2vw]" />
          <div class="text-white/70 font-sans tracking-[0.3em] uppercase text-[1.2vw] animate-pulse">
            Click anywhere to Start CAPS Live
          </div>
        </div>

        <!-- THE 16:9 SCALED STAGE (Only visible after start) -->
        <div 
          v-show="hasStarted"
          class="relative bg-black overflow-hidden origin-center flex-shrink-0"
          :style="{ width: '1920px', height: '1080px', transform: `scale(${stageScale})` }"
        >
          
          <!-- BACKGROUND & DYNAMIC LIGHT TINT -->
          <div class="absolute inset-0 z-0 pointer-events-none">
            <img src="/images/live/live-bg.jpg" alt="Hotel CAPS Live Background" class="w-full h-full object-cover" />
            <div ref="bgTintRef" class="absolute opacity-70 inset-0 transition-colors duration-1000"></div>
          </div>

          <!-- TOP BAR -->
          <div class="absolute top-0 left-0 w-full z-20 flex justify-between items-start pl-[77px] pt-[38px]">
            
            <!-- Stacked Logo -->
            <div class="flex flex-col items-center gap-[10px]">
              <img src="/images/caps-solid-logo.png" alt="Hotel CAPS" class="h-[77px]" />
              <div class="text-[#1c1c1c] flex flex-col items-center font-display leading-none">
                <p class="text-[19px] font-medium tracking-widest">HOTEL</p>
                <p class="text-[29px] font-bold tracking-widest mt-[4px]">CAPS</p>
              </div>
            </div>

            <!-- CENTERED LIVE DATE BADGE -->
            <div 
              v-if="activeSlide && ['restaurant', 'chai', 'arabic', 'specials'].includes(activeSlide.trackerId)"
              class="absolute left-1/2 -translate-x-1/2 flex items-center gap-[14px] px-[26px] py-[10px]"
            >
              <!-- Day Number (Gold Accent) -->
              <span class="font-display font-bold text-[35px] text-[#ff5537] tracking-wider leading-none">
                {{ liveDate.day }}
              </span>

              <!-- Month -->
              <span class="font-display font-bold text-[35px] text-zinc-800 tracking-[0.2em] uppercase leading-none">
                {{ liveDate.month }} 
              </span>
              <!-- Year -->
              <span class="font-display font-bold text-[35px] text-[#ff5537] tracking-[0.2em] uppercase leading-none">
                  {{ liveDate.year }}
              </span>

              <!-- Subtle Divider Dot -->
              <span class="w-[5px] h-[5px] rounded-full bg-slate-700"></span>

              <!-- Day of Week (Warm Amber Highlight) -->
              <span class="font-display font-semibold text-[31px] text-zinc-800 tracking-[0.25em] uppercase leading-none">
                {{ liveDate.weekday }}
              </span>
            </div>

            <!-- Live Indicator -->
            <div 
              v-if="activeSlide && ['restaurant', 'chai', 'arabic', 'specials'].includes(activeSlide.trackerId)"
              class="flex items-center gap-[12px] bg-[#ff1020]/10 backdrop-blur-md border-[#ff2030]/30 border-[2px] mr-[38px] px-[23px] py-[12px] rounded-full shadow-lg"
            >
              <div class="w-[15px] h-[15px] bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
              <span class="text-white text-[15px] font-bold tracking-widest uppercase">Now Serving</span>
            </div>
          </div>

          <!-- MAIN STAGE -->
          <div v-if="activeSlide && !isScreensaverActive" class="absolute inset-0 z-10 flex flex-row items-center pt-[96px] pb-[115px] px-[77px]">
            
            <template v-if="activeSlide.format !== 'LIST'">
              <!-- LEFT SIDE (Text Content) -->
              <div class="w-[864px] flex flex-col items-start pr-[58px] pt-[38px]">
                <h2 
                  v-if="activeSlide.outlet" 
                  class="live-text-item font-['Dancing_Script'] text-[67px] font-bold mb-[10px] leading-tight"
                  :style="{ color: activeSlide.mainTitleColor }"
                >
                  {{ activeSlide.outlet }}
                </h2>

                <h1 class="live-text-item font-display font-bold uppercase tracking-wide leading-none mb-[29px]">
                  <span 
                    class="block text-[86px]"
                    :style="{ color: activeSlide.tagBgHex }"
                  >
                    {{ activeSlide.mainTitle }}
                  </span>
                </h1>

                <div class="live-text-item flex items-center mb-[19px]">
                  <h3 class="font-sans font-bold text-white text-[40px] leading-snug flex items-center gap-[20px]">
                    <!-- Veg / Non-Veg Indicator -->
                    <div 
                      v-if="activeSlide.isVeg !== undefined" 
                      class="flex-shrink-0 flex items-center justify-center w-[28px] h-[28px] border-[2.5px] rounded-[6px]"
                      :class="activeSlide.isVeg ? 'border-green-700' : 'border-red-700'"
                    >
                      <div 
                        class="w-[12px] h-[12px] rounded-full"
                        :class="activeSlide.isVeg ? 'bg-green-700' : 'bg-red-700'"
                      ></div>
                    </div>
                    {{ activeSlide.title }}
                  </h3>
                </div>

                <p class="live-text-item font-sans text-zinc-100 text-[21px] leading-relaxed mb-[29px] max-w-[576px]">
                  {{ activeSlide.intro }}
                </p>

                <div v-if="activeSlide.price" class="live-text-item font-display font-bold text-[48px] mb-[48px]">
                  <span :style="{ color: activeSlide.priceColor ? activeSlide.priceColor : '#f0cb52' }" class="font-display font-bold text-[48px] leading-none">
                    {{ activeSlide.price }}
                  </span>
                </div>

                <!-- Feature Tags -->
                <div class="live-text-item flex flex-wrap gap-[19px] mt-auto">
                  <div 
                      v-for="(tag, tIdx) in activeSlide.tags" 
                      :key="tIdx"
                      class="flex items-center gap-[12px] border border-white/20 px-[19px] py-[10px] rounded-[15px] text-white/90 text-[17px] font-medium tracking-wide backdrop-blur-sm shadow-md"
                      :style="{ backgroundColor: activeSlide.tagBgHex }"
                    >
                      <div 
                        class="w-[23px] h-[23px]" 
                        :style="{ color: activeSlide.priceColor || '#f0cb52' }" 
                        v-html="tag.icon"
                      ></div>
                      {{ tag.text }}
                  </div>
                </div>
              </div>

              <!-- RIGHT SIDE (Visual Content) -->
              <div class="w-[1056px] h-full relative flex items-center justify-center">
                
                <!-- Format A -->
                <div v-if="activeSlide.format === 'A'" class="live-image-item w-full h-full flex items-center justify-center">
                  <img 
                    :src="activeSlide.images?.[0] 
                      ? (['Multi Cuisine Restaurant', 'Arabic Corner', 'Chill N Chai'].includes(activeSlide.outlet) 
                          ? `${activeSlide.images[0]}?w=1200` 
                          : activeSlide.images[0]) 
                      : '/images/live/placeholder.jpg'" 
                    @error="$event.target.src = '/images/live/placeholder.jpg'"
                    :alt="activeSlide.title"
                    :class="[
                      'max-w-[864px]',
                      activeSlide.isRoom 
                        ? 'w-[90%] max-h-[75%] object-cover rounded-[38px] border-[4px] border-white/10 shadow-[0_19px_58px_rgba(0,0,0,0.5)]' 
                        : (['Multi-Cuisine Restaurant', 'Arabic Corner', 'Chill N Chai'].includes(activeSlide.outlet)
                            ? 'max-h-[85%] w-auto aspect-[4/3] object-cover rounded-[34px] shadow-2xl shadow-black/20'
                            : 'max-h-[85%] object-contain drop-shadow-2xl')
                    ]"
                  />
                </div>

                <!-- Format B -->
                <div v-if="activeSlide.format === 'B'" class="w-full h-full relative">
                  <img :src="activeSlide.images[0]" :alt="activeSlide.title" class="live-image-item absolute top-[8%] left-[20%] w-[45%] aspect-video object-cover rounded-[19px] border-[4px] border-white/10 shadow-2xl z-10" />
                  <img :src="activeSlide.images[1]" :alt="activeSlide.title" class="live-image-item absolute bottom-[8%] left-[20%] w-[45%] aspect-video object-cover rounded-[19px] border-[4px] border-white/10 shadow-2xl z-20" />
                  <img :src="activeSlide.images[2]" :alt="activeSlide.title" class="live-image-item absolute top-1/2 -translate-y-1/2 right-[0%] w-[45%] aspect-video object-cover rounded-[19px] border-[4px] border-white/10 shadow-2xl z-30" />
                </div>
              </div>
            </template>

            <!-- FORMAT LIST (7 ITEMS PER OUTLET COLUMN) -->
            <div v-if="activeSlide.format === 'LIST'" class="w-full h-full flex flex-col pt-[1rem]">
              
              <div class="text-center mb-[1.5rem] flex flex-col items-center">
                <h2 class="live-text-item font-['Dancing_Script'] text-[58px] font-bold mb-2 leading-tight" :style="{ color: activeSlide.darkHex }">
                  {{ activeSlide.outlet }}
                </h2>
                <h1 class="live-text-item font-display font-bold uppercase tracking-wide leading-none text-[77px]" :style="{ color: activeSlide.mainTitleColor }">
                  {{ activeSlide.mainTitle }}
                </h1>
              </div>

              <div class="flex justify-center gap-[70px] w-full px-[38px] h-full">
                
                <div v-for="(outlet, oIdx) in activeSlide.outlets" :key="oIdx" class="flex flex-col gap-[15px]" :style="{ flex: outlet.columns.length }">
                  
                  <h2 class="live-text-item font-display font-bold text-[35px] mb-[10px] uppercase tracking-wider text-center" :style="{color: outlet.color}">
                    {{ outlet.name }}
                  </h2>
                  
                  <div class="flex gap-[60px] h-full">
                    <div v-for="(col, cIdx) in outlet.columns" :key="cIdx" class="flex-1 flex flex-col gap-[0]">
                      <div v-for="(item, iIdx) in col" :key="iIdx" class="live-list-item flex items-center justify-between border-b border-white/10 py-[12px]">
                        <div class="flex items-center gap-[14px]">
                          <div v-if="item.isVeg !== undefined" class="flex-shrink-0 flex items-center justify-center w-[18px] h-[18px] border-[2px] rounded-[4px]" :class="item.isVeg ? 'border-green-700' : 'border-red-700'">
                            <div class="w-[8px] h-[8px] rounded-full" :class="item.isVeg ? 'bg-green-700' : 'bg-red-700'"></div>
                          </div>
                          <span class="font-sans text-[23px] text-zinc-900 font-medium tracking-wide leading-snug mt-[4px]">{{ item.name }}</span>
                        </div>
                        <span class="font-bold text-[23px] text-[#ff5537] leading-none whitespace-nowrap ml-[15px] mt-[4px]">{{ item.price }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 4. BOTTOM PANE (Progress Tracker) -->
          <div class="absolute bottom-0 left-0 w-full h-[115px] bg-[#0f172a] border-t border-white/10 z-30 flex items-center justify-between px-[77px] shadow-[0_-10px_29px_rgba(0,0,0,0.5)]">
            
            <div class="flex flex-col items-center text-[#d4af37] font-medium uppercase tracking-widest text-[15px] mr-[77px]">
              <span>Next Up</span>
              <svg class="w-[23px] h-[23px] mt-[4px] animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </div>

            <div class="flex-1 flex justify-between items-center max-w-[1152px] mx-auto">
              <template v-for="(cat, idx) in capsCategoriesData" :key="cat.id">
                
                <div 
                  class="flex flex-col items-center gap-[8px] transition-all duration-700"
                  :class="activeSlide && activeSlide.trackerId === cat.id ? 'opacity-100 scale-110' : 'opacity-40 scale-100'"
                >
                  <div 
                    class="w-[38px] h-[38px] transition-colors duration-700"
                    :style="{ color: activeSlide && activeSlide.trackerId === cat.id ? activeSlide.lightHex : 'white' }"
                    v-html="cat.icon"
                  ></div>
                  <span class="text-[12px] font-medium uppercase tracking-wider text-white text-center whitespace-nowrap">
                    {{ cat.name }}
                  </span>
                </div>

                <div v-if="idx < capsCategoriesData.length - 1" class="text-[#d4af37] px-[19px] opacity-70">
                  <svg class="w-[19px] h-[19px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                </div>
              </template>
            </div>
          </div>

          <!-- 5. SCREENSAVER LOOP RESET -->
          <div v-if="isScreensaverActive" class="absolute inset-0 z-40 bg-[#040404] flex items-center justify-center screensaver-container">
            <div class="relative z-10 flex flex-col items-center">
              <img id="saver-logo" src="/images/caps-solid-logo.png" class="h-[154px] mb-[38px] opacity-0" alt="Hotel CAPS" />
              <div class="perspective-[1000px] flex flex-col items-center font-display text-white">
                <p class="text-[29px] font-medium tracking-[0.4em] leading-loose flex ml-[0.4em]">
                  <span v-for="(char, i) in 'HOTEL'.split('')" :key="'sh-'+i" class="saver-h-char inline-block opacity-0">{{ char }}</span>
                </p>
                <p class="text-[67px] font-bold tracking-[0.3em] mt-[10px] flex ml-[0.3em]">
                  <span v-for="(char, i) in 'CAPS'.split('')" :key="'sc-'+i" class="saver-c-char inline-block opacity-0">{{ char }}</span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';

// Import only the static rules and fixed slides
import { specialsThemeDictionary, staticSpecialsSlides, capsCategoriesData } from '~/capsSpecialsData.js';

// Formatted Live Date: Day, Month, Year, and Day of Week
const liveDate = computed(() => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = now.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const year = now.getFullYear();
  const weekday = now.toLocaleString('en-US', { weekday: 'long' });

  return { day, month, year, weekday };
});

// =====================================
// NEW SCALING LOGIC FOR 16:9 STAGE
// =====================================
const stageScale = ref(1);

const updateScale = () => {
  if (typeof window !== 'undefined') {
    const winW = window.innerWidth;
    const winH = window.innerHeight;
    // Fit the 1920x1080 canvas inside whatever the browser window size is
    stageScale.value = Math.min(winW / 1920, winH / 1080);
  }
};

// Initialize a reactive reference to hold our final parsed specials data
const dynamicSpecials = ref([]);
const isLoading = ref(true); // Optional: use this to show a loading spinner

onMounted(async () => {
  // Add scale listener
  updateScale();
  window.addEventListener('resize', updateScale);

  // 1. The official WP Public API endpoint, with a cache-busting timestamp
  const wpUrl = `https://public-api.wordpress.com/wp/v2/sites/hotelcapsfamily.wordpress.com/pages?slug=specials-data&_t=${Date.now()}`;
  
  try {
    // 2. Fetch directly from the visitor's browser
    const response = await $fetch(wpUrl);

    // 3. Validate, Clean, and Parse
    if (response && Array.isArray(response) && response.length > 0) {
        let rawString = response[0].content.rendered;
        
        let cleanString = rawString.replace(/<[^>]*>?/gm, '');
        
        cleanString = cleanString
        .replace(/&#8220;|&#8221;|“|”/g, '"')
        .replace(/&#8216;|&#8217;|‘|’/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/&nbsp;/g, ' ')
        .replace(/&#8211;|&#8212;/g, '-')
        .trim();
        
        // 4. Hydrate the UI instantly
        dynamicSpecials.value = JSON.parse(cleanString);
    } 
  } catch (error) {
    console.error("Live Client Fetch Error:", error);
  } finally {
    isLoading.value = false;
  }
});

definePageMeta({ layout: false });

const pageTitle = 'CAPS Live | Hotel CAPS, Koduvayur, Palakkad'
const pageDesc = 'View Hotel CAPS Daily Specials and Offers, featuring multi-cuisine favorites, bestsellers, our delicacies, snacks, beverages & more.'
const canonicalUrl = 'https://capsfamily.in/live'
const ogImage = 'https://capsfamily.in/images/favicons/caps-live-og-image.jpg'

// 2. Structured Link and JSON-LD Schema Injection
useHead({
  link: [
    { rel: 'canonical', href: canonicalUrl }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Menu",
        "name": pageTitle,
        "description": pageDesc,
        "url": canonicalUrl,
        "mainEntity": {
          "@type": "Restaurant",
          "name": "Hotel CAPS Multi-Cuisine Restaurant",
          "url": "https://capsfamily.in/restaurant",
          "telephone": [
            "+919207517064",
            "+918848369567"
          ],
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Main Road, Pittupeedika",
            "addressLocality": "Koduvayur",
            "addressRegion": "Kerala",
            "postalCode": "678501",
            "addressCountry": "IN"
          }
        }
      })
    }
  ]
})

// 3. Nuxt 4 SEO Composable (Search & Social Cards)
useSeoMeta({
  title: pageTitle,
  description: pageDesc,
  ogTitle: pageTitle,
  ogDescription: pageDesc,
  ogUrl: canonicalUrl,
  ogImage: ogImage,
  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: pageDesc,
  twitterImage: ogImage
})

// ----------------------------------------------------------------------------
// HYDRATION ENGINE: Merges Dynamic Data with Static Rules
// ----------------------------------------------------------------------------
const capsSpecialsData = computed(() => {
  const dynamicData = dynamicSpecials.value;

  // 1. Map Individual Specials (Adding isVeg parsing)
  const grandSpecialsRaw = dynamicData.filter(item => item.category === 'CAPS');
  const outletSpecialsRaw = dynamicData.filter(item => item.category !== 'CAPS');

  const grandSpecials = grandSpecialsRaw.map(item => ({
    format: 'A', isRoom: false, outlet: item.category, title: item.name, 
    intro: item.description, price: item.price, images: [item.image],
    isVeg: item.isVeg === true || item.isVeg === 'true', // Safety parse for WP strings
    ...specialsThemeDictionary['CAPS']
  }));

  const individualSpecials = outletSpecialsRaw.map(item => {
    const theme = specialsThemeDictionary[item.category] || specialsThemeDictionary['Multi-Cuisine Restaurant'];
    return {
      format: 'A', isRoom: false, outlet: item.category, title: item.name, 
      intro: item.description, price: item.price, images: [item.image], 
      isVeg: item.isVeg === true || item.isVeg === 'true',
      ...theme
    };
  });

  // 2. The Auto-Paginating Engine for LIST slides
  const outletsForList = [
    { key: 'Multi-Cuisine Restaurant', name: 'Restaurant', color: '#14532d' },
    { key: 'Chill N Chai', name: 'Chill N Chai', color: '#78350f' },
    { key: 'Arabic Corner', name: 'Arabic Corner', color: '#451a03' }
  ];

  const listSlides = [];
  let currentSlideOutlets = [];
  let currentSlideCols = 0;

  outletsForList.forEach(out => {
    const items = outletSpecialsRaw.filter(item => item.category === out.key);
    if (items.length === 0) return;

    // Slice items into chunks of 7
    const chunks = [];
    for (let i = 0; i < items.length; i += 7) {
      chunks.push(items.slice(i, i + 7).map(item => ({
        name: item.name, 
        price: item.price,
        isVeg: item.isVeg === true || item.isVeg === 'true'
      })));
    }

    chunks.forEach(chunk => {
      // If slide hits 3 columns, package it and start a fresh slide
      if (currentSlideCols === 3) {
        listSlides.push({
          trackerId: 'specials', format: 'LIST', isRoom: false, 
          mainTitle: "TODAY'S SPECIALS", mainTitleColor: '#ff5537', 
          darkHex: '#2a2a2a', lightHex: '#eaeaea', outlet: 'Explore Our Specials', 
          outlets: currentSlideOutlets
        });
        currentSlideOutlets = [];
        currentSlideCols = 0;
      }

      // Find if this outlet already exists on the current slide
      let existingOutlet = currentSlideOutlets.find(o => o.name === out.name);
      if (!existingOutlet) {
        existingOutlet = { name: out.name, color: out.color, columns: [] };
        currentSlideOutlets.push(existingOutlet);
      }

      // Drop the chunk in and increment the column counter
      existingOutlet.columns.push(chunk);
      currentSlideCols++;
    });
  });

  // Push the final slide if there's leftover data
  if (currentSlideOutlets.length > 0) {
    listSlides.push({
      trackerId: 'specials', format: 'LIST', isRoom: false, 
      mainTitle: "TODAY'S SPECIALS", mainTitleColor: '#ff5537', 
      darkHex: '#2a2a2a', lightHex: '#eaeaea', outlet: 'Explore Our Specials', 
      outlets: currentSlideOutlets
    });
  }

  // Combine Everything
  return [...grandSpecials, ...listSlides, ...individualSpecials, ...staticSpecialsSlides];
});

// ----------------------------------------------------------------------------
// SLIDER & GSAP STATE
// ----------------------------------------------------------------------------
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

const runCycle = async (index) => {
  if (index >= capsSpecialsData.value.length) {
    runScreensaver();
    return;
  }

  activeSlideIndex.value = index;
  activeSlide.value = capsSpecialsData.value[index];
  
  await nextTick();

  if (bgTintRef.value) {
    if (activeSlide.value.format === 'LIST') {
      // Dark warm amber overlay across the entire stage
      bgTintRef.value.style.backgroundColor = '#e6c2a4'; // Deep dark amber/espresso
      bgTintRef.value.style.opacity = '0.52';            // Darkens the base image cleanly
    } else {
      // Reset back to standard dynamic theme behavior for regular slides
      bgTintRef.value.style.backgroundColor = activeSlide.value.lightHex;
      bgTintRef.value.style.opacity = '0.70';
    }
  }
  const tlIn = gsap.timeline();
  
  // Slide in Titles & Text
  tlIn.fromTo('.live-text-item', 
    { x: -50, opacity: 0 }, 
    { x: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out' }, 
    0
  );

  // If standard slide, trigger image entrance
  if (activeSlide.value.format !== 'LIST') {
    tlIn.fromTo('.live-image-item', 
      { x: 50, opacity: 0, scale: 0.95 }, 
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
  }

  // If LIST slide, trigger the individual menu items elegantly
  if (activeSlide.value.format === 'LIST') {
    tlIn.fromTo('.live-list-item', 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: 'power3.out' }, 
      0.4
    );
  }

  // Extended time: 6 seconds total
  loopTimeout = setTimeout(() => {
    // Fade out everything targeted by GSAP
    gsap.to(['.live-text-item', '.live-image-item', '.live-list-item'], {
      x: (i, target) => {
        if (target.classList.contains('live-list-item')) return 0;
        return target.classList.contains('live-text-item') ? -50 : 50;
      },
      y: (i, target) => target.classList.contains('live-list-item') ? 20 : 0,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.in',
      onComplete: () => {
        runCycle(index + 1);
      }
    });
  }, 6000); 
};

const runScreensaver = async () => {
  isScreensaverActive.value = true;
  activeSlide.value = null; 
  
  await nextTick();

  const tl = gsap.timeline({
    onComplete: () => {
      setTimeout(() => {
        gsap.to('.screensaver-container', { 
          opacity: 0, 
          duration: 1, 
          onComplete: () => {
            isScreensaverActive.value = false;
            runCycle(0);
          }
        });
      }, 1000);
    }
  });

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

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScale);
  clearTimeout(loopTimeout);
});
</script>