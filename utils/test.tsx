import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RenderResult, render } from '@testing-library/react';

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
}

export function renderWithClient(ui: React.ReactElement): RenderResult {
  const testQueryClient = createTestQueryClient();

  return render(<QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>);
}
