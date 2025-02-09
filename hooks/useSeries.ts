import { fetchFromAPI } from '@/lib/fetcher';
import type { Season, Series, TMDBResponse } from '@/types/movies';
import { useQuery } from '@tanstack/react-query';

export function useSeriesOfTheWeek() {
  return useQuery({
    queryKey: ['top-rated-series-week'],
    queryFn: () => fetchFromAPI<TMDBResponse<Series>>('/trending/tv/week'),
  });
}

export function useSeriesSeason(seriesId: number, seasonNumber: number) {
  return useQuery({
    queryKey: ['season', seriesId, seasonNumber],
    queryFn: () => fetchFromAPI<Season>(`/tv/${seriesId}/season/${seasonNumber}`),
  });
}
