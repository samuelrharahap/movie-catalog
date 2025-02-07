'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { Movie, TVShow } from '@/types/movies';

import { ButtonAddToWatchList } from '@/components/ButtonAddToWatchList';
import { ButtonDetail } from '@/components/ButtonDetail';

import { getYearFromDate } from '@/utils/date';
import { formatNumber, toFixed } from '@/utils/number';

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

export default function HomeBannerClient({ items }: { items: (Movie | TVShow)[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [items.length, isPaused]);

  return (
    <ul
      className="home-banner__container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {items.map((item, index) => (
        <li key={item.id} className={`home-banner__list ${index === activeIndex ? 'active' : ''}`}>
          <Image
            src={`${IMAGE_BASE_URL}/w1280${item.backdrop_path}`}
            alt={'title' in item ? item.title : item.name}
            fill
            style={{ objectFit: 'cover' }}
            priority={index === 0} // Prioritize first item
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          />
          <div className="home-banner__overlay">
            <div className="home-banner__caption">
              <h2 className="home-banner__title">{'title' in item ? item.title : item.name}</h2>
              <div className="home-banner__meta">
                <span>
                  {getYearFromDate(
                    'release_date' in item ? item.release_date : item.first_air_date
                  )}
                </span>
                <span className="circle-divider"></span>
                <span className="home-banner__rating">
                  {toFixed(item.vote_average)} ({formatNumber(item.vote_count)} users)
                </span>
              </div>
              <p className="home-banner__overview">{item.overview}</p>
              <div className="flex w-full items-center gap-2">
                <ButtonDetail id={item.id} type={'title' in item ? 'movie' : 'tv'} />
                <ButtonAddToWatchList id={item.id} />
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
