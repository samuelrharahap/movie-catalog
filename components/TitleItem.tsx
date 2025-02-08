import { useRef, useState } from 'react';

import Image from 'next/image';

import type { Movie, Series } from '@/types/movies';

import TitleHoverCard from '@/components/TitleHoverCard';

interface TitleItem {
  data: Movie | Series;
}

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

export default function TitleItem({ data }: TitleItem) {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const itemRef = useRef<HTMLLIElement>(null);

  const handleMouseEnter = () => {
    if (itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top, // Adjust for scrolling
        left: rect.left, // Adjust for scrolling
      });
    }
    setIsHovered(true);
  };

  return (
    <li
      ref={itemRef}
      className="list-title__item"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={`${IMAGE_BASE_URL}/w185${data.poster_path}`}
        alt={'title' in data ? data.title : (data as Series).name}
        width={185}
        height={278}
      />
      {isHovered && (
        <TitleHoverCard
          item={data}
          style={{ top: position.top, left: position.left }}
          active={isHovered}
        />
      )}
    </li>
  );
}
