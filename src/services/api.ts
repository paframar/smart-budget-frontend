import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL_LOCAL;
console.log('Base URL:', baseURL);

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

export default api;
