'use client';

import { useEffect, useState } from 'react';

import { Movie, Series } from '@/types/movies';

import HomeBannerPagination from '@/components/HomeBannerPagination';
import TopBanner from '@/components/TopBanner';

interface HomeBannerClientProps {
  items: (Movie | Series)[];
}

/**
 * HomeBannerClient component displays a banner with a list of items that automatically cycles through them.
 * The cycling pauses when the mouse hovers over the banner.
 *
 * @component
 * @param {HomeBannerClientProps} props - The props for the HomeBannerClient component.
 * @param {Array} props.items - The list of items to display in the banner.
 *
 * @returns {JSX.Element} The rendered HomeBannerClient component.
 */
export default function HomeBannerClient({ items }: HomeBannerClientProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalItems = items.length;
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalItems);
    }, 5000);

    return () => clearInterval(interval);
  }, [totalItems, isPaused]);

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
