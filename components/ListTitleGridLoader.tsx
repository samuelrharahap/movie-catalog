export default function ListTitleLoader() {
  return (
    <ul className="grid grid-cols-7 gap-2">
      {Array.from({ length: 7 }).map((_, index) => (
        <li key={index}>
          <div className="shimmer aspect-ratio-2/3"></div>
        </li>
      ))}
    </ul>
  );
}
