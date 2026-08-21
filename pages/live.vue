<template>
  <div class="live-app-root">
    <ClientOnly>
      <!-- w-screen & h-screen acts exactly as 16:9 on TVs -->
      <div class="fixed inset-0 w-screen h-screen bg-black z-[9999] overflow-hidden select-none font-sans text-white">
        
        <!-- CLICK TO START OVERLAY -->
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

        <!-- BACKGROUND & DYNAMIC LIGHT TINT -->
        <div class="absolute inset-0 z-0">
          <img src="/images/live/live-bg.jpg" alt="Hotel CAPS Live Background" class="w-full h-full object-cover" />
          <div ref="bgTintRef" class="absolute opacity-70 inset-0 transition-colors duration-1000"></div>
        </div>

        <!-- TOP BAR -->
        <div class="absolute top-0 left-0 w-full z-20 flex justify-between items-start pl-[4vw] pt-[2vw]">
          
          <!-- Stacked Logo -->
          <div class="flex flex-col items-center gap-[0.5vw]">
            <img src="/images/caps-solid-logo.png" alt="Hotel CAPS" class="h-[4vw]" />
            <div class="text-white flex flex-col items-center font-display leading-none">
              <p class="text-[1vw] font-medium tracking-widest">HOTEL</p>
              <p class="text-[1.5vw] font-bold tracking-widest mt-[0.2vw]">CAPS</p>
            </div>
          </div>

          <!-- Live Indicator -->
          <div 
            v-if="activeSlide && ['restaurant', 'chai', 'arabic', 'specials'].includes(activeSlide.trackerId)"
            class="flex items-center gap-[0.6vw] bg-[#ff1020]/10 backdrop-blur-md border-[#ff2030]/30 border-[0.1vw] mr-[2vw] px-[1.2vw] py-[0.6vw] rounded-full shadow-lg"
          >
            <div class="w-[0.8vw] h-[0.8vw] bg-red-500 rounded-full animate-pulse shadow-[0_0_0.5vw_rgba(239,68,68,0.8)]"></div>
            <span class="text-white text-[0.8vw] font-bold tracking-widest uppercase">Now Serving</span>
          </div>
        </div>

        <!-- MAIN STAGE -->
        <div v-if="activeSlide && !isScreensaverActive" class="absolute inset-0 z-10 flex flex-row items-center pt-[5vw] pb-[6vw] px-[4vw]">
          
          <!-- ===================================== -->
          <!-- FORMAT A / B (STANDARD INDIVIDUAL)    -->
          <!-- ===================================== -->
          <template v-if="activeSlide.format !== 'LIST'">
            <!-- LEFT SIDE (Text Content) -->
            <div class="w-[45vw] flex flex-col items-start pr-[3vw] pt-[2vw]">
              <h2 
                v-if="activeSlide.outlet" 
                class="live-text-item font-['Dancing_Script'] text-[3.5vw] font-bold mb-[0.5vw] leading-tight"
                :style="{ color: activeSlide.darkHex }"
              >
                {{ activeSlide.outlet }}
              </h2>

              <h1 class="live-text-item font-display font-bold uppercase tracking-wide leading-none mb-[1.5vw]">
                <span 
                  class="block text-[4.5vw]"
                  :style="{ color: activeSlide.mainTitleColor }"
                >
                  {{ activeSlide.mainTitle }}
                </span>
              </h1>

              <h3 class="live-text-item font-sans font-bold text-white text-[2.5vw] mb-[1vw] leading-tight">
                {{ activeSlide.title }}
              </h3>

              <p class="live-text-item font-sans text-zinc-100 text-[1.1vw] leading-relaxed mb-[1.5vw] max-w-[30vw]">
                {{ activeSlide.intro }}
              </p>

              <div v-if="activeSlide.price" :style="{ color: activeSlide.priceColor ? activeSlide.priceColor : '#f0cb52' }" class="live-text-item font-display font-bold text-[2.5vw] mb-[2.5vw]">
                {{ activeSlide.price }}
              </div>

              <!-- Feature Tags -->
              <div class="live-text-item flex flex-wrap gap-[1vw] mt-auto">
                <div 
                  v-for="(tag, tIdx) in activeSlide.tags" 
                  :key="tIdx"
                  class="flex items-center gap-[0.6vw] bg-white/5 border border-white/20 px-[1vw] py-[0.5vw] rounded-[0.8vw] text-white/90 text-[0.9vw] font-medium tracking-wide backdrop-blur-sm shadow-md"
                >
                  <div class="w-[1.2vw] h-[1.2vw]" :style="{ color: activeSlide.priceColor ? activeSlide.priceColor : '#f0cb52' }" v-html="tag.icon"></div>
                  {{ tag.text }}
                </div>
              </div>
            </div>

            <!-- RIGHT SIDE (Visual Content) -->
            <div class="w-[55vw] h-full relative flex items-center justify-center">
              
              <!-- Format A -->
              <div v-if="activeSlide.format === 'A'" class="live-image-item w-full h-full flex items-center justify-center">
                <img 
                  :src="activeSlide.images[0]" 
                  :alt="activeSlide.title"
                  :class="[
                    'max-w-[45vw] drop-shadow-2xl',
                    activeSlide.isRoom ? 'w-[90%] max-h-[75%] object-cover rounded-[2vw] border-[0.2vw] border-white/10 shadow-[0_1vw_3vw_rgba(0,0,0,0.5)]' : 'max-h-[85%] object-contain'
                  ]"
                />
              </div>

              <!-- Format B -->
              <div v-if="activeSlide.format === 'B'" class="w-full h-full relative">
                <img :src="activeSlide.images[0]" :alt="activeSlide.title" class="live-image-item absolute top-[8%] left-[20%] w-[45%] aspect-video object-cover rounded-[1vw] border-[0.2vw] border-white/10 shadow-2xl z-10" />
                <img :src="activeSlide.images[1]" :alt="activeSlide.title" class="live-image-item absolute bottom-[8%] left-[20%] w-[45%] aspect-video object-cover rounded-[1vw] border-[0.2vw] border-white/10 shadow-2xl z-20" />
                <img :src="activeSlide.images[2]" :alt="activeSlide.title" class="live-image-item absolute top-1/2 -translate-y-1/2 right-[0%] w-[45%] aspect-video object-cover rounded-[1vw] border-[0.2vw] border-white/10 shadow-2xl z-30" />
              </div>
            </div>
          </template>

          <!-- ===================================== -->
          <!-- FORMAT LIST (5 ITEMS PER OUTLET)      -->
          <!-- ===================================== -->
          <div v-if="activeSlide.format === 'LIST'" class="w-full h-full flex flex-col pt-[1vw]">
            
            <div class="text-center mb-[1.5vw] flex flex-col items-center">
              <h2 class="live-text-item font-['Dancing_Script'] text-[3vw] font-bold mb-0 leading-tight" :style="{ color: activeSlide.darkHex }">
                {{ activeSlide.outlet }}
              </h2>
              <h1 class="live-text-item font-display font-bold uppercase tracking-wide leading-none text-[4vw]" :style="{ color: activeSlide.mainTitleColor }">
                {{ activeSlide.mainTitle }}
              </h1>
            </div>

            <!-- 3 Column Grid -->
            <div class="flex justify-around w-full px-[2vw] h-full">
              <div v-for="(list, lIdx) in activeSlide.lists" :key="lIdx" class="w-[30%] flex flex-col gap-[0.8vw]">
                <h2 class="live-text-item font-display font-bold text-[1.8vw] mb-[0.5vw] uppercase tracking-wider text-center" :style="{color: list.color}">
                  {{ list.outletName }}
                </h2>
                <div v-for="(item, iIdx) in list.items" :key="iIdx" class="live-list-item flex items-center justify-between border-b border-white/10 pb-[0.8vw] pt-[0.4vw]">
                  <span class="font-sans text-[1.2vw] text-zinc-900 font-medium tracking-wide">{{ item.name }}</span>
                  <span class="font-bold text-[1.2vw] text-[#d4af37]">{{ item.price }}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        <!-- 4. BOTTOM PANE (Progress Tracker) -->
        <div class="absolute bottom-0 left-0 w-full h-[6vw] bg-[#0f172a] border-t border-white/10 z-30 flex items-center justify-between px-[4vw] shadow-[0_-0.5vw_1.5vw_rgba(0,0,0,0.5)]">
          
          <div class="flex flex-col items-center text-[#d4af37] font-medium uppercase tracking-widest text-[0.8vw] mr-[4vw]">
            <span>Next Up</span>
            <svg class="w-[1.2vw] h-[1.2vw] mt-[0.2vw] animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </div>

          <div class="flex-1 flex justify-between items-center max-w-[60vw] mx-auto">
            <template v-for="(cat, idx) in capsCategoriesData" :key="cat.id">
              
              <div 
                class="flex flex-col items-center gap-[0.4vw] transition-all duration-700"
                :class="activeSlide && activeSlide.trackerId === cat.id ? 'opacity-100 scale-110' : 'opacity-40 scale-100'"
              >
                <div 
                  class="w-[2vw] h-[2vw] transition-colors duration-700"
                  :style="{ color: activeSlide && activeSlide.trackerId === cat.id ? activeSlide.lightHex : 'white' }"
                  v-html="cat.icon"
                ></div>
                <span class="text-[0.6vw] font-medium uppercase tracking-wider text-white text-center whitespace-nowrap">
                  {{ cat.name }}
                </span>
              </div>

              <div v-if="idx < capsCategoriesData.length - 1" class="text-[#d4af37] px-[1vw] opacity-70">
                <svg class="w-[1vw] h-[1vw]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
              </div>
            </template>
          </div>
        </div>

        <!-- 5. SCREENSAVER LOOP RESET -->
        <div v-if="isScreensaverActive" class="absolute inset-0 z-40 bg-[#040404] flex items-center justify-center screensaver-container">
          <div class="relative z-10 flex flex-col items-center">
            <img id="saver-logo" src="/images/caps-solid-logo.png" class="h-[8vw] mb-[2vw] opacity-0" alt="Hotel CAPS" />
            <div class="perspective-[1000px] flex flex-col items-center font-display text-white">
              <p class="text-[1.5vw] font-medium tracking-[0.4em] leading-loose flex ml-[0.4em]">
                <span v-for="(char, i) in 'HOTEL'.split('')" :key="'sh-'+i" class="saver-h-char inline-block opacity-0">{{ char }}</span>
              </p>
              <p class="text-[3.5vw] font-bold tracking-[0.3em] mt-[0.5vw] flex ml-[0.3em]">
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
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';

// Import only the static rules and fixed slides
import { specialsThemeDictionary, staticSpecialsSlides, capsCategoriesData } from '~/capsSpecialsData.js';

// Initialize a reactive reference to hold our final parsed specials data
const dynamicSpecials = ref([]);
const isLoading = ref(true); // Optional: use this to show a loading spinner

onMounted(async () => {
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

  // 1. Separate out the Grand "CAPS" from the regular outlet items
  const grandSpecialsRaw = dynamicData.filter(item => item.category === 'CAPS');
  const outletSpecialsRaw = dynamicData.filter(item => item.category !== 'CAPS');

  // Map Grand Specials
  const grandSpecials = grandSpecialsRaw.map(item => ({
    format: 'A', isRoom: false, outlet: item.category, title: item.name, 
    intro: item.description, price: item.price, images: [item.image],
    ...specialsThemeDictionary['CAPS']
  }));

  // 2. Auto-generate the LIST Slide using the dynamic outlet specials
  const outletsForList = [
    { key: 'Multi-Cuisine Restaurant', name: 'Restaurant', color: '#14532d' },
    { key: 'Chill N Chai', name: 'Chill N Chai', color: '#78350f' },
    { key: 'Arabic Corner', name: 'Arabic Corner', color: '#451a03' }
  ];

  const lists = outletsForList.map(out => {
    const items = outletSpecialsRaw
      .filter(item => item.category === out.key)
      .slice(0, 5) // Display max 5 items per outlet in the list view
      .map(item => ({ name: item.name, price: item.price }));
    return { outletName: out.name, color: out.color, items };
  });

  const listSlide = {
    trackerId: 'specials', format: 'LIST', isRoom: false, 
    mainTitle: "TODAY'S SPECIALS", mainTitleColor: '#f0cb52', 
    darkHex: '#2a2a2a', lightHex: '#eaeaea', outlet: 'Explore Our Specials', lists
  };

  // 3. Map Individual Outlet Specials
  const individualSpecials = outletSpecialsRaw.map(item => {
    const theme = specialsThemeDictionary[item.category] || specialsThemeDictionary['Multi-Cuisine Restaurant'];
    return {
      format: 'A', isRoom: false, outlet: item.category, title: item.name, 
      intro: item.description, price: item.price, images: [item.image], ...theme
    };
  });

  // Combine Everything into one perfect array for GSAP
  return [...grandSpecials, listSlide, ...individualSpecials, ...staticSpecialsSlides];
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
    bgTintRef.value.style.backgroundColor = activeSlide.value.lightHex;
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
  clearTimeout(loopTimeout);
});
</script>