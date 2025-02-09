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

/**
 * ImageLoader component that loads a lower-resolution placeholder image first,
 * and then loads the normal resolution image once it is available.
 *
 * @param {string} url - The URL of the image to load.
 * @param {string} alt - The alt text for the image.
 * @param {string} sizes - The sizes attribute for the image.
 * @param {React.CSSProperties} style - The style to apply to the image.
 * @param {string} normalResolution - The path for the normal resolution image.
 * @param {string} smallResolution - The path for the small resolution image.
 *
 * @returns {JSX.Element} The ImageLoader component.
 */
export function ImageLoader({
  url,
  alt,
  sizes,
  style,
  normalResolution,
  smallResolution,
}: ImageLoaderProps) {
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
