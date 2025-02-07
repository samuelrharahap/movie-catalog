import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export default api;
