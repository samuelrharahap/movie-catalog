import { Movie, Series } from '@/types/movies';

import TopBanner from '@/components/TopBanner';

const API_KEY = process.env.NEXT_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function getTopRatedMoviesAndSeries({ id, type }: DetailBannerProps) {
  try {
    const response = await fetch(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data: Movie | Series = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching movies and series:', error);
    return null;
  }
}

interface DetailBannerProps {
  id: number;
  type: 'movie' | 'tv';
}

export default async function DetailBanner({ id, type }: DetailBannerProps) {
  const data = await getTopRatedMoviesAndSeries({ id, type });

  if (!data) {
    return <p>No data found</p>;
  }

  return (
    <>
      <TopBanner item={data} index={0} inDetailPage />
    </>
  );
}
