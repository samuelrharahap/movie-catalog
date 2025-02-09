import { Movie, Series } from '@/types/movies';

import SeriesSeasons from '@/components/SeriesSeasons';
import TopBanner from '@/components/TopBanner';

interface DetailPageParams {
  id: string;
  type: 'movie' | 'tv';
}

const API_KEY = process.env.NEXT_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function getTopRatedMoviesAndSeries({ id, type }: DetailPageParams) {
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

export default async function DetailPage(props: { params: Promise<DetailPageParams> }) {
  const params = await props.params;
  const { id, type } = params;
  const data = await getTopRatedMoviesAndSeries({ id, type });

  if (!data) {
    return <p>No data found</p>;
  }

  return (
    <div>
      <TopBanner item={data} index={0} inDetailPage />
      {type === 'tv' && 'seasons' in data && data.seasons && (
        <SeriesSeasons seasons={data.seasons} seriesId={data.id} />
      )}
    </div>
  );
}
