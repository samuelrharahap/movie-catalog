'use client';

import { useState } from 'react';

import queryClient from '@/lib/reactQueryClient';
import { QueryClientProvider } from '@tanstack/react-query';

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => queryClient);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
