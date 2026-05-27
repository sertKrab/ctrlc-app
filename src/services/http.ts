import axios from 'axios';
import { API_BASE_URL, API_TIMEOUT, TOKEN_KEY } from '@/constants/api';
import { getItem, removeItem } from '@/utils/storage';

const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use((config) => {
  const token = getItem<string>(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 401
    ) {
      removeItem(TOKEN_KEY);
    }
    return Promise.reject(error);
  },
);

export default http;
