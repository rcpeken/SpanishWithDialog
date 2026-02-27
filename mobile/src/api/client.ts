import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';

// Hardcoded base URL - env var is checked but we always have a reliable fallback
const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://languagewithai.site/api';

// API Configuration
const API_CONFIG = {
  baseURL: "https://languagewithai.site/api",
  timeout: 60000, // 60 seconds for AI generation
  headers: {
    'Content-Type': 'application/json',
  },
};

console.log('[API Client] Base URL:', BASE_URL);

// Create Axios instance
const apiClient: AxiosInstance = axios.create(API_CONFIG);

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log('[API Request]', config.method?.toUpperCase(), config.baseURL! + config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log('[API Response]', response.status, response.config.url);
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      console.error('[API Error] Server responded with:', status, error.config?.url);
      
      if (status === 401) {
        console.log('Unauthorized - redirecting to login');
      } else if (status === 500) {
        console.error('Server error');
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('[API Error] No response received:', error.message, '| URL:', error.config?.baseURL! + error.config?.url);
    } else {
      // Error setting up request
      console.error('[API Error] Request setup failed:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Generic API request function using Axios
export async function apiRequest<T>(config: AxiosRequestConfig): Promise<T> {
  const response = await apiClient(config);
  return response.data;
}

// Fallback fetch-based request for when Axios fails on React Native
export async function fetchRequest<T>(config: {
  method: string;
  url: string;
  data?: any;
  headers?: Record<string, string>;
  params?: URLSearchParams;
}): Promise<T> {
  let fullUrl = `${BASE_URL}${config.url}`;
  if (config.params) {
    fullUrl += `?${config.params.toString()}`;
  }

  console.log('[Fetch Request]', config.method, fullUrl);

  const response = await fetch(fullUrl, {
    method: config.method,
    headers: {
      'Content-Type': 'application/json',
      ...(config.headers || {}),
    },
    body: config.data ? JSON.stringify(config.data) : undefined,
  });

  console.log('[Fetch Response]', response.status, fullUrl);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const text = await response.text();
  return text ? JSON.parse(text) : (undefined as T);
}

export { BASE_URL };
export default apiClient;
