import { ServerResponse } from 'http';

export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

export function isResSent(res: ServerResponse): boolean {
  return res.finished || res.headersSent;
}
