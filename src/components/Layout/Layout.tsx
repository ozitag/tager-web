import React from 'react';
import styled from 'styled-components';

import { Preloader } from '@tager/web-components';

import Header from './components/Header';
import Footer from './components/Footer';

type Props = {
  children?: React.ReactNode;
  isPreloaderHidden?: boolean;
};

function Layout({ children, isPreloaderHidden }: Props) {
  return (
    <Container>
      <Preloader hidden={isPreloaderHidden} />

      <Header />
      <Main>{children}</Main>
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  background-color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Main = styled.main`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
`;

export default Layout;
