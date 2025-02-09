import { dummyFeatured, dummyMovies, dummySeries } from '@/__tests__/mock/data';
import api from '@/lib/axiosInstance';
import { WATCHLIST_KEY } from '@/store/watchlistStore';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { afterEach, describe, expect, test } from 'vitest';

import HomeBanner from '@/components/HomeBannerClient';
import MoviesOfTheWeek from '@/components/MoviesOfTheWeek';
import SeriesOfTheWeek from '@/components/SeriesOfTheWeek';
import TopRatedMovies from '@/components/TopRatedMovies';
import TopRatedSeries from '@/components/TopRatedSeries';

import { getYearFromDate } from '@/utils/date';
import { formatNumber, toFixed } from '@/utils/number';
import { createTestQueryClient, renderWithClient } from '@/utils/test';

afterEach(() => {
  createTestQueryClient().clear();
  cleanup();
});

describe('HomeBanner', () => {
  test('Should renders feature titles', async () => {
    render(<HomeBanner items={dummyFeatured} />);

    dummyFeatured.forEach((item) => {
      // Make sure title is rendered
      const title = item.title || item.name;
      expect(screen.getByText(title!)).toBeTruthy();

      // Make sure all featured images are rendered (1 for main image, 1 for thumbnail)
      const images = screen.getAllByAltText(title!);
      expect(images.length).toEqual(2);

      // Make sure overview is rendered
      expect(screen.getByText(item.overview)).toBeTruthy();

      // Make sure year is rendered
      expect(
        screen.getByText(getYearFromDate(item.release_date || item.first_air_date!))
      ).toBeTruthy();

      // Make sure rating is rendered
      expect(
        screen.getByText(`${toFixed(item.vote_average)} (${formatNumber(item.vote_count)} users)`)
      ).toBeTruthy();
    });

    // Make sure first featured is active
    const firstFeatured = dummyFeatured[0];
    const firstFeaturedTitle = firstFeatured.title || firstFeatured.name;
    expect(screen.getByText(firstFeaturedTitle!).closest('li')?.classList).toContain('active');

    // Make sure second featured is not active
    const secondFeatured = dummyFeatured[1];
    const secondFeaturedTitle = secondFeatured.title || secondFeatured.name;
    expect(screen.getByText(secondFeaturedTitle!).closest('li')?.classList).not.toContain('active');
    // Clicking second featured thumbnail
    await screen.getAllByAltText(secondFeaturedTitle!)[1].click();

    // Make sure first featured is not active
    expect(screen.getByText(firstFeaturedTitle!).closest('li')?.classList).not.toContain('active');
    // Make sure second featured is active
    expect(screen.getByText(secondFeaturedTitle!).closest('li')?.classList).toContain('active');
  });
});

describe('MoviesOfTheWeek', () => {
  test('Should renders movies of the week', async () => {
    // Mocking API response
    const mock = new MockAdapter(api);
    mock.onGet('/trending/movie/week').reply(200, {
      results: dummyMovies,
    });

    renderWithClient(<MoviesOfTheWeek />);
    // Wait until posters are rendered
    await waitFor(() => {
      // Make sure all posters are rendered
      dummyMovies.forEach((item) => {
        expect(screen.getAllByAltText(item.title!).length).toEqual(2);
      });
    });

    // Check hover effect
    const firstPosterElement = screen.getAllByTestId('poster')[0];
    await fireEvent.mouseEnter(firstPosterElement);

    // Check content on hover card
    // Make sure title is rendered
    const firstMovie = dummyMovies[0];
    expect(screen.getByText(firstMovie.title)).toBeTruthy();

    // Make sure  overview is rendered
    expect(screen.getByText(firstMovie.overview)).toBeTruthy();

    // Make sure year is rendered
    expect(screen.getByText(getYearFromDate(firstMovie.release_date))).toBeTruthy();

    // Make sure rating is rendered
    expect(
      screen.getByText(
        `${toFixed(firstMovie.vote_average)} (${formatNumber(firstMovie.vote_count)} users)`
      )
    ).toBeTruthy();
  });
});

describe('SeriesOfTheWeek', () => {
  test('Should renders series of the week', async () => {
    // Mocking API response
    const mock = new MockAdapter(api);
    mock.onGet('/trending/tv/week').reply(200, {
      results: dummySeries,
    });

    renderWithClient(<SeriesOfTheWeek />);
    // Wait until posters are rendered
    await waitFor(() => {
      // Make sure all posters are rendered
      dummySeries.forEach((item) => {
        expect(screen.getAllByAltText(item.name!).length).toEqual(2);
      });
    });
  });
});

describe('TopRatedMovies', () => {
  test('Should renders top rated movies', async () => {
    // Mocking API response
    const mock = new MockAdapter(api);
    mock.onGet('/movie/top_rated').reply(200, {
      results: dummyMovies,
    });

    renderWithClient(<TopRatedMovies />);
    // Wait until posters are rendered
    await waitFor(() => {
      // Make sure all posters are rendered
      dummyMovies.forEach((item) => {
        expect(screen.getAllByAltText(item.title!).length).toEqual(2);
      });
    });
  });
});

describe('TopRatedSeries', () => {
  test('Should renders top rated series', async () => {
    // Mocking API response
    const mock = new MockAdapter(api);
    mock.onGet('/tv/top_rated').reply(200, {
      results: dummySeries,
    });

    renderWithClient(<TopRatedSeries />);
    // Wait until posters are rendered
    await waitFor(() => {
      // Make sure all posters are rendered
      dummySeries.forEach((item) => {
        expect(screen.getAllByAltText(item.name!).length).toEqual(2);
      });
    });
  });
});

describe('Watchlist CTA', () => {
  test('Add to watchlist', async () => {
    render(<HomeBanner items={dummyFeatured} />);

    // Add first feature to watchlist
    await fireEvent.click(screen.getAllByTestId('button-add-watchlist')[0]);

    // verify local storage value
    let parsedLocalStorage = JSON.parse(localStorage.getItem(WATCHLIST_KEY)!);
    const storageData = parsedLocalStorage.movie[0];
    expect(storageData[0]).toEqual(dummyFeatured[0].id);
    expect(storageData[1].title).toEqual(dummyFeatured[0].title);

    // Remove first featured from watchlist
    await fireEvent.click(screen.getAllByTestId('button-remove-watchlist')[0]);
    parsedLocalStorage = JSON.parse(localStorage.getItem(WATCHLIST_KEY)!);
    expect(parsedLocalStorage.movie.length).toEqual(0);
  });
});
