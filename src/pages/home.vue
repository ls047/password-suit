<template>
  <div class="min-h-screen theme-page-gradient p-8 relative overflow-hidden animate-gradient">
    <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-20"></div>
    <div class="max-w-4xl mx-auto space-y-12 relative">
      <header class="text-center space-y-6">
        <h1 class="text-5xl font-bold text-white animate-fade-in">Password Management Suite</h1>
        <p class="text-xl text-white/90">Your all-in-one solution for password generation, validation, and hashing</p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="group backdrop-blur-xl bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/20 transform hover:scale-105 hover:bg-white/20 transition-all duration-300 cursor-pointer">
          <div class="text-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
            <i class="fas fa-key text-4xl text-yellow-300 group-hover:text-yellow-400 transition-colors duration-300"></i>
          </div>
          <h2 class="text-2xl font-semibold text-center mb-4 text-white">Password Generation</h2>
          <p class="text-white/80">Generate strong, secure passwords with customizable options for length and complexity.</p>
        </div>

        <div class="group backdrop-blur-xl bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/20 transform hover:scale-105 hover:bg-white/20 transition-all duration-300 cursor-pointer">
          <div class="text-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
            <i class="fas fa-shield-alt text-4xl text-emerald-300 group-hover:text-emerald-400 transition-colors duration-300"></i>
          </div>
          <h2 class="text-2xl font-semibold text-center mb-4 text-white">Password Validation</h2>
          <p class="text-white/80">Check the strength of your passwords against industry-standard security criteria.</p>
        </div>

        <div class="group backdrop-blur-xl bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/20 transform hover:scale-105 hover:bg-white/20 transition-all duration-300 cursor-pointer">
          <div class="text-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
            <i class="fas fa-fingerprint text-4xl text-purple-300 group-hover:text-purple-400 transition-colors duration-300"></i>
          </div>
          <h2 class="text-2xl font-semibold text-center mb-4 text-white">MD5 Hashing</h2>
          <p class="text-white/80">Convert your passwords into MD5 hash format for secure storage and verification.</p>
        </div>
      </div>

      <div class="backdrop-blur-xl bg-white/10 p-10 rounded-2xl shadow-2xl border border-white/20">
        <h2 class="text-3xl font-bold text-center mb-8 text-white">Why Choose Our Tools?</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="group flex items-start space-x-6 p-4 rounded-xl hover:bg-white/10 transition-colors duration-300">
            <i class="fas fa-bolt text-yellow-300 text-3xl mt-1 group-hover:scale-110 transition-transform duration-300"></i>
            <div>
              <h3 class="text-xl font-semibold mb-3 text-white">Fast & Efficient</h3>
              <p class="text-white/80">Instant password generation and hashing with real-time validation.</p>
            </div>
          </div>
          <div class="group flex items-start space-x-6 p-4 rounded-xl hover:bg-white/10 transition-colors duration-300">
            <i class="fas fa-lock text-red-300 text-3xl mt-1 group-hover:scale-110 transition-transform duration-300"></i>
            <div>
              <h3 class="text-xl font-semibold mb-3 text-white">Secure</h3>
              <p class="text-white/80">All processing happens locally in your browser for maximum security.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}
</style>