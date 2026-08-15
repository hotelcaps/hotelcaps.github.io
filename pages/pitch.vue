<template>
  <main>
    <PitchSlider :slides="pitchData" />
  </main>
</template>

<script setup>
// Disable the standard layout so the pitch deck owns the entire DOM
definePageMeta({
  layout: false
});

// Generate the JSON array for the 11 pitch slides
const pitchData = Array.from({ length: 11 }, (_, i) => ({
  id: i + 1,
  // Automatically points to /images/pitch/1.png through 11.png
  image: `/images/pitch/${i + 1}.png`,
  alt: `Hotel CAPS Pitch Deck - Slide ${i + 1}`
}));
</script>