import styled, { css } from 'styled-components';

import { colors } from '@constants/theme';
import { CssSnippet } from '@typings/common';

export type ReservedButtonVariant = 'contained' | 'outlined';

export type ButtonVariant = ReservedButtonVariant | CssSnippet;

const variantCssMap: Record<ReservedButtonVariant, CssSnippet> = {
  contained: css`
    background-color: ${colors.brown};
    opacity: 0.95;
    color: white;
    border: 1px solid ${colors.brown};

    &:hover {
      background-color: ${colors.brownDark};
    }
  `,
  outlined: css`
    background-color: white;
    color: ${colors.brown};
    border: 1px solid ${colors.brown};

    &:hover {
      background-color: ${colors.brown};
      opacity: 0.95;
      color: white;
    }
  `,
};

export const StyledButton = styled.button<{ variant?: ButtonVariant }>`
  font-size: 14px;
  line-height: 18px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-align: center;
  text-transform: uppercase;
  padding: 10px;
  text-decoration: none;

  ${props =>
    typeof props.variant === 'string'
      ? variantCssMap[props.variant]
      : props.variant};
`;
