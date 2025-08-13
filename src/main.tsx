import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useErrorStore } from './stores/errorStore';
import { isAxiosError, type AxiosError } from 'axios';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: Error | AxiosError) => {
        if (isAxiosError(error)) {
          const errorStatus = error.status || 500;
          // Dont retry on client errors
          if (errorStatus >= 400 && errorStatus < 500) {
            useErrorStore.getState().handleError(error);
            return false;
          } else {
            if (failureCount === 3) {
              useErrorStore.getState().handleError(error); // Handle errors on last retry
            }
            return failureCount < 3;
          }
        }
        if (failureCount === 3) {
          useErrorStore.getState().handleError(error);
        }
        return failureCount < 3;
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
