import { ref, watch } from 'vue';
import { defineStore } from 'pinia';

export type ThemeType = 'red' | 'green' | 'yellow' | 'gray' | 'nova';

export const useThemeStore = defineStore('theme', () => {
  const currentTheme = ref<ThemeType>('gray');

  const setTheme = (theme: ThemeType) => {
    currentTheme.value = theme;
  };

  watch(currentTheme, (newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme);
  }, { immediate: true });

  return {
    currentTheme,
    setTheme
  };
});