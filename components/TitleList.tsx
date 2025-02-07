import Image from 'next/image';

import type { Movie, Series } from '@/types/movies';

interface TitleListProps {
  isLoading: boolean;
  isError: boolean;
  data?: (Movie | Series)[];
}

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

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
          {data?.map((movie) => (
            <li key={movie.id} className="list-title__item">
              <Image
                src={`${IMAGE_BASE_URL}/w185${movie.poster_path}`}
                alt={'title' in movie ? movie.title : (movie as Series).name}
                width={185}
                height={278}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
