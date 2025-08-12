import { create } from 'zustand';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';
import { isAxiosError } from '@/lib/isAxiosError';

interface ErrorStore {
  handleError: (error: Error | AxiosError) => void;
}

const getErrorType = (error: Error | AxiosError): string => {
  if (isAxiosError(error)) {
    const errorCode = error.response?.data?.error?.code;

    // API key related errors
    if (errorCode === 1002 || errorCode === 2006) return 'API_KEY_MISSING';

    // Quota and access errors
    if (errorCode === 2007) return 'QUOTA_EXCEEDED';
    if (errorCode === 2008) return 'API_KEY_DISABLED';
    if (errorCode === 2009) return 'ACCESS_DENIED';

    // Fallback to status codes
    const errorStatus = error.response?.status || error.status;
    if (errorStatus === 401) return 'API_KEY_MISSING';
    if (errorStatus === 403) return 'ACCESS_DENIED';
    if (errorStatus === 429) return 'RATE_LIMIT';
  }

  if (!navigator.onLine) return 'NETWORK_ERROR';
  return 'UNKNOWN';
};

const getErrorMessage = (error: Error | AxiosError): string => {
  if (isAxiosError(error)) {
    return error.response?.data?.error?.message || error?.message || 'An unexpected error occurred';
  }
  return error.message || 'An unexpected error occurred';
};

export const useErrorStore = create<ErrorStore>(() => ({
  handleError: (error: Error | AxiosError) => {
    const errorType = getErrorType(error);

    switch (errorType) {
      case 'API_KEY_MISSING':
        toast.error('API Key Error', {
          description: 'API key is missing or invalid. Please check your configuration.',
        });
        break;
      case 'QUOTA_EXCEEDED':
        toast.error('Quota Exceeded', {
          description: 'API key has exceeded monthly quota. Please upgrade your plan.',
        });
        break;
      case 'API_KEY_DISABLED':
        toast.error('API Key Disabled', {
          description: 'Your API key has been disabled. Please contact support.',
        });
        break;
      case 'ACCESS_DENIED':
        toast.error('Access Denied', {
          description:
            'API key does not have access to this resource. Check your subscription plan.',
        });
        break;
      case 'NETWORK_ERROR':
        toast.error('Connection Error', {
          description: 'Please check your internet connection.',
        });
        break;
      case 'RATE_LIMIT':
        toast.error('Rate Limit Exceeded', {
          description: 'Too many requests. Please try again later.',
        });
        break;
      default:
        toast.error('Error', {
          description: getErrorMessage(error),
        });
    }
  },
}));
