import { Movie, Series, TMDBResponse } from '@/types/movies';

import HomeBannerClient from '@/components/HomeBannerClient';

const API_KEY = process.env.NEXT_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Fetches the top-rated movies and TV series from the TMDB API.
 *
 * @returns {Promise<{ movies: Movie[], series: Series[] }>} An object containing arrays of top-rated movies and TV series.
 * The movies array contains up to 3 top-rated movies, and the series array contains up to 2 top-rated TV series.
 * If an error occurs during the fetch, both arrays will be empty.
 *
 * @throws {Error} Throws an error if the fetch requests fail.
 */
async function getTopRatedMoviesAndSeries() {
  try {
    const [moviesResponse, seriesResponse] = await Promise.all([
      fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`, { next: { revalidate: 3600 } }), // Cache for 1 hour
      fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`, { next: { revalidate: 3600 } }),
    ]);

    if (!moviesResponse.ok || !seriesResponse.ok) {
      throw new Error('Failed to fetch data');
    }

    const moviesData: TMDBResponse<Movie> = await moviesResponse.json();
    const seriesData: TMDBResponse<Series> = await seriesResponse.json();

    return {
      movies: moviesData.results.slice(0, 3),
      series: seriesData.results.slice(0, 2),
    };
  } catch (error) {
    console.error('Error fetching movies and series:', error);
    return { movies: [], series: [] };
  }
}

/**
 * HomeBanner component fetches top-rated movies and series, combines them into a single list,
 * and renders the HomeBannerClient component with the combined list as a prop.
 *
 * @async
 * @function
 * @returns {JSX.Element} The HomeBannerClient component with the combined list of movies and series.
 */
export default async function HomeBanner() {
  const { movies, series } = await getTopRatedMoviesAndSeries();
  const items = [...movies, ...series];

  return <HomeBannerClient items={items} />;
}
