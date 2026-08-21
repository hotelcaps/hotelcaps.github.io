<template>
  <header 
    class="fixed top-0 left-0 w-full lg:px-0 xl:px-4 z-50 transition-all duration-300 ease-in-out"
    :class="{ 
      'bg-transparent': !isScrolled, 
      'bg-zinc-900/90 backdrop-blur-lg shadow-lg': isScrolled 
    }"
  >
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        
        <!-- LOGO -->
        <NuxtLink to="/" class="flex items-end space-x-2 xl:space-x-3">
          <img src="/images/caps-solid-logo.png" alt="Hotel CAPS Logo" class="h-8 sm:h-10 w-auto" />
          <div class="text-white font-medium font-display text-3xl leading-6 sm:text-3xl xl:text-4xl tracking-wider xl:leading-9 lg:leading-8 sm:leading-7">
            <span>HOTEL </span>
            <span class="font-semibold">CAPS</span>
          </div>
        </NuxtLink>

        <!-- DESKTOP NAVIGATION -->
        <nav class="hidden lg:flex items-center space-x-8 mt-1 desktop-nav-container">
          <div 
            v-for="navItem in navLinks" 
            :key="navItem.text"
            class="relative"
            @mouseenter="openDropdownOnHover(navItem.text)"
            @mouseleave="closeDropdownOnMouseLeave"
          >
            <!-- Main navigation link (Dynamic Hover Color) -->
            <a 
              href="#"
              @click.prevent="toggleDropdown(navItem.subLinks.length > 0 ? navItem.text : null)"
              class="flex items-center xl:text-lg text-white font-display tracking-wider transition-all duration-300"
              :class="navItem.mainHoverClass"
            >
              {{ navItem.text }}
              <PhCaretDown 
                v-if="navItem.subLinks.length > 0" 
                :class="{ 'rotate-180': activeDropdown === navItem.text }" 
                :size="16" 
                class="ml-1 transition-transform duration-300" 
              />
            </a>

            <!-- Dropdown Menu -->
            <Transition name="dropdown">
              <div 
                v-if="navItem.subLinks.length > 0 && activeDropdown === navItem.text"
                class="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-44 rounded-t-none rounded-md shadow-2xl overflow-hidden"
              >
                <ul class="pb-2" :class="{ 
                  'bg-zinc-900/20 backdrop-blur-lg': !isScrolled, 
                  'bg-zinc-900/95 backdrop-blur-lg shadow-lg': isScrolled 
                }">
                  <li v-for="subLink in navItem.subLinks" :key="subLink.text">
                    <NuxtLink 
                      :to="subLink.link" 
                      @click="activeDropdown = null"
                      class="flex items-center justify-center h-11 px-4 text-sm font-medium text-gray-200 border-t border-white/10 transition-colors duration-200 first:border-t-0"
                      :class="subLink.hoverClass"
                    >
                      {{ subLink.text }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </Transition>
          </div>
        </nav>

        <!-- DESKTOP CONTACT BUTTON -->
        <div class="hidden lg:block">
          <NuxtLink to="/contact" class="contact-bubble-button tracking-widest xl:text-lg font-display py-2 px-4 sm:py-2.5 sm:px-6 mt-2 xl:ml-20 rounded-lg">
            Contact Us
          </NuxtLink>
        </div>

        <!-- MOBILE HAMBURGER BUTTON -->
        <!-- Placed inside ClientOnly and Teleport for correct z-index over the light menu -->
        <ClientOnly>
          <Teleport to="body">
            <div class="fixed top-0 right-0 h-20 z-[60] lg:hidden flex items-center pt-2 pr-4 sm:pr-6">
              <button @click="$emit('toggle')" class="hamburger-button" aria-label="Toggle menu">
                <!-- Lines turn dark if menu is open because the menu background is light -->
                <span class="line top" :class="{ 'toggled bg-zinc-300': isOpen, 'bg-white': !isOpen }"></span>
                <span class="line bottom" :class="{ 'toggled bg-zinc-300': isOpen, 'bg-white': !isOpen }"></span>
              </button>
            </div>
          </Teleport>
        </ClientOnly>

      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { PhCaretDown } from '@phosphor-icons/vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
});

defineEmits(['toggle']);

const isScrolled = ref(false);
const activeDropdown = ref(null);

// Navigation Data with exact specific route-based colors
const navLinks = ref([
  {
    text: 'Home', 
    mainHoverClass: 'hover:text-amber-500',
    subLinks: [
      { text: 'View Home', link: '/', hoverClass: 'hover:bg-[#D97706]/10 hover:text-[#D97706]' },
      { text: 'About Us', link: '/about', hoverClass: 'hover:bg-[#e98206]/15 hover:text-[#e98206]' },
      { text: 'Live', link: '/live', hoverClass: 'hover:bg-[#e982a6]/15 hover:text-[#e982a6]' },
    ]
  },
  {
    text: 'Rooms', 
    mainHoverClass: 'hover:text-[#2563eb]',
    subLinks: [
      { text: 'View Rooms', link: '/rooms', hoverClass: 'hover:bg-[#2563eb]/15 hover:text-[#2563eb]' },
      { text: 'Our Pricing', link: '/pricing', hoverClass: 'hover:bg-[#0284c7]/15 hover:text-[#0284c7]' },
    ]
  },
  {
    text: 'Restaurant', 
    mainHoverClass: 'hover:text-[#03a661]',
    subLinks: [
      { text: 'View Restaurant', link: '/restaurant', hoverClass: 'hover:bg-[#03a661]/15 hover:text-[#03a661]' },
      { text: 'Our Menu', link: '/menu', hoverClass: 'hover:bg-[#14b8a6]/15 hover:text-[#14b8a6]' },
    ]
  },
  {
    text: 'Events Hall', 
    mainHoverClass: 'hover:text-[#e22473]',
    subLinks: [
      { text: 'View Hall', link: '/hall', hoverClass: 'hover:bg-[#e22473]/15 hover:text-[#e22473]' },
      { text: 'Our Catering', link: '/catering', hoverClass: 'hover:bg-[#df4444]/15 hover:text-[#df4444]' },
    ]
  }
]);

const toggleDropdown = (itemName) => {
  activeDropdown.value = activeDropdown.value === itemName ? null : itemName;
};

const openDropdownOnHover = (itemName) => {
  if (itemName) activeDropdown.value = itemName;
};

const closeDropdownOnMouseLeave = () => {
  activeDropdown.value = null;
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > (window.innerHeight * 0.1);
  activeDropdown.value = null; 
};

const handleClickOutside = (event) => {
  const dropdownElement = document.querySelector('.desktop-nav-container');
  if (dropdownElement && !dropdownElement.contains(event.target)) {
    activeDropdown.value = null;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('click', handleClickOutside);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
/* Contact Button Style */
.contact-bubble-button {
  position: relative;
  display: inline-block;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  z-index: 1;
  border: 1px solid white;
  color: white;
}
.contact-bubble-button::before {
  content: '';
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  border-radius: 0.5rem;
  background-color: #D97706; /* Updated to contact orange */
  transform: scaleX(0);
  transform-origin: left;
  transition: all 0.4s cubic-bezier(0.7, 0, 0.2, 1);
  z-index: -1;
}
.contact-bubble-button:hover {
  border-color: #D97706;
}
.contact-bubble-button:hover::before {
  transform: scaleX(1);
}

/* Hamburger Button */
.hamburger-button {
  width: 32px; height: 24px;
  position: relative;
  background: none; border: none; cursor: pointer;
}
.hamburger-button .line {
  position: absolute; left: 0; width: 100%; height: 2px;
  transition: transform 0.3s ease-in-out, top 0.3s ease-in-out, bottom 0.3s ease-in-out, background-color 0.3s;
}
.hamburger-button .line.top { top: 4px; }
.hamburger-button .line.bottom { bottom: 4px; }
.hamburger-button .line.top.toggled { top: 11px; transform: rotate(45deg); }
.hamburger-button .line.bottom.toggled { bottom: 11px; transform: rotate(-45deg); }

/* Dropdown Transition */
.dropdown-enter-active, .dropdown-leave-active { transition: all 0.2s ease-in-out; }
.dropdown-enter-from, .dropdown-leave-to { opacity: 0; transform: translateY(-15px) translateX(-50%); }
</style>