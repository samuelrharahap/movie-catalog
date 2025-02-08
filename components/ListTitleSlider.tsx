import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import type { Movie, Series } from '@/types/movies';

import ListTitleSliderLoader from '@/components/ListTitleSliderLoader';
import TitleItem from '@/components/TitleItem';

interface ListTitleSliderProps {
  isLoading: boolean;
  isError: boolean;
  data?: (Movie | Series)[];
}

const ITEMS_PER_SCROLL = 5; // Number of items per scroll
const ITEM_WIDTH = 185; // Width of one item
const ITEM_GAP = 7; // Gap between items
const EXCLUDE_GAP = 2 * ITEM_GAP; // Gap in the beginning and end
const TOTAL_ITEM_WIDTH = ITEM_WIDTH + ITEM_GAP; // 192px per item

export default function ListTitleSlider({ isLoading, isError, data }: ListTitleSliderProps) {
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

  if (isLoading) {
    return <ListTitleSliderLoader />;
  }

  if (isError) {
    return <p>Error loading data</p>;
  }

  return (
    <div className="list-title-slider__viewport" ref={viewPortRef}>
      <ul
        className="list-title-slider__container"
        style={{ transform: `translateX(-${translateX}px)`, transition: 'transform 0.3s ease' }}
      >
        {data?.map((movie) => (
          <li key={movie.id} className="list-title-slider__item">
            <TitleItem data={movie} prevButtonRef={prevButtonRef} nextButtonRef={nextButtonRef} />
          </li>
        ))}
      </ul>
      {isShowingPrevButton && (
        <div
          className="list-title-slider__pagination-prev"
          ref={prevButtonRef}
          onClick={onPrevClick}
        >
          <Image src="/icon-arrow-left.svg" alt="arrow-right" width={24} height={24} />
        </div>
      )}
      {isShowingNextButton && (
        <div
          className="list-title-slider__pagination-next"
          ref={nextButtonRef}
          onClick={onNextClick}
        >
          <Image src="/icon-arrow-right.svg" alt="arrow-right" width={24} height={24} />
        </div>
      )}
    </div>
  );
}
