import { fetchFromAPI } from '@/lib/fetcher';
import { Movie, TMDBResponse } from '@/types/movies';
import { useQuery } from '@tanstack/react-query';

export function useMoviesOfTheWeek() {
  return useQuery({
    queryKey: ['top-rated-movies-week'],
    queryFn: () => fetchFromAPI<TMDBResponse<Movie>>('/trending/movie/week'),
  });
}

export function useMovieDetail(id: number) {
  return useQuery({
    queryKey: ['movie-detail', id],
    queryFn: () => fetchFromAPI<TMDBResponse<Movie>>(`/movie/${id}`),
  });
}
