import Link from 'next/link';

interface ButtonDetailProps {
  id: number;
  type: 'movie' | 'series';
}

export function ButtonDetail({ id, type }: ButtonDetailProps) {
  return (
    <Link href={`/detail/${type}/${id}`} className="w-full">
      <button className="button button-detail">View Detail</button>
    </Link>
  );
}
