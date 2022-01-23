import React from 'react';
import styled from 'styled-components';

import CloseIcon from '@/assets/svg/close.svg';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

function CloseButton(props: Props) {
  return (
    <StyledButton {...props}>
      <CloseIcon />
    </StyledButton>
  );
}

const StyledButton = styled.button`
  margin-left: auto;
  border-radius: 50%;
  transition: background-color 0.1s;
  padding: 0.5rem;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  svg {
    display: block;
    fill: currentColor;
  }
`;
export default CloseButton;
