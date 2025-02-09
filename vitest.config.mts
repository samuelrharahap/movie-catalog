import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

dotenv.config({ path: '.env.test' });

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: [
        'utils/',
        'components/',
        'hooks/',
        'lib/',
        'app/search/page.tsx',
        'app/watchlist/page.tsx',
      ],
    },
  },
});
