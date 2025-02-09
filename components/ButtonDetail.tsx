import Link from 'next/link';

interface ButtonDetailProps {
  id: number;
  size?: 'sm' | '';
  variant?: 'white' | '';
  type: 'movie' | 'tv';
}

/**
 * ButtonDetail component renders a button that navigates to a detail page.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.id - The identifier for the detail page.
 * @param {string} props.type - The type of detail page.
 * @param {string} [props.size=''] - The size of the button (optional).
 * @param {string} [props.variant=''] - The variant of the button (optional).
 * @returns {JSX.Element} The rendered ButtonDetail component.
 */
export default function ButtonDetail({ id, type, size = '', variant = '' }: ButtonDetailProps) {
  return (
    <Link href={`/detail/${type}/${id}`} className="w-full">
      <button className={`button button-detail ${size} ${variant}`.trim()}>View Detail</button>
    </Link>
  );
}
