import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import type { Movie, Series } from '@/types/movies';

import TitleItem from '@/components/TitleItem';

interface TitleListProps {
  isLoading: boolean;
  isError: boolean;
  data?: (Movie | Series)[];
}

const ITEMS_PER_SCROLL = 5; // Number of items per scroll
const ITEM_WIDTH = 185; // Width of one item
const ITEM_GAP = 7; // Gap between items
const EXCLUDE_GAP = 2 * ITEM_GAP; // Gap in the beginning and end
const TOTAL_ITEM_WIDTH = ITEM_WIDTH + ITEM_GAP; // 192px per item

export default function TitleList({ isLoading, isError, data }: TitleListProps) {
  const viewPortRef = useRef<HTMLDivElement>(null);
  const prevButtonRef = useRef<HTMLDivElement>(null);
  const nextButtonRef = useRef<HTMLDivElement>(null);

  const [translateX, setTranslateX] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  // Set max scroll when data is available
  useEffect(() => {
    if (!viewPortRef.current || !data?.length) return;

    const containerWidth = viewPortRef.current.clientWidth;
    const totalItemsWidth = data.length * TOTAL_ITEM_WIDTH; // Includes gap
    setMaxScroll(Math.max(0, totalItemsWidth - containerWidth + EXCLUDE_GAP)); // Prevent negative overflow
  }, [data]);

  const onNextClick = () => {
    if (!viewPortRef.current || translateX >= maxScroll) return;

    const scrollAmount = ITEMS_PER_SCROLL * TOTAL_ITEM_WIDTH;
    const newTranslateX = Math.min(translateX + scrollAmount, maxScroll);

    setTranslateX(newTranslateX);
  };

  const onPrevClick = () => {
    if (!viewPortRef.current || translateX <= 0) return;

    const scrollAmount = ITEMS_PER_SCROLL * TOTAL_ITEM_WIDTH;
    const newTranslateX = Math.max(translateX - scrollAmount, 0);

    setTranslateX(newTranslateX);
  };

  const isShowingPrevButton = translateX > 0;
  const isShowingNextButton = translateX < maxScroll;

  return (
    <div>
      {isLoading ? (
        <ul className="list-title__container">
          {Array.from({ length: 10 }).map((_, index) => (
            <li key={index} className="list-title__item">
              <div className="shimmer" style={{ width: 185, height: 278 }}></div>
            </li>
          ))}
        </ul>
      ) : isError ? (
        <p>Error</p>
      ) : (
        <div className="list-title__viewport" ref={viewPortRef}>
          <ul
            className="list-title__container"
            style={{ transform: `translateX(-${translateX}px)`, transition: 'transform 0.3s ease' }}
          >
            {data?.map((movie) => (
              <li key={movie.id}>
                <TitleItem
                  isFixWidth={true}
                  data={movie}
                  prevButtonRef={prevButtonRef}
                  nextButtonRef={nextButtonRef}
                />
              </li>
            ))}
          </ul>
          {isShowingPrevButton && (
            <div className="list-title__pagination-prev" ref={prevButtonRef} onClick={onPrevClick}>
              <Image src="/icon-arrow-left.svg" alt="arrow-right" width={24} height={24} />
            </div>
          )}
          {isShowingNextButton && (
            <div className="list-title__pagination-next" ref={nextButtonRef} onClick={onNextClick}>
              <Image src="/icon-arrow-right.svg" alt="arrow-right" width={24} height={24} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
