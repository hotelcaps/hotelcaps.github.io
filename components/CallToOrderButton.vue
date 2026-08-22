<template>
  <a
    v-show="showButton"
    :href="'tel:' + phoneNumber"
    :class="[
      'fixed left-2 lg:hidden z-30 transition-opacity duration-300 ease-in-out',
      isOverFooter ? 'bottom-[calc(var(--footer-height,120px)+1rem)]' : 'bottom-2'
    ]"
    class="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-green-500 active:scale-95"
    aria-label="Call to Order"
  >
    <PhPhone :size="24" weight="regular" />
  </a>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { PhPhone } from '@phosphor-icons/vue';

// Using a prop allows you to change the phone number dynamically per page if needed
const props = defineProps({
  phoneNumber: {
    type: String,
    default: '+919207517064' // Replace with the actual front-desk number
  }
});

const showButton = ref(false);
const isOverFooter = ref(false);

const handleScroll = () => {
  const scrollY = window.scrollY;
  const winH = window.innerHeight;

  // Appears after scrolling 40% of the viewport (Identical to your ScrollButton)
  showButton.value = scrollY > window.innerHeight * 0.4;

  // Footer evasion logic
  const footer = document.querySelector('footer');
  if (footer) {
    const rect = footer.getBoundingClientRect();
    isOverFooter.value = rect.top < winH;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* Ensures the button slides up smoothly when hitting the footer */
a {
  transition: bottom 0.3s ease;
}
</style>