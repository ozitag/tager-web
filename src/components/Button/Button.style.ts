import styled, { css } from 'styled-components';

import { CssSnippet } from '@/typings/common';

export type ReservedButtonVariant = 'contained' | 'outlined';

export type ButtonVariant = ReservedButtonVariant | CssSnippet;

const variantCssMap: Record<ReservedButtonVariant, CssSnippet> = {
  contained: css`
    background-color: gray;
    opacity: 0.95;
    color: white;
    border: 1px solid gray;

    &:hover {
      background-color: black;
    }
  `,
  outlined: css`
    background-color: white;
    color: gray;
    border: 1px solid gray;

    &:hover {
      background-color: gray;
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

  ${(props) =>
    typeof props.variant === 'string'
      ? variantCssMap[props.variant]
      : props.variant};
`;
