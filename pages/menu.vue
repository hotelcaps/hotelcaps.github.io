<template>
  <main class="menu-page-wrapper min-h-screen bg-[#f9f7f3] dark:bg-[#1c1c1c]">

    <!-- Hero Injection -->
    <section 
      class="w-full relative flex items-center justify-center overflow-hidden bg-cover bg-no-repeat bg-center aspect-[6/5] md:aspect-[4/3] lg:aspect-[16/9] xl:aspect-auto xl:h-[55vh] xl:bg-[position:center_calc(100%+50px)]"
      :style="{ backgroundImage: `url(${heroImages})` }"
      aria-label="CAPS Digital Menu"
    >
    <div class="absolute inset-0 bg-gradient-to-r from-black/90 via-green-950/20 to-black/70 z-5"></div>
      <!-- Content (if any) goes here -->
    </section>

    <!-- THE MENU COMPONENT -->
    <CapsMenu :menuData="capsMenuData" :dynamicSpecials="dynamicSpecials" />

    <!-- Call To Order Button on Mobile -->
    <CallToOrderButton />

  </main>
</template>

<script setup>
import { capsMenuData } from '~/capsMenuData.js'; // Ensure your JSON file exports this correctly
import { ref, onMounted } from 'vue';

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

// Define the data for our hero section
const heroImages = '/images/menu/menu.jpg'

const pageTitle = 'Digital Menu | Hotel CAPS, Koduvayur, Palakkad'
const pageDesc = 'Browse the Hotel CAPS restaurant menu online, featuring multi-cuisine favorites, bestsellers, our delicacies, snacks, beverages & more.'
const canonicalUrl = 'https://capsfamily.in/menu'
const ogImage = 'https://capsfamily.in/images/favicons/caps-menu-og-image.jpg'

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

</script>