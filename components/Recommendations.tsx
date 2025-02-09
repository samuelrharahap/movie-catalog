'use client';

import { useRecommendations } from '@/hooks/useRecommendation';

import ListTitleSlider from '@/components/ListTitleSlider';

interface RecommendationProps {
  type: 'movie' | 'tv';
  id: number;
}

export default function Recommendations({ type, id }: RecommendationProps) {
  const { data, isLoading, isError } = useRecommendations(type, id);

  return (
    <div className="list-title-slider recommendations" id="recommendations">
      <h2 className="mb-4">More Like This</h2>
      <ListTitleSlider isLoading={isLoading} isError={isError} data={data?.results} />
    </div>
  );
}
