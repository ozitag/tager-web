import { css, keyframes } from 'styled-components';

export const colors = {
  black: '#000000',
  brownLight: '#FBF4F4',
  brown: '#B07773',
  outline: 'rgba(77, 144, 254, 0.6)',
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

export const outlineShadow = `0 0 0 1.5px ${colors.outline}`;
export const getOutlineShadow = (color: string = colors.outline) =>
  `0 0 0 1.5px ${color}`;

export const buttonReset = css<{ disabled?: boolean }>`
  border: 0;
  margin: 0;
  padding: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  line-height: normal;
  outline: none;
  border-radius: 4px;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};

  &:disabled {
    cursor: default;
  }
`;

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
  value: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down',
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
