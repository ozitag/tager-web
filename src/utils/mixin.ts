import { createMediaMixin } from '@tager/web-components';

import { breakpoints } from '@/constants/theme';

/**
 * Reference: https://get.foundation/sites/docs/media-queries.html#working-with-media-queries
 *
 * Media queries name convention: {breakpoint + modifier}
 * Modifiers: "up" | "only" | "down" (default)
 * "down" is default modifier, because we use desktop-first approach
 *
 * Examples:
 *
 * "tablet", "tabletDown" - tablet or smaller
 * "tabletOnly" - only tablet
 * "tabletUp" - tablet or larger
 */
export const media = {
  mobileSmall: createMediaMixin({
    max: breakpoints.mobileMedium,
  }),
  mobileMedium: createMediaMixin({
    max: breakpoints.mobileLarge,
  }),
  mobileMediumOnly: createMediaMixin({
    min: breakpoints.mobileSmall,
    max: breakpoints.mobileLarge,
  }),
  mobileLarge: createMediaMixin({
    max: breakpoints.tabletSmall,
  }),
  mobileLargeOnly: createMediaMixin({
    min: breakpoints.mobileLarge,
    max: breakpoints.tabletSmall,
  }),
  mobile: createMediaMixin({
    max: breakpoints.tabletSmall,
  }),
  tabletSmall: createMediaMixin({
    max: breakpoints.tabletLarge,
  }),
  tabletSmallOnly: createMediaMixin({
    min: breakpoints.tabletSmall,
    max: breakpoints.tabletLarge,
  }),
  tabletLarge: createMediaMixin({
    max: breakpoints.laptop,
  }),
  tabletLargeOnly: createMediaMixin({
    min: breakpoints.tabletLarge,
    max: breakpoints.laptop,
  }),
  tablet: createMediaMixin({
    max: breakpoints.laptop,
  }),
  tabletOnly: createMediaMixin({
    min: breakpoints.tabletSmall,
    max: breakpoints.laptop,
  }),
  laptop: createMediaMixin({
    max: breakpoints.desktop,
  }),
  laptopOnly: createMediaMixin({
    min: breakpoints.laptop,
    max: breakpoints.desktop,
  }),
  desktopOnly: createMediaMixin({
    min: breakpoints.desktop,
  }),
};
