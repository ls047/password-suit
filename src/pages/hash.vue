<template>
  <div class="min-h-screen theme-page-gradient p-8 relative overflow-hidden animate-gradient">
    <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-20"></div>
    <div class="max-w-3xl mx-auto space-y-8 relative">
      <div class="backdrop-blur-xl bg-white/10 p-6 rounded-2xl shadow-2xl border border-white/20">
        <h2 class="text-2xl font-bold text-white mb-6">MD5 Hash Generator</h2>
        
        <div class="space-y-4">
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              placeholder="Enter your password"
              class="w-full p-3 border rounded-lg pr-24 font-mono text-white bg-white/5 focus:ring-2 focus:ring-red-700 focus:border-red-700 hover:border-red-600 transition-colors"
              @input="generateHash"
            />
            <button
              @click="showPassword = !showPassword"
              class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>

          <div class="mt-8 space-y-4">
            <h3 class="text-lg font-semibold text-white">MD5 Hash Result:</h3>
            <div class="relative bg-gray-50 p-4 rounded-lg">
              <pre class="font-mono text-sm break-all">{{ hash }}</pre>
              <button
                v-if="hash"
                @click="copyHash"
                class="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-600 hover:text-red-800 transition-colors"
              >
                <i class="fas fa-copy"></i>
              </button>
            </div>
          </div>

          <div class="mt-8 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
            <h3 class="text-lg font-semibold text-white mb-2">About MD5 Hashing</h3>
            <p class="text-white/90">
              MD5 (Message-Digest Algorithm 5) is a widely used cryptographic hash function that produces a 128-bit (16-byte) hash value. While MD5 is no longer considered cryptographically secure, it's still commonly used for file integrity checking and non-security related hash purposes.
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

const password = ref('');
const hash = ref('');
const showPassword = ref(false);

const generateHash = () => {
  if (password.value) {
    hash.value = CryptoJS.MD5(password.value).toString();
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