export default function ListTitleSliderLoader() {
  return (
    <ul className="list-title-slider__container">
      {Array.from({ length: 10 }).map((_, index) => (
        <li key={index} className="list-title-slider__item">
          <div className="shimmer aspect-ratio-2/3"></div>
        </li>
      ))}
    </ul>
  );
}
