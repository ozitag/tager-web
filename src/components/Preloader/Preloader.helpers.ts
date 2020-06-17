export function isPreloaderEnabled() {
  const preloaderState = process.env.REACT_APP_SPLASHSCREEN_ENABLED;

  return (
    preloaderState &&
    preloaderState.toLowerCase() !== 'false' &&
    preloaderState !== '0'
  );
}
