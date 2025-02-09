import { dummyLocalStorage } from '@/__tests__/mock/data';
import WatchlistPage from '@/app/watchlist/page';
import { WATCHLIST_KEY } from '@/store/watchlistStore';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';

afterEach(() => {
  cleanup();
});

describe('Watchlist', () => {
  test('Should render watchlist page', async () => {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(dummyLocalStorage));
    render(<WatchlistPage />);

    // Check page header is rendered
    expect(screen.getByText('Watchlist')).toBeTruthy();

    // Check watchlist rendered
    const movie = dummyLocalStorage.movie[0][1];
    if (typeof movie !== 'number') {
      expect(screen.getAllByAltText(movie.title).length).toEqual(2);
    }
    const series = dummyLocalStorage.tv[0][1];
    if (typeof series !== 'number') {
      expect(screen.getAllByAltText(series.name).length).toEqual(2);
    }

    // Bulk remove watchlist
    const removeButtons = screen.getAllByText('Add to Remove');
    await fireEvent.click(removeButtons[0]);
    await fireEvent.click(removeButtons[1]);
    await fireEvent.click(screen.getByText('Confirm remove (2) watchlist'));

    // Check watchlist removed
    if (typeof movie !== 'number') {
      expect(screen.queryByAltText(movie.title)).toBeFalsy();
    }
    if (typeof series !== 'number') {
      expect(screen.queryByAltText(series.name)).toBeFalsy();
    }
  });
});
