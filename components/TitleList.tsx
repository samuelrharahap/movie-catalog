import type { Movie, Series } from '@/types/movies';

import TitleItem from '@/components/TitleItem';

interface TitleListProps {
  isLoading: boolean;
  isError: boolean;
  data?: (Movie | Series)[];
}

export default function TitleList({ isLoading, isError, data }: TitleListProps) {
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
        <ul className="list-title__container">
          {data?.map((movie) => <TitleItem key={movie.id} data={movie} />)}
        </ul>
      )}
    </div>
  );
}
