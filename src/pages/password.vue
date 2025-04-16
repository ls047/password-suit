<template>
  <div class="min-h-screen theme-page-gradient p-4 sm:p-8 relative overflow-hidden animate-gradient">
    <Toast v-if="showToast" message="Password copied to clipboard" />
    <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-20"></div>
    <div class="max-w-lg mx-auto space-y-6 relative">
      <div class="backdrop-blur-xl bg-white/10 p-6 rounded-2xl shadow-2xl border border-white/20">
        <h2 class="text-2xl font-bold text-white mb-6">Password Generator</h2>
        
        <div class="space-y-4 mb-8">
          <div class="flex items-center justify-between">
            <label class="font-medium text-white">Password Length:</label>
            <div class="flex items-center space-x-4">
              <input
                type="range"
                v-model="passwordLength"
                min="8"
                max="32"
                class="w-32 sm:w-48 h-2 theme-gradient rounded-lg appearance-none cursor-pointer touch-manipulation [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white/20 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150 hover:[&::-webkit-slider-thumb]:scale-110"
              />
              <span class="w-12 text-center font-semibold text-white">{{ passwordLength }}</span>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label class="flex items-center space-x-2">
              <input type="checkbox" v-model="includeUppercase" class="form-checkbox" />
              <span class="text-white">Uppercase Letters</span>
            </label>
            <label class="flex items-center space-x-2">
              <input type="checkbox" v-model="includeLowercase" class="form-checkbox" />
              <span class="text-white">Lowercase Letters</span>
            </label>
            <label class="flex items-center space-x-2">
              <input type="checkbox" v-model="includeNumbers" class="form-checkbox" />
              <span class="text-white">Numbers</span>
            </label>
            <label class="flex items-center space-x-2">
              <input type="checkbox" v-model="includeSymbols" class="form-checkbox" />
              <span class="text-white">Special Characters</span>
            </label>
          </div>
        </div>

        <div class="relative">
          <input
            type="text"
            v-model="generatedPassword"
            readonly
            class="w-full p-3 border rounded-lg pr-24 font-mono text-lg bg-white/10 text-white"
          />
          <button
            @click="copyToClipboard"
            class="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:text-red-500 transition-colors"
          >
          <Icon icon="clarity:copy-line" width="36" height="36" />
          </button>
        </div>

        <div class="flex justify-center mt-4">
          <button
            @click="generatePassword"
            class="theme-gradient text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center space-x-2"
          >
            <i class="fas fa-sync-alt"></i>
            <span>Generate New Password</span>
          </button>
        </div>

        <div class="mt-6">
          <div class="flex items-center justify-between mb-2">
            <span class="font-medium text-white">Password Strength:</span>
            <span :class="strengthColor">{{ strengthText }}</span>
          </div>
          <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              class="h-full transition-all duration-300"
              :class="strengthBarColor"
              :style="{ width: `${strengthScore * 25}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Toast from '../components/Toast.vue';
import {Icon} from '@iconify/vue';

const passwordLength = ref(16);
const showToast = ref(false);
const includeUppercase = ref(true);
const includeLowercase = ref(true);
const includeNumbers = ref(true);
const includeSymbols = ref(true);
const generatedPassword = ref('');

const strengthScore = computed(() => {
  let score = 0;
  const password = generatedPassword.value;

  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  return Math.min(score, 4);
});

const strengthText = computed(() => {
  const scores = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
  return scores[strengthScore.value];
});

const strengthColor = computed(() => {
  const colors = [
    'text-red-500',
    'text-orange-500',
    'text-yellow-500',
    'text-green-500',
    'text-emerald-500'
  ];
  return colors[strengthScore.value];
});

const strengthBarColor = computed(() => {
  const colors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-green-500',
    'bg-emerald-500'
  ];
  return colors[strengthScore.value];
});

const generatePassword = () => {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  let chars = '';
  if (includeUppercase.value) chars += uppercase;
  if (includeLowercase.value) chars += lowercase;
  if (includeNumbers.value) chars += numbers;
  if (includeSymbols.value) chars += symbols;

  if (!chars) {
    includeLowercase.value = true;
    chars = lowercase;
  }

  let password = '';
  for (let i = 0; i < passwordLength.value; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  generatedPassword.value = password;
};

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(generatedPassword.value);
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy password:', err);
  }
};

generatePassword();
</script>