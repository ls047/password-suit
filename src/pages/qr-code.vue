<template>
  <div class="min-h-screen theme-page-gradient p-8 relative overflow-hidden animate-gradient">
    <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-20"></div>
    <div class="max-w-4xl mx-auto backdrop-blur-xl bg-white/10 p-6 rounded-2xl shadow-2xl border border-white/20">
      <h1 class="text-3xl font-bold text-white mb-8">QR Code Generator & Scanner</h1>
      
      <!-- QR Code Generator Section -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold text-white mb-4">Generate QR Code</h2>
        <div class="flex flex-col md:flex-row gap-6">
          <div class="flex-1">
            <textarea
              v-model="message"
              placeholder="Enter your message here..."
              class="w-full h-32 p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-red-500 focus:ring-1 focus:ring-red-500"
            ></textarea>
            <div class="flex gap-4">
              <button
                @click="generateQR"
                class="mt-4 px-6 py-2 theme-gradient hover:opacity-90 text-white rounded-lg transition-all duration-200"
              >
                Generate QR Code
              </button>
              <button
                v-if="qrGenerated"
                @click="downloadQR"
                class="mt-4 px-6 py-2 theme-gradient hover:opacity-90 text-white rounded-lg transition-all duration-200"
              >
                Download QR Code
              </button>
            </div>
          </div>
          <div class="flex-1 flex items-center justify-center bg-white rounded-lg p-4">
            <canvas ref="qrCanvas" class="w-62 h-62"></canvas>
          </div>
        </div>
      </div>

      <!-- QR Code Scanner Section -->
      <div>
        <h2 class="text-2xl font-semibold text-white mb-4">Scan QR Code</h2>
        <div class="flex flex-col md:flex-row gap-6">
          <div class="flex-1">
            <input
              type="file"
              accept="image/*"
              @change="handleFileUpload"
              class="block w-full text-white border-1 rounded-xl hover:bg-black hover:translate-y-2 duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:theme-gradient file:text-white hover:file:opacity-90 file:cursor-pointer"
            />
          </div>
          <div class="flex-1">
            <div v-if="decodedText" class="p-4 bg-gray-800 rounded-lg">
              <h3 class="text-lg font-medium text-white mb-2">Decoded Message:</h3>
              <p class="text-gray-300 break-all">{{ decodedText }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import QRCode from 'qrcode';
import jsQR from 'jsqr';

const message = ref('');
const qrCanvas = ref<HTMLCanvasElement | null>(null);
const decodedText = ref('');
const qrGenerated = ref(false);

const generateQR = async () => {
  if (!message.value || !qrCanvas.value) return;
  
  try {
    await QRCode.toCanvas(qrCanvas.value, message.value, {
      width: 192,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
    qrGenerated.value = true;
  } catch (error) {
    console.error('Error generating QR code:', error);
    qrGenerated.value = false;
  }
};

const downloadQR = () => {
  if (!qrCanvas.value) return;
  
  const link = document.createElement('a');
  link.download = 'qrcode.png';
  link.href = qrCanvas.value.toDataURL('image/png');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const handleFileUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length) return;

  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) return;

      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        decodedText.value = code.data;
      } else {
        decodedText.value = 'No QR code found in image';
      }
    };
    img.src = e.target?.result as string;
  };

  reader.readAsDataURL(file);
};
</script>