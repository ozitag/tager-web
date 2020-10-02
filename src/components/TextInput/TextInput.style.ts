import styled, { css } from 'styled-components';

import { colors } from '@/constants/theme';

export const Container = styled.div`
  position: relative;
`;

function getBorderColor(
  props: { invalid?: boolean; active?: boolean } = {}
): string {
  return props.invalid ? colors.red : props.active ? '#80bdff' : '#ced4da';
}

export const Input = styled.input<{
  withPrefix?: boolean;
  invalid?: boolean;
}>`
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #24292e;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid ${(props) => getBorderColor({ invalid: props.invalid })};
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  ${(props) =>
    props.withPrefix
      ? css`
          padding-left: 45px;
        `
      : ''};

  // Placeholder
  &::placeholder {
    color: ${(props) => (props.invalid ? colors.red : '#6c757d')};
    // Override Firefox's unusual default opacity; see https://github.com/twbs/bootstrap/pull/11526.
    opacity: 1;
  }

  // Disabled and read-only inputs
  //
  // HTML5 says that controls under a fieldset > legend:first-child won't be
  // disabled if the fieldset is disabled. Due to implementation difficulty, we
  // don't honor that edge case; we style them as disabled anyway.
  &:disabled,
  &[readonly] {
    background-color: #e9ecef;
    // iOS fix for unreadable disabled content; see https://github.com/twbs/bootstrap/issues/11655.
    opacity: 1;
  }

  &:not([readonly]):focus {
    color: #24292e;
    background-color: #fff;
    border-color: ${(props) =>
      getBorderColor({ invalid: props.invalid, active: !props.readOnly })};
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
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
