import HomeBanner from '@/components/HomeBanner';
import MoviesOfTheWeek from '@/components/MoviesOfTheWeek';
import SeriesOfTheWeek from '@/components/SeriesOfTheWeek';
import TopRatedMovies from '@/components/TopRatedMovies';
import TopRatedSeries from '@/components/TopRatedSeries';

export default async function Home() {
  return (
    <div>
      <HomeBanner />
      <MoviesOfTheWeek />
      <SeriesOfTheWeek />
      <TopRatedMovies />
      <TopRatedSeries />
    </div>
  );
}
