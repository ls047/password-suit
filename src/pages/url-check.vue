<template>
  <div class="min-h-screen theme-gradient p-8 relative overflow-hidden animate-gradient">
    <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-20"></div>
    <div class="max-w-3xl mx-auto space-y-8 relative">
      <div class="backdrop-blur-xl bg-white/10 p-6 rounded-2xl shadow-2xl border border-white/20">
        <h2 class="text-2xl font-bold text-white mb-6">URL Validator</h2>
        
        <div class="space-y-4">
          <div class="relative">
            <input
              type="text"
              v-model="url"
              placeholder="Enter URL to validate (e.g., https://example.com)"
              class="w-full p-3 border rounded-lg font-mono text-white bg-white/5 focus:ring-2 focus:ring-red-700 focus:border-red-700 hover:border-red-600 transition-colors"
              @input="validateUrl"
            />
          </div>

          <div v-if="url" class="mt-8 space-y-4">
            <div class="bg-white/10 backdrop-blur-sm p-4 rounded-lg relative">
              <div v-if="isAnalyzing" class="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-lg">
                <div class="text-white">Analyzing URL...</div>
              </div>
              <h3 class="text-lg font-semibold text-white mb-4">Validation Results:</h3>
              
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-white/90">Valid URL Format:</span>
                  <span :class="isValidFormat ? 'text-green-400' : 'text-red-400'">
                    {{ isValidFormat ? '✓' : '✗' }}
                  </span>
                </div>

                <div class="flex items-center justify-between">
                  <span class="text-white/90">Has Protocol (http/https):</span>
                  <span :class="hasProtocol ? 'text-green-400' : 'text-red-400'">
                    {{ hasProtocol ? '✓' : '✗' }}
                  </span>
                </div>

                <div class="flex items-center justify-between">
                  <span class="text-white/90">Has Valid Domain:</span>
                  <span :class="hasValidDomain ? 'text-green-400' : 'text-red-400'">
                    {{ hasValidDomain ? '✓' : '✗' }}
                  </span>
                </div>
              </div>
            </div>

            <div v-if="isValidFormat" class="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <h3 class="text-lg font-semibold text-white mb-2">URL Components</h3>
              <div class="space-y-2">
                <p class="text-white/90"><span class="font-semibold">Protocol:</span> {{ urlComponents.protocol || 'None' }}</p>
                <p class="text-white/90"><span class="font-semibold">Domain:</span> {{ urlComponents.domain || 'None' }}</p>
                <p class="text-white/90" v-if="urlComponents.subdomains.length > 0">
                  <span class="font-semibold">Subdomains:</span> {{ urlComponents.subdomains.join('.') }}
                </p>
                <p class="text-white/90"><span class="font-semibold">Port:</span> {{ urlComponents.port }}</p>
                <p class="text-white/90"><span class="font-semibold">Path:</span> {{ urlComponents.path || '/' }}</p>
                <p class="text-white/90"><span class="font-semibold">Fragment:</span> {{ urlComponents.fragment || 'None' }}</p>
                <div class="text-white/90">
                  <p class="font-semibold mb-1">Query Parameters:</p>
                  <div v-if="Object.keys(urlComponents.queryParams).length > 0" class="pl-4 space-y-1">
                    <p v-for="(value, key) in urlComponents.queryParams" :key="key">
                      {{ key }}: {{ value }}
                    </p>
                  </div>
                  <p v-else class="pl-4">None</p>
                </div>
                <p class="text-white/90">
                  <span class="font-semibold">Security Status:</span>
                  <span :class="urlComponents.isSecure ? 'text-green-400' : 'text-yellow-400'">
                    {{ urlComponents.isSecure ? 'Secure (HTTPS)' : 'Not Secure (HTTP)' }}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div class="mt-8 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
            <h3 class="text-lg font-semibold text-white mb-2">About URL Validation</h3>
            <p class="text-white/90">
              URL validation ensures that a web address follows the correct format and contains all necessary components. A valid URL typically includes a protocol (http/https), a domain name, and optionally a path and query parameters.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import axios from 'axios';

interface UrlComponents {
  protocol: string;
  domain: string;
  path: string;
  query: string;
  port: string;
  fragment: string;
  subdomains: string[];
  isSecure: boolean;
  queryParams: Record<string, string>;
}

const url = ref('');
const isValidFormat = ref(false);
const hasProtocol = ref(false);
const hasValidDomain = ref(false);

const urlComponents = reactive<UrlComponents>({
  protocol: '',
  domain: '',
  path: '',
  query: '',
  port: '',
  fragment: '',
  subdomains: [],
  isSecure: false,
  queryParams: {}
});

interface UrlAnalysis {
  isAlive: boolean;
  contentType: string;
  serverInfo: string;
  responseTime: number;
  redirectCount: number;
  finalUrl: string;
  sslInfo: {
    valid: boolean;
    issuer: string;
    expiryDate: string;
  };
}

const urlAnalysis = reactive<UrlAnalysis>({
  isAlive: false,
  contentType: '',
  serverInfo: '',
  responseTime: 0,
  redirectCount: 0,
  finalUrl: '',
  sslInfo: {
    valid: false,
    issuer: '',
    expiryDate: ''
  }
});

const isAnalyzing = ref(false);

const validateUrl = async () => {
  // Reset validations
  isValidFormat.value = false;
  hasProtocol.value = false;
  hasValidDomain.value = false;
  isAnalyzing.value = true;
  
  // Reset components
  Object.keys(urlComponents).forEach(key => {
    switch (key) {
      case 'subdomains':
        urlComponents.subdomains = [];
        break;
      case 'queryParams':
        urlComponents.queryParams = {};
        break;
      case 'isSecure':
        urlComponents.isSecure = false;
        break;
      default:
    } 
  });
  urlComponents.isSecure = false;

  // Reset URL analysis
  Object.assign(urlAnalysis, {
    isAlive: false,
    contentType: '',
    serverInfo: '',
    responseTime: 0,
    redirectCount: 0,
    finalUrl: '',
    sslInfo: {
      valid: false,
      issuer: '',
      expiryDate: ''
    }
  });

  if (!url.value) {
    isAnalyzing.value = false;
    return;
  }

  try {
    // Basic URL format validation
    const urlRegex = /^(https?:\/\/)?([\w\d.-]+\.[a-z]{2,})(:\d+)?([/\w\d.-]*)*([?&]\w+=\w+)*$/i;
    isValidFormat.value = urlRegex.test(url.value);
    if (!isValidFormat.value) {
      isAnalyzing.value = false;
      return;
    }

    let urlToAnalyze = url.value;
    if (!urlToAnalyze.startsWith('http')) {
      urlToAnalyze = 'https://' + urlToAnalyze;
    }

    const urlObject = new URL(urlToAnalyze);
    
    // Update validation states
    hasProtocol.value = urlObject.protocol === 'http:' || urlObject.protocol === 'https:';
    
    // Validate domain with more comprehensive checks
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
    hasValidDomain.value = domainRegex.test(urlObject.hostname);

    // Update URL components with enhanced analysis
    urlComponents.protocol = urlObject.protocol;
    urlComponents.domain = urlObject.hostname;
    urlComponents.path = urlObject.pathname;
    urlComponents.port = urlObject.port || (urlObject.protocol === 'https:' ? '443' : '80');
    urlComponents.fragment = urlObject.hash;
    urlComponents.isSecure = urlObject.protocol === 'https:';

    // Parse subdomains
    const domainParts = urlObject.hostname.split('.');
    if (domainParts.length > 2) {
      urlComponents.subdomains = domainParts.slice(0, -2);
    }

    // Parse query parameters
    const searchParams = new URLSearchParams(urlObject.search);
    const queryParams: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      queryParams[key] = value;
    });
    urlComponents.queryParams = queryParams;
    urlComponents.query = urlObject.search || '';

    // Perform dynamic analysis
    try {
      const startTime = performance.now();
      const response = await axios.get(urlToAnalyze, {
        maxRedirects: 5,
        validateStatus: null,
        timeout: 5000
      });
      const endTime = performance.now();

      urlAnalysis.isAlive = response.status >= 200 && response.status < 400;
      urlAnalysis.contentType = response.headers['content-type'] || '';
      urlAnalysis.serverInfo = response.headers['server'] || '';
      urlAnalysis.responseTime = Math.round(endTime - startTime);
      urlAnalysis.redirectCount = response.request?.res?.responseUrl ? 
        (response.request.res.responseUrl !== urlToAnalyze ? 1 : 0) : 0;
      urlAnalysis.finalUrl = response.request?.res?.responseUrl || urlToAnalyze;

      // SSL information
      if (urlObject.protocol === 'https:') {
        urlAnalysis.sslInfo.valid = true;
        // Note: Detailed SSL info would require server-side implementation
        urlAnalysis.sslInfo.issuer = 'SSL Verified';
        urlAnalysis.sslInfo.expiryDate = 'Valid';
      }
    } catch (error) {
      console.error('Dynamic analysis error:', error);
      urlAnalysis.isAlive = false;
    }

  } catch (err) {
    // Reset validation states on error
    isValidFormat.value = false;
    hasProtocol.value = false;
    hasValidDomain.value = false;
    console.error('URL validation error:', err);
  } finally {
    isAnalyzing.value = false;
  }
};

// Debounce the validation
let timeout: ReturnType<typeof setTimeout>;
watch(url, (newValue) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    if (newValue) validateUrl();
  }, 500);
});
</script>