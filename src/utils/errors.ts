import axios from 'axios';

/**
 * True when the request never reached the server (CORS block, DNS failure,
 * timeout, backend down) — axios exposes this as an error with no
 * `response` at all. Treat this differently from a real 4xx/5xx: it means
 * "we couldn't check," not "the server said no."
 */
export function isNetworkError(err: unknown): boolean {
  return axios.isAxiosError(err) && !err.response;
}

/** True when the server responded 401 (bad credentials / expired session). */
export function isAuthError(err: unknown): boolean {
  return axios.isAxiosError(err) && err.response?.status === 401;
}

/** True when the server responded 429 (rate limited). */
export function isRateLimitError(err: unknown): boolean {
  return axios.isAxiosError(err) && err.response?.status === 429;
}
