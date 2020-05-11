import { css, keyframes } from 'styled-components';
import { breakpoints, colors } from '@constants/theme';

import { CssSnippet } from '@typings/common';

function createMediaMixin({
  min,
  max,
}: {
  min?: number;
  max?: number;
}): (snippet: CssSnippet) => CssSnippet {
  if (!min && !max && process.env.NODE_ENV === 'development') {
    throw new Error(
      'You didn\'t specify "min" or "max" width for @media mixin'
    );
  }

  /**
   * Note that since browsers do not currently support range context queries,
   * we work around the limitations of min- and max- prefixes and viewports with fractional widths
   * (which can occur under certain conditions on high-dpi devices, for instance)
   * by using values with higher precision for these comparisons (e.g. 767.98px).
   *
   * Reference: "Bootstrap: Responsive breakpoints"
   * https://getbootstrap.com/docs/4.4/layout/overview/#responsive-breakpoints
   *
   * Reference: "Using “min-” and “max-” Prefixes On Range Features"
   * https://www.w3.org/TR/mediaqueries-4/#mq-min-max
   */
  const media =
    min && max
      ? `@media (min-width: ${min}px) and (max-width: ${max - 0.02}px)`
      : min && !max
      ? `@media (min-width: ${min}px)`
      : !min && max
      ? `@media (max-width: ${max - 0.02}px)`
      : null;
  return (styles) => css`
    ${media} {
      ${styles};
    }
  `;
}

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

export const visuallyHidden = css`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  position: absolute;
`;

/**
 * Polyfill for "object-fit" CSS property
 * Source: https://github.com/fregante/object-fit-images#usage
 */
export function objectFit(
  value: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
) {
  return css`
    object-fit: ${value};
    font-family: 'object-fit: ${value};';
  `;
}

export const placeholderAnimation = keyframes`
0% {
  background-position: -1200px 0;
}
100% {
  background-position: 1200px 0;
}
`;

export const placeholderAnimationCss = css`
  animation: ${placeholderAnimation} 2s linear;
  animation-iteration-count: infinite;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.08) 0,
    rgba(0, 0, 0, 0.15) 15%,
    rgba(0, 0, 0, 0.08) 30%
  );
  background-size: 1200px 100%;
`;
