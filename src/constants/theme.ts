export const colors = {
  black: '#000000',
  brownLight: '#FBF4F4',
  brown: '#B07773',
  brownDark: '#9B504B',
  outline: 'rgba(77, 144, 254, 0.6)',
  red: 'red',
} as const;

/** Source: https://htmlacademy.ru/blog/useful/css/short-14 */
const fallbackFont = [
  '-apple-system',
  "'BlickMacSystemFont'",
  "'Segoe UI'",
  "'Roboto'",
  "'Oxygen'",
  "'Ubuntu'",
  "'Cantarell'",
  "'Fira Sans'",
  "'Droid Sans'",
  "'Helvetica Neue'",
  'sans-serif',
].join(',');

export const fonts = {
  Montserrat: `'Montserrat', ${fallbackFont}`,
};

export const breakpoints = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 414,
  tablet: 1024,
  laptop: 1260,
  desktop: 1500,
};
