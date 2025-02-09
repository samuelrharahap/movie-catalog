import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

/**
 * Creates an Axios instance with predefined configuration.
 *
 * The Axios instance is configured with a base URL and default headers.
 * The headers include an Authorization token and Content-Type set to 'application/json'.
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export default api;
