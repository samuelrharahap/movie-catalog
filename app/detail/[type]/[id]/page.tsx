import { Movie, Series } from '@/types/movies';

import Recommendations from '@/components/Recommendations';
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
      next: { revalidate: 3600 },
    }); // Cache for 1 hour

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

  const isHasSeasons = !!(type === 'tv' && 'seasons' in data && data.seasons);

  return (
    <div>
      <TopBanner item={data} index={0} inDetailPage />
      <div className="detail__container">
        <div className="detail__link-container">
          {isHasSeasons && (
            <a href="#series-seasons" className="detail__link">
              Episodes
            </a>
          )}
          <a href="#recommendations" className="detail__link ">
            More Like This
          </a>
        </div>
        {isHasSeasons && data.seasons && (
          <SeriesSeasons seasons={data.seasons} seriesId={data.id} />
        )}
        <Recommendations type={type} id={data.id} />
      </div>
    </div>
  );
}
