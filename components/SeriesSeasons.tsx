'use client';

import { useState } from 'react';

import Image from 'next/image';

import { useSeriesSeason } from '@/hooks/useSeries';
import type { Season } from '@/types/movies';

import SeriesSeasonLoader from '@/components/SeriesSeasonLoader';

import { toFixed } from '@/utils/number';

interface SeriesSeasonsProps {
  seriesId: number;
  seasons: Season[];
}

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

export default function SeriesSeasons({ seriesId, seasons }: SeriesSeasonsProps) {
  const [activeSeason, setActiveSeason] = useState(seasons[0]?.season_number ?? 1);
  const { data, isLoading } = useSeriesSeason(seriesId, activeSeason);

  if (!seasons || !seasons.length) return null;

  return (
    <div className="series-seasons__container">
      <div className="series-seasons__seasons">
        {seasons.map((season) => (
          <a
            key={season.id}
            href="#"
            className={`series-seasons__season ${activeSeason === season.season_number ? 'active' : ''}`}
            onClick={() => setActiveSeason(season.season_number)}
          >
            Season {season.season_number}
          </a>
        ))}
      </div>
      {isLoading ? (
        <SeriesSeasonLoader />
      ) : (
        <div className="flex flex-col gap-10">
          {data?.episodes?.map((episode) => (
            <div className="flex gap-6" key={episode.id}>
              <div>
                <div className="series-seasons__episode-image">
                  {episode.still_path ? (
                    <Image
                      src={`${IMAGE_BASE_URL}/w185${episode.still_path}`}
                      alt={episode.name}
                      fill
                      sizes="14vw"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div className="not-found-image">No Image</div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="series-seasons__episode-title">{episode.name}</h2>
                <div className="series-seasons__episode-metadata">
                  <span>
                    S{episode.season_number} E{episode.episode_number}
                  </span>
                  <span className="circle-divider"></span>
                  <span>{episode.air_date}</span>
                  {!!episode.runtime && (
                    <>
                      <span className="circle-divider"></span>
                      <span>{episode.runtime} m</span>
                    </>
                  )}
                  {!!episode.vote_average && (
                    <>
                      <span className="circle-divider"></span>
                      <span>{toFixed(episode.vote_average)} / 10</span>
                    </>
                  )}
                </div>
                <p className="series-seasons__episode-overview">{episode.overview}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
