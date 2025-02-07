import { fetchFromAPI } from '@/lib/fetcher';
import type { Movie, Series, TMDBResponse } from '@/types/movies';
import { useQuery } from '@tanstack/react-query';

export function useTopRatedMovies() {
  return useQuery({
    queryKey: ['top-rated-movies'],
    queryFn: () => fetchFromAPI<TMDBResponse<Movie>>('/movie/top_rated'),
  });
}

export function useTopRatedSeries() {
  return useQuery({
    queryKey: ['top-rated-series'],
    queryFn: () => fetchFromAPI<TMDBResponse<Series>>('/tv/top_rated'),
  });
}
