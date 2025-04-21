<template>
  <div class="flex min-h-screen theme-gradient w-full h-full">
    <Sidebar @toggle="handleSidebarToggle" />
    <main class="flex-1 transition-all duration-300 h-full" :class="{ 'ml-64': isSidebarOpen, 'ml-0': !isSidebarOpen }">
      <router-view class="pt-20"></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Sidebar from './components/Sidebar.vue';
import './assets/theme.css';

const isSidebarOpen = ref(true);

const handleSidebarToggle = (isOpen: boolean) => {
  isSidebarOpen.value = isOpen;
};

</script>
