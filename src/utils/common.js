export function isBrowser() {
  return typeof window !== 'undefined';
}

export function isResSent(res) {
  return res.finished || res.headersSent;
}
