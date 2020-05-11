export const colors = {
  black: 'black',
  black100: '#101010',
  black200: '#262626',
  black300: '#3b3b3b',
  gray: '#888888',
  grayDark: '#5f5f5f',
  grayLight: '#999999',
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

/**
 * Reference - Screen Resolution Stats Worldwide:
 * https://gs.statcounter.com/screen-resolution-stats
 *
 * 16px - scrollbar width on Windows,
 * some browsers doesn't include scrollbar width when calculate media queries
 */
export const breakpoints = {
  /** iPhone 5/SE */
  mobileSmall: 320,
  /** iPhone 6/7/8/X */
  mobileMedium: 375,
  /** iPhone 6/7/8 Plus */
  mobileLarge: 414,
  /** iPad 1, 2, Mini and Air */
  tabletSmall: 768,
  tabletLarge: 1024,
  /** 1280 - 16 = 1264 -> 1260 - more beautiful number :) */
  laptop: 1260,
  /** 1536 - 16 = 1520 -> 1500 - more beautiful number :) */
  desktop: 1500,
};
