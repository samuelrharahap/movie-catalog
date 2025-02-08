export default function ListTitleLoader() {
  return (
    <ul className="grid grid-cols-7 gap-2">
      {Array.from({ length: 7 }).map((_, index) => (
        <li key={index}>
          <div className="shimmer" style={{ width: 185, height: 278 }}></div>
        </li>
      ))}
    </ul>
  );
}
