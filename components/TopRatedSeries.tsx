'use client';

import { useTopRatedSeries } from '@/hooks/useTopRated';

import ListTitleSlider from '@/components/ListTitleSlider';

/**
 * TopRatedSeries component fetches and displays the top rated series.
 * It uses the `useTopRatedSeries` hook to retrieve the data.
 *
 * @returns {JSX.Element} A div containing the title and a list of series.
 */
export default function TopRatedSeries() {
  const { data, isLoading, isError } = useTopRatedSeries();

  return (
    <div className="list-title-slider">
      <h2 className="mb-4">Top rated series</h2>
      <ListTitleSlider isLoading={isLoading} isError={isError} data={data?.results} />
    </div>
  );
}
