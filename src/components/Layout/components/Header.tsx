import React from 'react';
import styled from 'styled-components';

import { ReactComponent as Logo } from '@assets/svg/logo.svg';
import { ReactComponent as LoginIcon } from '@assets/svg/login.svg';
import ContentContainer from '@components/ContentContainer';
import { buttonReset, colors } from '@constants/theme';
import Link from '@components/Link';

import SearchInput from './SearchInput';

function Header() {
  return (
    <HeaderContainer>
      <Top>
        <ContentContainer>
          <TopInner>
            <Link to="/">
              <Logo />
            </Link>
            <SearchInput />
            <LoginButton>
              <LoginIcon />
              Войти
            </LoginButton>
          </TopInner>
        </ContentContainer>
      </Top>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  flex: 0;
`;

const Top = styled.div`
  padding: 36px 0;
  border-bottom: 1px solid #e4e4e4;
`;

const TopInner = styled.div`
  position: relative;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LoginButton = styled.button`
  ${buttonReset};
  display: inline-flex;
  align-items: center;

  svg {
    display: block;
    margin-right: 5px;
    fill: #ee5522;
  }

  &:hover,
  &:focus,
  &:active {
    color: ${colors.orange};
  }
`;

export default Header;
