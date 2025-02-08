'use client';

import Image from 'next/image';

import { Movie, Series } from '@/types/movies';

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

interface HomeBannerPaginationProps {
  items: (Movie | Series)[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

export default function HomeBannerPagination({
  items,
  activeIndex,
  setActiveIndex,
}: HomeBannerPaginationProps) {
  return (
    <ul className="home-banner__pagination-container">
      {items.map((item, index) => (
        <li
          key={item.id}
          className={`home-banner__pagination ${index === activeIndex ? 'active' : ''}`}
          onClick={() => setActiveIndex(index)}
        >
          <Image
            src={`${IMAGE_BASE_URL}/w300${item.backdrop_path}`}
            alt={'title' in item ? item.title : item.name}
            width={74}
            height={42}
            style={{ objectFit: 'cover' }}
          />
        </li>
      ))}
    </ul>
  );
}
