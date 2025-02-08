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
const ITEM_GAP = 7; // Gap between items (in pixels)
const EXCLUDE_GAP = 2 * ITEM_GAP; // Gap in the beginning and end of the list

export default function ListTitleSlider({ isLoading, isError, data }: ListTitleSliderProps) {
  const viewPortRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLLIElement>(null); // Reference to a single item to get the width
  const prevButtonRef = useRef<HTMLDivElement>(null);
  const nextButtonRef = useRef<HTMLDivElement>(null);

  const [translateX, setTranslateX] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);

  // Get the actual width of an item
  useEffect(() => {
    const updateItemWidth = () => {
      if (!itemRef.current) return;

      const computedWidth = itemRef.current.getBoundingClientRect().width;
      setItemWidth(computedWidth);
    };

    updateItemWidth();
    window.addEventListener('resize', updateItemWidth);
    return () => window.removeEventListener('resize', updateItemWidth);
  }, [data]);

  // Set max scroll depending on the number of items and the width of the container
  useEffect(() => {
    if (!viewPortRef.current || !data?.length || itemWidth === 0) return;

    const containerWidth = viewPortRef.current.clientWidth;
    const totalItemsWidth = data.length * (itemWidth + ITEM_GAP); // Includes gap

    setMaxScroll(Math.max(0, totalItemsWidth - containerWidth + EXCLUDE_GAP)); // Prevent negative overflow
  }, [data, itemWidth]);

  const getScrollAmount = () => ITEMS_PER_SCROLL * (itemWidth + ITEM_GAP);

  const onNextClick = () => {
    if (!viewPortRef.current || translateX >= maxScroll) return;
    setTranslateX(Math.min(translateX + getScrollAmount(), maxScroll));
  };

  const onPrevClick = () => {
    if (!viewPortRef.current || translateX <= 0) return;
    setTranslateX(Math.max(translateX - getScrollAmount(), 0));
  };

  const isShowingPrevButton = translateX > 0;
  const isShowingNextButton = translateX < maxScroll;

  if (isLoading) return <ListTitleSliderLoader />;
  if (isError) return <p>Error loading data</p>;

  return (
    <div className="list-title-slider__viewport" ref={viewPortRef}>
      <ul
        className="list-title-slider__container"
        style={{ transform: `translateX(-${translateX}px)`, transition: 'transform 0.3s ease' }}
      >
        {data?.map((movie, index) => (
          <li
            key={movie.id}
            className="list-title-slider__item"
            ref={index === 0 ? itemRef : undefined} // Assign ref to only the first item
          >
            <TitleItem
              data={movie}
              prevButtonRef={prevButtonRef}
              nextButtonRef={nextButtonRef}
              isShowingPrevButton={isShowingPrevButton}
              isShowingNextButton={isShowingNextButton}
            />
          </li>
        ))}
      </ul>
      {isShowingPrevButton && (
        <div
          className="list-title-slider__pagination-prev"
          ref={prevButtonRef}
          onClick={onPrevClick}
        >
          <Image src="/icon-arrow-left.svg" alt="arrow-left" width={24} height={24} />
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
