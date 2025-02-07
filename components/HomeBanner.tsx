import { Movie, Series, TMDBResponse } from '@/types/movies';

import HomeBannerClient from '@/components/HomeBannerClient';

const API_KEY = process.env.NEXT_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function getTopRatedMoviesAndSeries() {
  try {
    const [moviesResponse, seriesResponse] = await Promise.all([
      fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`, { cache: 'no-store' }),
      fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`, { cache: 'no-store' }),
    ]);

    if (!moviesResponse.ok || !seriesResponse.ok) {
      throw new Error('Failed to fetch data');
    }

    const moviesData: TMDBResponse<Movie> = await moviesResponse.json();
    const seriesData: TMDBResponse<Series> = await seriesResponse.json();

    return {
      movies: moviesData.results.slice(0, 5),
      series: seriesData.results.slice(0, 5),
    };
  } catch (error) {
    console.error('Error fetching movies and series:', error);
    return { movies: [], series: [] };
  }
}

export default async function HomeBanner() {
  const { movies, series } = await getTopRatedMoviesAndSeries();
  const items = [...movies, ...series];

  return <HomeBannerClient items={items} />;
}
