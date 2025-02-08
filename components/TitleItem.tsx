import { useRef, useState } from 'react';

import Image from 'next/image';

import type { Movie, Series } from '@/types/movies';

import TitleHoverCard from '@/components/TitleHoverCard';

interface TitleItem {
  data: Movie | Series;
  prevButtonRef?: React.RefObject<HTMLDivElement | null>;
  nextButtonRef?: React.RefObject<HTMLDivElement | null>;
  isShowingPrevButton?: boolean;
  isShowingNextButton?: boolean;
}

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;
const START_POSITION = 100;
const GAP_AREA = 10;

export default function TitleItem({
  data,
  prevButtonRef,
  nextButtonRef,
  isShowingPrevButton,
  isShowingNextButton,
}: TitleItem) {
  const itemRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isLeftMost, setIsLeftMost] = useState(false);
  const [isRightMost, setIsRightMost] = useState(false);

  const onMouseEnter = () => {
    if (!itemRef.current) return;

    const rect = itemRef.current.getBoundingClientRect();

    const rightPosition = rect.right;
    const leftPosition = rect.left;
    const viewportRightEdge = window.innerWidth;

    if (isShowingNextButton && rightPosition + GAP_AREA >= viewportRightEdge) {
      return; // Element is too close to the right edge
    }

    if (isShowingPrevButton && leftPosition <= START_POSITION + GAP_AREA) {
      return; // Element is too close to the left edge
    }

    if (rightPosition + GAP_AREA >= viewportRightEdge) {
      setIsRightMost(true);
    }

    if (leftPosition == START_POSITION) {
      setIsLeftMost(true);
    }

    if (isShowingNextButton) {
      nextButtonRef?.current?.classList.add('opacity-0');
    }
    if (isShowingPrevButton) {
      prevButtonRef?.current?.classList.add('opacity-0');
    }
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    if (isShowingNextButton) {
      nextButtonRef?.current?.classList.remove('opacity-0');
    }
    if (isShowingPrevButton) {
      prevButtonRef?.current?.classList.remove('opacity-0');
    }
    setIsHovered(false);
    setIsLeftMost(false);
  };

  return (
    <div
      ref={itemRef}
      className={`title-item ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => onMouseEnter()}
      onMouseLeave={() => onMouseLeave()}
    >
      <div className="aspect-ratio-2/3 relative">
        {data.poster_path ? (
          <Image
            src={`${IMAGE_BASE_URL}/w185${data.poster_path}`}
            alt={'title' in data ? data.title : (data as Series).name}
            fill
            sizes="14vw"
          />
        ) : (
          <div className="not-found-image">No Image</div>
        )}
      </div>
      {isHovered && (
        <TitleHoverCard
          item={data}
          active={isHovered}
          isLeftMost={isLeftMost}
          isRightMost={isRightMost}
        />
      )}
    </div>
  );
}
