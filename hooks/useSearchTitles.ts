import { useEffect, useState } from 'react';

import { fetchFromAPI } from '@/lib/fetcher';
import { Movie, Series, TMDBResponse } from '@/types/movies';
import { useQuery } from '@tanstack/react-query';

interface UseSearchTitlesProps {
  keyword: string;
  type?: 'movie' | 'tv' | 'multi'; // Defaults to 'multi' to search both movies & TV
}

export function useSearchTitles({ keyword, type = 'multi' }: UseSearchTitlesProps) {
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 500); // Delay execution by 500ms

    return () => clearTimeout(handler); // Cleanup on keyword change
  }, [keyword]);

  return useQuery({
    queryKey: ['search', type, debouncedKeyword],
    queryFn: () =>
      fetchFromAPI<TMDBResponse<Movie | Series>>(`/search/${type}?query=${debouncedKeyword}`),
    enabled: !!debouncedKeyword, // Only run query when keyword exists
  });
}
