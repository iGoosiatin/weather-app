import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';

import { QueryClient, QueryClientProvider, QueryCache } from '@tanstack/react-query';
import { useErrorStore } from './stores/errorStore';
import { isAxiosError, type AxiosError } from 'axios';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: Error | AxiosError) => {
        if (isAxiosError(error)) {
          if (error.status && error.status >= 401) {
            return false;
          }
        }
        // Default retry logic (3 times)
        return failureCount < 3;
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      useErrorStore.getState().handleError(error);
    },
  }),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
