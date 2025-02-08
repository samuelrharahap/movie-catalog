'use client';

import { useSeriesOfTheWeek } from '@/hooks/useSeries';

import ListTitleSlider from '@/components/ListTitleSlider';

export default function SeriesOfTheWeek() {
  const { data, isLoading, isError } = useSeriesOfTheWeek();

  return (
    <div className="list-title-slider">
      <h2 className="mb-4">Series of the week</h2>
      <ListTitleSlider isLoading={isLoading} isError={isError} data={data?.results} />
    </div>
  );
}
