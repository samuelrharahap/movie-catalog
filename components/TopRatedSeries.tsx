'use client';

import { useTopRatedSeries } from '@/hooks/useTopRated';

import ListTitleSlider from '@/components/ListTitleSlider';

export default function TopRatedSeries() {
  const { data, isLoading, isError } = useTopRatedSeries();

  return (
    <div className="list-title-slider">
      <h2 className="mb-4">Top rated series</h2>
      <ListTitleSlider isLoading={isLoading} isError={isError} data={data?.results} />
    </div>
  );
}
