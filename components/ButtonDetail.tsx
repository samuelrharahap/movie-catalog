import Link from 'next/link';

interface ButtonDetailProps {
  id: number;
  size?: 'sm' | '';
  variant?: 'white' | '';
  type: 'movie' | 'tv';
}

export default function ButtonDetail({ id, type, size = '', variant = '' }: ButtonDetailProps) {
  return (
    <Link href={`/detail/${type}/${id}`} className="w-full">
      <button className={`button button-detail ${size} ${variant}`.trim()}>View Detail</button>
    </Link>
  );
}
