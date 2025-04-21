<template>
  <!-- Backdrop overlay for mobile -->
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/50 z-20 lg:hidden transition-opacity duration-300"
    @click="toggleSidebar"
  ></div>

  <div
    class="fixed left-0 top-0 h-screen w-64 theme-gradient text-white shadow-lg transition-transform duration-300 z-30"
    :class="{ '-translate-x-full': !isOpen }"
  >
    <div class="p-4">
      <button
        @click="toggleSidebar"
        class="absolute -right-18 top-4 p-2 rounded-r-lg text-white theme-hover transition-colors duration-200"
      >
        <Icon :icon="isOpen ? 'mdi:close' : 'uit:align-right'" width="44" height="44" />
      </button>

      <div class="mb-8">
        <h2 class="text-xl font-bold">Password Tools</h2>
      </div>

      <nav class="space-y-2">
        <router-link
          to="/"
          class="flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 hover:bg-black"
          active-class="bg-black"
          @click="toggleSidebar"
        >
          <i class="fas fa-home text-xl"></i>
          <span>Home</span>
        </router-link>

        <router-link
          to="/password"
          class="flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 hover:bg-black"
          active-class="bg-black"
          @click="toggleSidebar"
        >
          <i class="fas fa-key text-xl"></i>
          <span>Password Generator</span>
        </router-link>

        <router-link
          to="/hash"
          class="flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 hover:bg-black"
          active-class="bg-black"
          @click="toggleSidebar"
        >
          <i class="fas fa-fingerprint text-xl"></i>
          <span>MD5 Hash</span>
        </router-link>

        <router-link
          to="/sha1"
          class="flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 hover:bg-black"
          active-class="bg-black"
          @click="toggleSidebar"
        >
          <i class="fas fa-shield-alt text-xl"></i>
          <span>SHA1 Hash</span>
        </router-link>

        <router-link
          to="/url-check"
          class="flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 hover:bg-black"
          active-class="bg-black"
          @click="toggleSidebar"
        >
          <i class="fas fa-link text-xl"></i>
          <span>URL Check</span>
        </router-link>

        <router-link
          to="/qr-code"
          class="flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 hover:bg-black"
          active-class="bg-black"
          @click="toggleSidebar"
        >
          <i class="fas fa-qrcode text-xl"></i>
          <span>QR Code</span>
        </router-link>
      </nav>

      <div class="absolute bottom-4 left-4 right-4">
        <div class="p-3 rounded-lg bg-black/30">
          <label class="block text-sm font-medium mb-2">Theme</label>
          <div class="grid grid-cols-2 gap-2">
            <button
              v-for="theme in themes"
              :key="theme.value"
              @click="handleThemeChange(theme.value)"
              class="px-3 py-2 rounded theme-hover transition-colors duration-200 text-sm"
              :class="{ 'theme-active': themeStore.currentTheme === theme.value }"
            >
              {{ theme.label }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Icon } from '@iconify/vue';
import { useThemeStore, type ThemeType } from '../stores/theme';

const themeStore = useThemeStore();
const themes: { label: string; value: ThemeType }[] = [
  { label: 'Gray', value: 'gray' },
  { label: 'Red', value: 'red' },
  { label: 'Green', value: 'green' },
  { label: 'Yellow', value: 'yellow' },
  { label: 'Nova', value: 'nova' }
];

const handleThemeChange = (theme: ThemeType) => {
  themeStore.setTheme(theme);
};

const emit = defineEmits<{
  toggle: [isOpen: boolean]
}>();

const isOpen = ref(true);

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};

watch(isOpen, (newValue) => {
  emit('toggle', newValue);
});
</script>