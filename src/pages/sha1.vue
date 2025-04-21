<template>
  <div class="min-h-screen theme-page-gradient p-4 sm:p-8 relative overflow-hidden animate-gradient">
    <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-20"></div>
    <div class="max-w-lg mx-auto space-y-8 relative">
      <div class="backdrop-blur-xl bg-white/10 p-6 rounded-2xl shadow-2xl border border-white/20">
        <h2 class="text-2xl font-bold text-white mb-6">SHA1 Hash Generator</h2>

        <div class="space-y-4">
          <div class="relative">
            <input
              type="text"
              v-model="inputText"
              placeholder="Enter text to hash"
              class="w-full p-3 border rounded-lg font-mono text-white bg-white/5 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:border-blue-600 transition-colors"
              @input="generateHash"
            />
            <!-- Removed the eye toggle button -->
          </div>

          <div class="mt-8 space-y-4">
            <h3 class="text-lg font-semibold text-white">SHA1 Hash Result:</h3>
            <div class="relative bg-gray-50 p-4 rounded-lg">
              <pre class="font-mono text-sm break-all">{{ hash }}</pre>
              <button
                v-if="hash"
                @click="copyHash"
                class="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <i class="fas fa-copy"></i>
              </button>
            </div>
          </div>

          <div class="mt-8 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
            <h3 class="text-lg font-semibold text-white mb-2">About SHA1 Hashing</h3>
            <p class="text-white/90">
              SHA1 (Secure Hash Algorithm 1) is a cryptographic hash function that produces a 160-bit (20-byte) hash value. While it has been deprecated for cryptographic security purposes, it's still used for data integrity verification and version control systems like Git.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div class="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <h4 class="font-semibold mb-2 text-white">Hash Length</h4>
              <p class="text-white/90">{{ hash ? hash.length : 0 }} characters</p>
            </div>
            <div class="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <h4 class="font-semibold mb-2 text-white">Character Type</h4>
              <p class="text-white/90">Hexadecimal (0-9, a-f)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CryptoJS from 'crypto-js';

const inputText = ref(''); // Renamed from password
const hash = ref('');
// Removed showPassword ref

const generateHash = () => {
  if (inputText.value) { // Use inputText
    hash.value = CryptoJS.SHA1(inputText.value).toString(); // Use inputText
  } else {
    hash.value = '';
  }
};

const copyHash = async () => {
  try {
    await navigator.clipboard.writeText(hash.value);
  } catch (err) {
    console.error('Failed to copy hash:', err);
  }
};

onMounted(() => {
  generateHash();
});
</script>

<style>
/* ... existing styles ... */
</style>