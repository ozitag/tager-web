import React from 'react';
import styled from 'styled-components';

import { colors } from '@constants/theme';

type Props = {
  className?: string;
  error?: string;
  children: React.ReactNode;
};

function FormControl({ className, error, children }: Props) {
  return (
    <div className={className}>
      {children}
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
    </div>
  );
}

const ErrorMessage = styled.span`
  display: block;
  font-size: 11px;
  line-height: 15px;
  color: ${colors.red};
  text-align: right;
  margin-top: 8px;
`;

export default FormControl;
