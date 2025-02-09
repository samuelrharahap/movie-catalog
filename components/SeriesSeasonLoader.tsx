export default function ListTitleLoader() {
  return (
    <div className="flex flex-col gap-6">
      {Array.from({ length: 10 }).map((_, index) => (
        <div className="flex gap-6" key={index}>
          <div className="series-seasons__episode-image">
            <div className="shimmer aspect-ratio-2/3"></div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="series-seasons__episode-title">
              <div
                className="shimmer w-full"
                style={{ height: '21px', width: '600px', maxWidth: '100%' }}
              ></div>
            </div>
            <div className="series-seasons__episode-metadata">
              <div
                className="shimmer w-full"
                style={{ height: '21px', width: '600px', maxWidth: '100%' }}
              ></div>
            </div>
            <div className="series-seasons__episode-overview">
              <div
                className="shimmer w-full"
                style={{ height: '96px', width: '600px', maxWidth: '100%' }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
