import { dummyMovies, dummySeries } from '@/__tests__/mock/data';
import SearchPage from '@/app/search/page';
import api from '@/lib/axiosInstance';
import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { afterEach, describe, expect, test } from 'vitest';

import { createTestQueryClient, renderWithClient } from '@/utils/test';

afterEach(() => {
  createTestQueryClient().clear();
  cleanup();
});

describe('SearchPage', () => {
  test('Should render search results', async () => {
    // Mocking API response
    const mock = new MockAdapter(api);
    mock.onGet('/trending/all/day').reply(200, {
      results: dummyMovies,
    });
    mock.onGet('/search/movie?query=keyword').reply(200, {
      results: dummyMovies,
    });
    mock.onGet('/search/tv?query=keyword').reply(200, {
      results: dummySeries,
    });

    renderWithClient(<SearchPage />);

    // Check recommendation content is rendered
    await waitFor(() => {
      expect(screen.getByText('Popular Searches')).toBeTruthy();
      expect(screen.getAllByAltText(dummyMovies[0].title).length).toEqual(2);
    });

    // Search for a keyword
    await waitFor(() => {
      fireEvent.change(screen.getByPlaceholderText('Search'), {
        target: { value: 'keyword' },
      });
    });

    // Check search results are rendered
    await waitFor(() => {
      expect(screen.queryByText('Popular Searches')).not.toBeTruthy();
      expect(screen.getAllByAltText(dummyMovies[0].title).length).toEqual(2);
      expect(screen.getAllByAltText(dummySeries[0].name).length).toEqual(2);
    });
  });
});
