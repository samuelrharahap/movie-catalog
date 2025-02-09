'use client';

import { useRecommendations } from '@/hooks/useRecommendation';

import ListTitleSlider from '@/components/ListTitleSlider';

interface RecommendationProps {
  type: 'movie' | 'tv';
  id: number;
}

/**
 * Recommendations component fetches and displays a list of recommended items based on the provided type and id.
 *
 * @component
 * @param {RecommendationProps} props - The props for the Recommendations component.
 * @param {string} props.type - The type of recommendations to fetch (e.g., movie, show).
 * @param {string | number} props.id - The ID of the item for which to fetch recommendations.
 * @returns {JSX.Element} The rendered Recommendations component.
 */
export default function Recommendations({ type, id }: RecommendationProps) {
  const { data, isLoading, isError } = useRecommendations(type, id);

  return (
    <div className="list-title-slider recommendations" id="recommendations">
      <h2 className="mb-4">More Like This</h2>
      <ListTitleSlider isLoading={isLoading} isError={isError} data={data?.results} />
    </div>
  );
}
