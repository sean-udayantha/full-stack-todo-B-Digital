interface ApiErrorPayload {
  error?: { message?: string; fields?: Record<string, string> };
}

export function getApiError(error: unknown): { message: string; fields?: Record<string, string> } {
  if (typeof error === 'object' && error !== null && 'status' in error) {
    if (error.status === 'FETCH_ERROR' || error.status === 'TIMEOUT_ERROR') {
      return { message: 'We couldn’t reach your tasks. Check your connection and try again.' };
    }
    if ('data' in error) {
      const data = error.data as ApiErrorPayload | null;
      if (typeof data?.error?.message === 'string') {
        return { message: data.error.message, fields: data.error.fields };
      }
    }
  }
  return { message: 'Something went wrong. Please try again.' };
}
