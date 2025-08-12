import type { AxiosError } from 'axios';

export const isAxiosError = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any,
): error is AxiosError<{ error?: { code?: number; message?: string } }> => {
  return error?.name === 'AxiosError';
};
