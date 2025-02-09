'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import type { Movie, Series } from '@/types/movies';

import ButtonAddToWatchList from '@/components/ButtonAddToWatchList';
import ButtonDetail from '@/components/ButtonDetail';

import { getYearFromDate } from '@/utils/date';
import { formatNumber, toFixed } from '@/utils/number';

interface TopBannerProps {
  item: Movie | Series;
  index: number;
  inDetailPage?: boolean;
}

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

const getBackdropSize = () => {
  if (typeof window === 'undefined') return 'w1280'; // Default SSR safe value

  const width = window.innerWidth;
  if (width > 1600) return 'original'; // Ultra-wide screens
  if (width > 1200) return 'w1280'; // Large screens
  if (width > 768) return 'w780'; // Medium screens
  return 'w300'; // Small screens
};

export default function TopBanner({ item, index, inDetailPage }: TopBannerProps) {
  // Update backdrop size based on window width on client
  const [backdropSize, setBackdropSize] = useState('w1280'); // Default size
  useEffect(() => {
    const updateSize = () => {
      setBackdropSize(getBackdropSize());
    };

    updateSize(); // Set initial size
    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const totalSeasons = 'seasons' in item ? item.seasons?.length : 0;

  return (
    <div className="top-banner__container">
      <div className="top-banner__image">
        {item.backdrop_path ? (
          <Image
            src={`${IMAGE_BASE_URL}/${backdropSize}${item.backdrop_path}`}
            alt={'title' in item ? item.title : item.name}
            fill
            style={{ objectFit: 'cover' }}
            priority={index === 0} // Prioritize first item
            sizes="100vw"
          />
        ) : (
          <div className="not-found-image">No Image</div>
        )}
      </div>
      <div className="top-banner__overlay">
        <div className="top-banner__caption">
          {inDetailPage ? (
            <h1 className="top-banner__title">{'title' in item ? item.title : item.name}</h1>
          ) : (
            <h2 className="top-banner__title">{'title' in item ? item.title : item.name}</h2>
          )}
          <div className="top-banner__meta">
            <span>
              {getYearFromDate('release_date' in item ? item.release_date : item.first_air_date)}
            </span>
            <span className="circle-divider"></span>
            <span className="top-banner__rating">
              {toFixed(item.vote_average)} ({formatNumber(item.vote_count)} users)
            </span>
            {inDetailPage && !!totalSeasons && (
              <>
                <span className="circle-divider"></span>
                <span>
                  {totalSeasons} {totalSeasons > 1 ? 'Seasons' : 'Season'}
                </span>
              </>
            )}
          </div>
          <p className="top-banner__overview">{item.overview}</p>
          <div className="flex w-full items-center gap-2">
            {!inDetailPage && <ButtonDetail id={item.id} type={'title' in item ? 'movie' : 'tv'} />}
            <ButtonAddToWatchList item={item} />
          </div>
          {inDetailPage && (
            <div className="top-banner__meta">
              {item.genres?.map((genre) => genre.name).join(', ')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
