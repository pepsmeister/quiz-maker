export const API_CLIENT_URL: string = import.meta.env.VITE_API_URL

const defaultHeaders: Record<string, string> = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`,
}

export const apiFetch = (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const mergedHeaders = {
    ...defaultHeaders,
    ...(options.headers as Record<string, string> | undefined),
  }

  return fetch(url, {
    ...options,
    headers: mergedHeaders,
  })
}
