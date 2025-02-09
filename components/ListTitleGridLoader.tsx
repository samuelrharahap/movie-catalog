/**
 * A functional component that renders a list of shimmer loading placeholders.
 * This component is used to indicate that a list of titles is being loaded.
 *
 * @returns {JSX.Element} A list of shimmer loading placeholders.
 */
export default function ListTitleLoader() {
  return (
    <ul className="list-title-grid gap-2">
      {Array.from({ length: 7 }).map((_, index) => (
        <li key={index}>
          <div className="shimmer aspect-ratio-2/3"></div>
        </li>
      ))}
    </ul>
  );
}
