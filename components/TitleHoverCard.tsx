import { useEffect, useState } from 'react';

import Image from 'next/image';

import type { Movie, Series } from '@/types/movies';

import ButtonAddToWatchList from '@/components/ButtonAddToWatchList';
import ButtonDetail from '@/components/ButtonDetail';

import { getYearFromDate } from '@/utils/date';
import { formatNumber, toFixed } from '@/utils/number';

interface TitleHoverCardProps {
  item: Movie | Series;
  active: boolean;
  isLeftMost: boolean;
}

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

export default function TitleHoverCard({ item, active, isLeftMost }: TitleHoverCardProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (active) {
      setAnimate(true); // Trigger animation when active becomes true
    }
  }, [active]);

  const title = 'title' in item ? item.title : item.name;
  return (
    <div
      className={[
        'hover-card',
        active && 'active',
        isLeftMost && 'left-most',
        animate && 'animated',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="hover-card__image">
        <Image
          src={`${IMAGE_BASE_URL}/w300${item.backdrop_path}`}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="hover-card__content">
        <div className="hover-card__content-title">{title}</div>
        <div className="flex w-full items-center gap-2 mb-4">
          <ButtonDetail size="sm" variant="white" id={item.id} type={item.media_type} />
          <ButtonAddToWatchList size="sm" id={item.id} />
        </div>
        <div className="hover-card__content-meta">
          <span>
            {getYearFromDate('release_date' in item ? item.release_date : item.first_air_date)}
          </span>
          <span className="circle-divider"></span>
          <span className="hover-card__content-rating">
            {toFixed(item.vote_average)} ({formatNumber(item.vote_count)} users)
          </span>
          <span className="circle-divider"></span>
          <span className="uppercase">{item.original_language}</span>
        </div>
        <div className="hover-card__content-overview">{item.overview}</div>
      </div>
    </div>
  );
}
