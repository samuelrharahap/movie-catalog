'use client';

import { useSeriesOfTheWeek } from '@/hooks/useSeries';

import TitleList from '@/components/TitleList';

export default function SeriesOfTheWeek() {
  const { data, isLoading, isError } = useSeriesOfTheWeek();

  return (
    <div className="list-title">
      <h2 className="mb-4">Series of the week</h2>
      <TitleList isLoading={isLoading} isError={isError} data={data?.results} />
    </div>
  );
}
