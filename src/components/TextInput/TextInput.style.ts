import styled, { css } from 'styled-components';

import { colors } from '@constants/theme';

export const Container = styled.div`
  position: relative;
`;

function getBorderColor(
  props: { invalid?: boolean; active?: boolean } = {}
): string {
  return props.invalid ? colors.red : props.active ? colors.brown : '#D3C8C4';
}

export const Input = styled.input<{
  withPrefix?: boolean;
  invalid?: boolean;
}>`
  width: 100%;
  border: 1px solid ${({ invalid }) => getBorderColor({ invalid })};
  font-size: 13px;
  line-height: 24px;
  padding: 7px 13px;
  ${(props) =>
    props.withPrefix
      ? css`
          padding-left: 45px;
        `
      : ''};
  color: ${(props) => (props.invalid ? colors.red : colors.black)};

  &::placeholder {
    color: ${(props) => (props.invalid ? colors.red : '#85726b')};
    opacity: 0.8;
  }

  &:focus {
    border-color: ${({ invalid, readOnly }) =>
      getBorderColor({ invalid, active: !readOnly })};
  }
`;

export const prefixCss = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 16px;
  pointer-events: none;
`;

export const Prefix = styled.svg`
  ${prefixCss};
`;
