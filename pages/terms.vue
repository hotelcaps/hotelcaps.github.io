<script setup>
import { ref } from 'vue';
import PageHero from '~/components/PageHero.vue';
import TermsAndConditions from '~/components/TermsAndConditions.vue';

// Define the data for our hero section
const heroImages = ref([
  '/images/others/terms.jpg'
]);

// 1. Core Meta Values
const pageTitle = 'Terms & Conditions | Hotel CAPS, Koduvayur, Palakkad'
const pageDesc = 'Read the terms and conditions for room bookings, guest stays, restaurant dining, and service policies at Hotel CAPS in Koduvayur, Palakkad.'
const canonicalUrl = 'https://capsfamily.in/terms'
const ogImage = 'https://capsfamily.in/images/favicons/caps-terms-og-image.jpg'

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
        "@type": "WebPage",
        "name": pageTitle,
        "description": pageDesc,
        "url": canonicalUrl,
        "publisher": {
          "@type": "Hotel",
          "name": "Hotel CAPS",
          "url": "https://capsfamily.in/",
          "logo": "https://capsfamily.in/images/caps-solid-logo.png",
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

<template>
  <div>
    <PageHero 
      eyebrow="The Legal Stuff, Simplified."
      title="Terms & Conditions"
      subtitle="Everything you need to know about how we can work together."
      :images="heroImages"
      imageGradientClass="absolute inset-0 bg-gradient-to-r from-black/90 via-[#191413]/50 to-black/70 z-5"
      eyebrowColorClass="text-[#aba09c]"
      themeColorClass="text-[#2b2422]"
    />

    <TermsAndConditions />

  </div>
</template>
