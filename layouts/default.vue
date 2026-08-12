<template>
  <div>
    <!-- Desktop Header & Mobile Hamburger -->
    <AppHeader :is-open="isMenuOpen" @toggle="toggleMenu" />

    <!-- Mobile Overlay Menu -->
    <AppMenu :is-open="isMenuOpen" @close="closeMenu" />

    <!-- MAIN PAGE CONTENT -->
    <main>
      <slot />
    </main>

    <ScrollButtonSticky />
    
    <Footer />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import AppHeader from '~/components/AppHeader.vue';
import AppMenu from '~/components/AppMenu.vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

// Handle body scroll locking when mobile menu is open
watch(isMenuOpen, (isOpen) => {
  if (typeof document === 'undefined') return;
  
  const viewportMeta = document.querySelector('meta[name="viewport"]');
  if (isOpen) {
    document.body.style.overflow = 'hidden';
    if (viewportMeta) {
      viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
    }
  } else {
    document.body.style.overflow = '';
    if (viewportMeta) {
      viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1');
    }
  }
});
</script>