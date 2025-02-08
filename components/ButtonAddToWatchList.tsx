interface ButtonAddToWatchListProps {
  id: number;
  size?: 'sm' | '';
}

export default function ButtonAddToWatchList({ id, size = '' }: ButtonAddToWatchListProps) {
  const onButtonClick = () => {
    console.log('Button clicked');
    // Add to watch list
    console.log(id);
  };

  return (
    <button
      className={`button button-add-to-watch-list ${size}`.trim()}
      onClick={() => onButtonClick()}
    >
      +
    </button>
  );
}
