import axios from 'axios';

const apiKey = '492d218f089fd8c20e9c3a945b482a9f';
const apiBase = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: apiBase,
  params: {
    api_key: apiKey,
    language: 'es-CO'
  }
});

export default api;
