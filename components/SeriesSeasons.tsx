'use client';

import { useState } from 'react';

import { useSeriesSeason } from '@/hooks/useSeries';
import type { Season } from '@/types/movies';

import { ImageLoader } from '@/components/ImageLoader';
import SeriesSeasonLoader from '@/components/SeriesSeasonLoader';

import { toFixed } from '@/utils/number';

interface SeriesSeasonsProps {
  seriesId: number;
  seasons: Season[];
}

/**
 * Component to display the seasons and episodes of a series.
 *
 * @param {SeriesSeasonsProps} props - The properties for the component.
 * @param {number} props.seriesId - The ID of the series.
 * @param {Array} props.seasons - The list of seasons for the series.
 *
 * @returns {JSX.Element | null} The rendered component or null if there are no seasons.
 */
export default function SeriesSeasons({ seriesId, seasons }: SeriesSeasonsProps) {
  const [activeSeason, setActiveSeason] = useState(seasons[0]?.season_number ?? 1);
  const { data, isLoading, isError } = useSeriesSeason(seriesId, activeSeason);

  if (!seasons || !seasons.length) return null;

  return (
    <div id="series-seasons" className="mb-10">
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
      ) : isError ? (
        <p>Error loading data</p>
      ) : (
        <div className="flex flex-col gap-10">
          {data?.episodes?.map((episode) => (
            <div className="flex gap-6" key={episode.id}>
              <div>
                <div className="series-seasons__episode-image">
                  {episode.still_path ? (
                    <ImageLoader
                      url={episode.still_path}
                      smallResolution="w45"
                      normalResolution="w500"
                      alt={episode.name}
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
