<template>
  <section class="bg-white font-display py-16 px-4 text-gray-800">
    <p 
      class="text-center font-sans text-sm font-bold uppercase tracking-widest mb-2 text-orange-500"
    >
      Visit Us
    </p>
    <h2 class="text-3xl sm:text-4xl font-semibold text-center mb-10 tracking-wide">
      Our Location
    </h2>

    <div class="mx-auto max-w-7xl rounded-xl overflow-hidden shadow-xl">
      <div
        class="w-full h-96"
      >
        <iframe
          class="w-full h-full border-none"
          loading="lazy"
          allowfullscreen
          referrerpolicy="no-referrer-when-downgrade"
          :src="capsUrl"
        ></iframe>
      </div>
    </div>
  </section>
</template>

<script setup>
const latitude = 10.680975836621524; 
const longitude = 76.65063077499629;


const capsUrl = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d245.04326780414345!2d76.6506308!3d10.6809758!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba86dcc65d205df%3A0xab44c5e2ccdcf3e!2sCAPS%20Family%20Bakes%20and%20Restaurants!5e0!3m2!1sen!2sin!4v1753707646717!5m2!1sen!2sin";
</script>

<style scoped>
/* Optional: additional styling */
</style>
