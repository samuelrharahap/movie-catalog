import { useRef, useState } from 'react';

import Image from 'next/image';

import type { Movie, Series } from '@/types/movies';

import TitleHoverCard from '@/components/TitleHoverCard';

interface TitleItem {
  data: Movie | Series;
}

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;
const DEFAULT_HOVER_CARD_SPACE = 53;
const START_POSITION = 100;

export default function TitleItem({ data }: TitleItem) {
  const itemRef = useRef<HTMLLIElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isLeftMost, setIsLeftMost] = useState(false);

  const onMouseEnter = () => {
    // setIsHovered(true);
    if (!itemRef.current) return;

    const rect = itemRef.current.getBoundingClientRect();

    const rightPosition = rect.right; // Distance from left edge of viewport
    const viewportRightEdge = window.innerWidth; // Rightmost part of viewport
    if (rightPosition + DEFAULT_HOVER_CARD_SPACE > viewportRightEdge) {
      return; // Element is too close to the right edge
    }

    const leftPosition = rect.left; // Distance from left edge of viewport
    if (leftPosition <= START_POSITION) {
      setIsLeftMost(true); // Element is too close to the left edge
    }
    setIsHovered(true);
  };

  return (
    <li
      ref={itemRef}
      className="list-title__item"
      onMouseEnter={() => onMouseEnter()}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={`${IMAGE_BASE_URL}/w185${data.poster_path}`}
        alt={'title' in data ? data.title : (data as Series).name}
        width={185}
        height={278}
      />
      {isHovered && <TitleHoverCard item={data} active={isHovered} isLeftMost={isLeftMost} />}
    </li>
  );
}
