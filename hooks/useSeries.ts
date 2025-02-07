import { fetchFromAPI } from '@/lib/fetcher';
import type { Series, TMDBResponse } from '@/types/movies';
import { useQuery } from '@tanstack/react-query';

export function useSeriesOfTheWeek() {
  return useQuery({
    queryKey: ['top-rated-series'],
    queryFn: () => fetchFromAPI<TMDBResponse<Series>>('/trending/tv/week'),
  });
}
