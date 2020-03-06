import React from 'react';

import * as S from './Button.style';
import { ButtonVariant } from './Button.style';

type CommonProps = {
  variant?: ButtonVariant;
  as?: React.ElementType;
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & CommonProps;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { type = 'button', ...rest }: ButtonProps,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    return <S.StyledButton ref={ref} type={type} {...rest} />;
  },
);

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & CommonProps;

export const ButtonLink = React.forwardRef<HTMLAnchorElement, AnchorProps>(
  (props, ref) => {
    return <S.StyledButton as="a" ref={ref} {...props} />;
  },
);

export default Button;
