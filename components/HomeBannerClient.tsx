'use client';

import { useEffect, useState } from 'react';

import { Movie, Series } from '@/types/movies';

import HomeBannerPagination from '@/components/HomeBannerPagination';
import TopBanner from '@/components/TopBanner';

export default function HomeBannerClient({ items }: { items: (Movie | Series)[] }) {
  // Logic for auto-rotating banner
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
    <div
      className="home-banner__container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <ul>
        {items.map((item, index) => (
          <li
            key={item.id}
            className={`home-banner__list ${index === activeIndex ? 'active' : ''}`}
          >
            <TopBanner item={item} index={index} />
          </li>
        ))}
      </ul>
      <HomeBannerPagination
        items={items}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
    </div>
  );
}
