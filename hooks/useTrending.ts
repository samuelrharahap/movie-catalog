import { fetchFromAPI } from '@/lib/fetcher';
import { Movie, Series, TMDBResponse } from '@/types/movies';
import { useQuery } from '@tanstack/react-query';

export function useTrendingAll() {
  return useQuery({
    queryKey: ['trending-all-day'],
    queryFn: () => fetchFromAPI<TMDBResponse<Movie | Series>>('/trending/all/day'),
  });
}
