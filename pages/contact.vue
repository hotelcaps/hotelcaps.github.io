<script setup>
import { ref } from 'vue';
import PageHero from '~/components/PageHero.vue';

// Define the data for our hero section
const heroImages = ref([
  '/images/contact/hero/contact.jpg'
]);

// 1. Core Meta Values
const pageTitle = 'Contact Us | Hotel CAPS, Koduvayur, Palakkad'
const pageDesc = 'Get in touch with us for suites & rooms booking, restaurant info & table reservations, event hall assistance, catering services & food delivery enquiries.'
const canonicalUrl = 'https://capsfamily.in/contact'
const ogImage = 'https://capsfamily.in/images/favicons/caps-contact-og-image.jpg'

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
        "@type": "ContactPage",
        "name": pageTitle,
        "description": pageDesc,
        "url": canonicalUrl,
        "mainEntity": {
          "@type": "Hotel",
          "name": "Hotel CAPS",
          "url": "https://capsfamily.in/",
          "logo": "https://capsfamily.in/images/caps-solid-logo.png",
          "image": ogImage,
          "email": "capsfamilybakes@gmail.com",
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
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "10.680926464534636",
            "longitude": "76.65040838503162"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+919207517064",
            "contactType": "customer service",
            "availableLanguage": ["English", "Malayalam", "Hindi"]
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
      eyebrow="Your Journey Starts Here."
      title="Contact Us"
      subtitle="Reach out to us for reservations, event bookings, and inquiries. We look forward to hearing from you."
      :images="heroImages"
      imageGradientClass="absolute inset-0 bg-gradient-to-r from-black/90 via-orange-950/80 to-black/70 z-5 z-5"
      eyebrowColorClass="text-[#fb923c]"
      themeColorClass="text-[#c2410c]"
    />

    <Gmaps />
    <GetInTouchContact />


  </div>
</template>
