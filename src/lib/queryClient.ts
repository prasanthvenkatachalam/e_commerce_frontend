// src/lib/queryClient.ts
import { QueryClient } from 'react-query';

/**
 * A simple and lightweight React Query client initialization
 * Used for configuring React Query's global settings
 * Includes:
 * - Default cache time
 * - Default stale time
 * - Retry configuration
 * - Error handling
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
        /**
         * Default cache time before a query is considered stale
         * Useful for reducing frequent refetching on mount or focus
         */
      cacheTime: 1000 * 60 * 5, // 5 minutes
      /**
       * Default stale time before a query should be considered stale
       * Useful to prevent stale data from being shown to the user
       */
      staleTime: 1000 * 60,   // 1 minute
      /**
       *  Default retry on error settings
       * Useful when network connectivity is an issue
       */
       retry: 3,
      /**
       *  Default error handling settings
        *  Here you can implement logging, and notification logic when requests fail
        */
       onError: (error) => {
          console.error("Error during request", error);
       },
    },
  },
});

export default queryClient;