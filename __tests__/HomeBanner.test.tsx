import { featuredContent } from '@/__tests__/mock/data';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import HomeBanner from '@/components/HomeBannerClient';

import { getYearFromDate } from '@/utils/date';
import { formatNumber, toFixed } from '@/utils/number';

describe('HomeBanner', () => {
  test('Should renders feature titles', async () => {
    render(<HomeBanner items={featuredContent} />);

    featuredContent.forEach((item) => {
      // Make sure all feature titles are rendered
      const title = item.title || item.name || 'Untitled';
      expect(screen.getByText(title)).toBeTruthy();

      // Make sure all feature images are rendered (1 for main image, 1 for thumbnail)
      const images = screen.getAllByAltText(title);
      expect(images.length).toEqual(2);

      // Make sure all feature descriptions are rendered
      expect(screen.getByText(item.overview)).toBeTruthy();

      // Make sure year is rendered
      expect(
        screen.getByText(getYearFromDate(item.release_date || item.first_air_date || ''))
      ).toBeTruthy();

      // Make sure rating is rendered
      expect(
        screen.getByText(`${toFixed(item.vote_average)} (${formatNumber(item.vote_count)} users)`)
      ).toBeTruthy();
    });

    // Make sure first feature is active
    const firstFeature = featuredContent[0];
    const firstFeatureTitle = firstFeature.title || firstFeature.name || 'Untitled';
    expect(screen.getByText(firstFeatureTitle).closest('li')?.classList).toContain('active');

    // Make sure second feature is not active
    const secondFeature = featuredContent[1];
    const secondFeatureTitle = secondFeature.title || secondFeature.name || 'Untitled';
    expect(screen.getByText(secondFeatureTitle).closest('li')?.classList).not.toContain('active');
    // Clicking second feature thumbnail
    await screen.getAllByAltText(secondFeatureTitle)[1].click();

    // Make sure first feature is not active
    expect(screen.getByText(firstFeatureTitle).closest('li')?.classList).not.toContain('active');
    // Make sure second feature is active
    expect(screen.getByText(secondFeatureTitle).closest('li')?.classList).toContain('active');
  });
});
