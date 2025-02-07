interface ButtonAddToWatchListProps {
  id: number;
}

export function ButtonAddToWatchList({ id }: ButtonAddToWatchListProps) {
  console.log(id);

  return <button className="button button-add-to-watch-list">+</button>;
}
