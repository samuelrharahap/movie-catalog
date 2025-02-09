'use client';

import { useSeriesOfTheWeek } from '@/hooks/useSeries';

import ListTitleSlider from '@/components/ListTitleSlider';

/**
 * SeriesOfTheWeek component fetches and displays the series of the week.
 * It uses the `useSeriesOfTheWeek` hook to retrieve the data.
 *
 * @returns {JSX.Element} A div containing the title and a list of series.
 */
export default function SeriesOfTheWeek() {
  const { data, isLoading, isError } = useSeriesOfTheWeek();

  return (
    <div className="list-title-slider">
      <h2 className="mb-4">Series of the week</h2>
      <ListTitleSlider isLoading={isLoading} isError={isError} data={data?.results} />
    </div>
  );
}
