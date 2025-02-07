import HomeBanner from '@/components/HomeBanner';
import MoviesOfTheWeek from '@/components/MoviesOfTheWeek';
import SeriesOfTheWeek from '@/components/SeriesOfTheWeek';

export default async function Home() {
  return (
    <div>
      <HomeBanner />
      <MoviesOfTheWeek />
      <SeriesOfTheWeek />
    </div>
  );
}
