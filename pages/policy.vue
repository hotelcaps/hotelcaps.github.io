<script setup>
import { ref } from 'vue';
import PageHero from '~/components/PageHero.vue';

// Define the data for our hero section
const heroImages = ref([
  '/images/others/privacy.jpg'
]);
// 1. Core Meta Values
const pageTitle = 'Privacy Policy | Hotel CAPS - Koduvayur, Palakkad'
const pageDesc = 'Learn how Hotel CAPS in Koduvayur, Palakkad collects, uses, and protects your personal data. Read our commitment to your privacy and data security.'
const canonicalUrl = 'https://capsfamily.in/policy'
const ogImage = 'https://capsfamily.in/images/favicons/caps-policy-og-image.jpg'

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
      eyebrow="Your Data, Kept Guarded."
      title="Privacy Policy"
      subtitle="How we collect, handle, and protect your personal information."
      :images="heroImages"
      imageGradientClass="absolute inset-0 bg-gradient-to-r from-black/90 via-[#191a13]/50 to-black/70 z-5"
      eyebrowColorClass="text-[#abae9a]"
      themeColorClass="text-[#2b2b22]"
    />

    <PrivacyPolicy />

  </div>
</template>
