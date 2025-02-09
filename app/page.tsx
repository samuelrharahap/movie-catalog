import HomeBanner from '@/components/HomeBanner';
import MoviesOfTheWeek from '@/components/MoviesOfTheWeek';
import SeriesOfTheWeek from '@/components/SeriesOfTheWeek';
import TopRatedMovies from '@/components/TopRatedMovies';
import TopRatedSeries from '@/components/TopRatedSeries';

export default async function Home() {
  return (
    <div>
      {/* HomeBanner is server-rendered to ensure the main visual loads quickly */}
      <HomeBanner />

      {/* The following components are client-rendered to optimize performance.
          Since they appear below the fold, deferring their rendering reduces 
          the server load and improves the initial page load speed. */}
      <MoviesOfTheWeek />
      <SeriesOfTheWeek />
      <TopRatedMovies />
      <TopRatedSeries />
    </div>
  );
}
