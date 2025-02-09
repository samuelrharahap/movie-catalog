'use client';

import Image from 'next/image';

import { Movie, Series } from '@/types/movies';

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

interface HomeBannerPaginationProps {
  items: (Movie | Series)[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

/**
 * HomeBannerPagination component renders a pagination control for a banner.
 * It displays a list of items with clickable pagination indicators.
 *
 * @param {HomeBannerPaginationProps} props - The component props.
 * @param {Array} props.items - The list of items to display in the pagination.
 * @param {number} props.activeIndex - The index of the currently active item.
 * @param {Function} props.setActiveIndex - The function to set the active index.
 *
 * @returns {JSX.Element} The rendered pagination component.
 */
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
          {item.backdrop_path ? (
            <Image
              src={`${IMAGE_BASE_URL}/w92${item.backdrop_path}`}
              alt={'title' in item ? item.title : item.name}
              width={74}
              height={42}
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div className="not-found-image">No Image</div>
          )}
        </li>
      ))}
    </ul>
  );
}
