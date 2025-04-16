<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform translate-y-2 opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform translate-y-2 opacity-0"
  >
    <div
      v-if="isVisible"
      class="fixed top-4 right-4 bg-black/80 text-white px-6 py-3 rounded-lg shadow-lg backdrop-blur-sm flex items-center space-x-2 z-50"
    >
    <Icon icon="svg-spinners:blocks-shuffle-3" width="24" height="24" />
    <span>{{ message }}</span>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {Icon} from '@iconify/vue';

const props = defineProps<{
  message: string;
  duration?: number;
}>();

const isVisible = ref(false);

onMounted(() => {
  isVisible.value = true;
  setTimeout(() => {
    isVisible.value = false;
  }, props.duration || 2000);
});
</script>