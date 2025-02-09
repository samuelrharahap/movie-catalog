import { useState } from 'react';

import Image from 'next/image';

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

interface ImageLoaderProps {
  url: string;
  alt: string;
  sizes: string;
  style?: React.CSSProperties;
  smallResolution: string;
  normalResolution: string;
}

export function ImageLoader({
  url,
  alt,
  sizes,
  style,
  normalResolution,
  smallResolution,
}: ImageLoaderProps) {
  // Generate a lower-resolution placeholder
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      {!imageLoaded && (
        <Image
          src={`${IMAGE_BASE_URL}/${smallResolution}${url}`} // Load low-res first
          alt={alt}
          fill
          priority
          sizes={sizes}
          style={style}
        />
      )}
      <Image
        src={`${IMAGE_BASE_URL}/${normalResolution}${url}`}
        alt={alt}
        fill
        sizes={sizes}
        style={style}
        onLoad={() => setImageLoaded(true)}
      />
    </>
  );
}
