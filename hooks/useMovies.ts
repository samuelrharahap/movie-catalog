import { fetchFromAPI } from '@/lib/fetcher';
import { Movie, TMDBResponse } from '@/types/movies';
import { useQuery } from '@tanstack/react-query';

export function useMoviesOfTheWeek() {
  return useQuery({
    queryKey: ['top-rated-movies'],
    queryFn: () => fetchFromAPI<TMDBResponse<Movie>>('/trending/movie/week'),
  });
}
