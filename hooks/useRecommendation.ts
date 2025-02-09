import { fetchFromAPI } from '@/lib/fetcher';
import type { Movie, Series, TMDBResponse } from '@/types/movies';
import { useQuery } from '@tanstack/react-query';

export function useRecommendations(type: 'movie' | 'tv', id: number) {
  return useQuery({
    queryKey: ['recommendations', type, id],
    queryFn: () => fetchFromAPI<TMDBResponse<Movie | Series>>(`/${type}/${id}/recommendations`),
  });
}
