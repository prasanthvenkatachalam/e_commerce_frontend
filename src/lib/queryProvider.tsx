 // src/lib/queryProvider.tsx
 'use client';

import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import queryClient from './queryClient';

/**
 *  Provides React Query context to the application
 *  Wraps all child components in React Query Provider
 *  Ensures all hooks can access the state management features of react query
 */
export function QueryProvider({ children }: PropsWithChildren) {
   return (
      <QueryClientProvider client={queryClient}>
          {children}
      </QueryClientProvider>
      );
   }
