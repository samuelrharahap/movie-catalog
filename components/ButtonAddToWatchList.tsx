interface ButtonAddToWatchListProps {
  id: number;
  size?: 'sm' | '';
}

export default function ButtonAddToWatchList({ id, size = '' }: ButtonAddToWatchListProps) {
  console.log(id);

  return <button className={`button button-add-to-watch-list ${size}`.trim()}>+</button>;
}
