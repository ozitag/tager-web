import React from 'react';
import styled from 'styled-components';

import { ReactComponent as NextLogo } from '@assets/svg/nextjs-logo.svg';

function Home() {
  return (
    <Wrapper>
      <NextLogo />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex: 1;
  background-image: radial-gradient(#d7d7d7 1px, transparent 1px),
    radial-gradient(#d7d7d7 1px, transparent 1px);
  background-position: 0 0, 25px 25px;
  background-size: 50px 50px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Home;
