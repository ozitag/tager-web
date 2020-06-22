export function isPreloaderEnabled() {
  const preloaderState = process.env.NEXT_PUBLIC_SPLASHSCREEN_ENABLED;

  return (
    preloaderState &&
    preloaderState.toLowerCase() !== 'false' &&
    preloaderState !== '0'
  );
}
