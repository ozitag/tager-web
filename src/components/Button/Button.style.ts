import styled, { css } from 'styled-components';

import { CssSnippet } from '@tager/web-components';

export type ReservedButtonVariant = 'contained' | 'outlined';

export type ButtonVariant = ReservedButtonVariant | CssSnippet;

const variantCssMap: Record<ReservedButtonVariant, CssSnippet> = {
  contained: css`
    background-color: #24292e;
    opacity: 0.95;
    color: white;
    border: 1px solid #24292e;

    &:hover {
      background-color: black;
    }
  `,
  outlined: css`
    background-color: white;
    color: #24292e;
    border: 1px solid #24292e;

    &:hover {
      background-color: #24292e;
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
  transition: background-color 0.1s;
  border-radius: 3px;

  ${(props) =>
    typeof props.variant === 'string'
      ? variantCssMap[props.variant]
      : props.variant};
`;
