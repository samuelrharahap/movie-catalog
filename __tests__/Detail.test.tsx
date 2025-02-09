import {
  dummySeries,
  dummySeriesFirstSeason,
  dummySeriesSeason,
  dummySeriesSecondSeason,
} from '@/__tests__/mock/data';
import api from '@/lib/axiosInstance';
import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { afterEach, describe, expect, test } from 'vitest';

import Recommendations from '@/components/Recommendations';
import SeriesSeasons from '@/components/SeriesSeasons';

import { createTestQueryClient, renderWithClient } from '@/utils/test';

afterEach(() => {
  createTestQueryClient().clear();
  cleanup();
});

const seriesId = 93405;

describe('SeriesSeasons', () => {
  test('Should render series seasons', async () => {
    // Mocking API response
    const mock = new MockAdapter(api);
    mock.onGet(`/tv/${seriesId}/season/1`).reply(200, dummySeriesFirstSeason);
    mock.onGet(`/tv/${seriesId}/season/2`).reply(200, dummySeriesSecondSeason);

    renderWithClient(<SeriesSeasons seriesId={seriesId} seasons={dummySeriesSeason} />);

    // Check series seasons are rendered
    await waitFor(() => {
      dummySeriesSeason.forEach((season) => {
        expect(screen.getByText(season.name)).toBeTruthy();
      });
    });

    // Check one of season 1 episodes is rendered
    await waitFor(() => {
      expect(screen.getAllByAltText(dummySeriesFirstSeason.episodes[0].name).length).toBe(2);
      expect(screen.getByText(dummySeriesFirstSeason.episodes[0].name)).toBeTruthy();
      expect(screen.getByText(dummySeriesFirstSeason.episodes[0].overview)).toBeTruthy();
    });

    // Trigger season 2
    await fireEvent.click(screen.getByText('Season 2'));
    // Check one of season 2 episodes is rendered
    await waitFor(() => {
      expect(screen.queryByText(dummySeriesFirstSeason.episodes[0].name)).toBeFalsy();

      expect(screen.getAllByAltText(dummySeriesSecondSeason.episodes[0].name).length).toBe(2);
      expect(screen.getByText(dummySeriesSecondSeason.episodes[0].name)).toBeTruthy();
      expect(screen.getByText(dummySeriesSecondSeason.episodes[0].overview)).toBeTruthy();
    });
  });
});

describe('Recommendations', () => {
  test('Should render recommendations', async () => {
    // Mocking API response
    const mock = new MockAdapter(api);
    mock.onGet(`/tv/${seriesId}/recommendations`).reply(200, { results: dummySeries });

    renderWithClient(<Recommendations type="tv" id={seriesId} />);

    // Check recommendation poster are rendered
    await waitFor(() => {
      expect(screen.getAllByAltText(dummySeries[0].name).length).toBe(2);
    });
  });
});
