import { useRef, useState } from 'react';

import type { Movie, Series } from '@/types/movies';

import { ImageLoader } from '@/components/ImageLoader';
import TitleHoverCard from '@/components/TitleHoverCard';

interface TitleItem {
  data: Movie | Series;
  prevButtonRef?: React.RefObject<HTMLDivElement | null>;
  nextButtonRef?: React.RefObject<HTMLDivElement | null>;
  isShowingPrevButton?: boolean;
  isShowingNextButton?: boolean;
}

const START_POSITION = 100;
const GAP_AREA = 10;

/**
 * A component that represents a title item with hover effects.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.data - The data for the title item.
 * @param {React.RefObject<HTMLButtonElement>} props.prevButtonRef - Reference to the previous button element.
 * @param {React.RefObject<HTMLButtonElement>} props.nextButtonRef - Reference to the next button element.
 * @param {boolean} props.isShowingPrevButton - Flag indicating if the previous button is showing.
 * @param {boolean} props.isShowingNextButton - Flag indicating if the next button is showing.
 *
 * @returns {JSX.Element} The rendered title item component.
 */
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
      data-testid="poster"
    >
      <div className="aspect-ratio-2/3 relative">
        {data.poster_path ? (
          <ImageLoader
            url={data.poster_path}
            smallResolution="w45"
            normalResolution="w342"
            alt={'title' in data ? data.title : (data as Series).name}
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
