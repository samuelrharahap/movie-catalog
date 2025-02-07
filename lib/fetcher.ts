import api from '@/lib/axiosInstance';

/**
 * Generic fetcher function for React Query
 * @param endpoint - The API endpoint to fetch data from
 * @returns The response data
 */
export async function fetchFromAPI<T>(endpoint: string): Promise<T> {
  const { data } = await api.get<T>(endpoint);
  return data;
}
