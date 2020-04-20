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

  const media =
    min && max
      ? `@media (min-width: ${min}px) and (max-width: ${max}px)`
      : min && !max
      ? `@media (min-width: ${min}px)`
      : !min && max
      ? `@media (max-width: ${max}px)`
      : null;
  return (styles) => css`
    ${media} {
      ${styles};
    }
  `;
}

export const media = {
  mobile: createMediaMixin({
    max: breakpoints.tablet - 1,
  }),
  tablet: createMediaMixin({
    min: breakpoints.tablet,
    max: breakpoints.laptop - 1,
  }),
  laptop: createMediaMixin({
    min: breakpoints.laptop,
    max: breakpoints.desktop - 1,
  }),
  desktop: createMediaMixin({
    min: breakpoints.desktop,
  }),
};

export const outlineShadow = `0 0 0 1.5px ${colors.outline}`;
export const getOutlineShadow = (color: string = colors.outline) =>
  `0 0 0 1.5px ${color}`;

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
