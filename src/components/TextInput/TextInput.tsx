import React from 'react';

import * as S from './TextInput.style';

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> & {
  className?: string;
  prefix?: React.ElementType | React.ReactElement;
  invalid?: boolean;
};

export type InputRef = HTMLInputElement;

function TextInput(
  { className, prefix, disabled, invalid, ...rest }: Props,
  ref: React.Ref<InputRef>
) {
  function renderPrefix() {
    if (!prefix) return null;
    if (React.isValidElement(prefix)) return prefix;
    return <S.Prefix as={prefix} />;
  }

  return (
    <S.Container className={className}>
      {renderPrefix()}
      <S.Input
        ref={ref}
        {...rest}
        withPrefix={Boolean(prefix)}
        disabled={disabled}
        invalid={invalid}
      />
    </S.Container>
  );
}

export default React.forwardRef<InputRef, Props>(TextInput);
