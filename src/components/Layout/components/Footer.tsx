import React from 'react';
import styled from 'styled-components';
import { buttonReset, linkCss } from '@constants/theme';
import ContentContainer from '@components/ContentContainer';
import Link from '@components/Link';

function Footer() {
  return (
    <FooterContainer>
      <ContentContainer>
        <Inner>
          <ArticleButton>Написать статью</ArticleButton>
          <FooterNav>
            <NavList>
              <NavItem>
                <NavLink to="/about">О проекте</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/about">Стать автором</NavLink>
              </NavItem>
            </NavList>
          </FooterNav>

          <CopyRight>© 2018–2020 Answr</CopyRight>
        </Inner>
      </ContentContainer>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  flex: 0;
  padding: 21px 0 33px 0;
  background-color: #f9f9f9;
  border-top: 1px solid #ddd;
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
`;

const ArticleButton = styled.button`
  ${buttonReset};

  display: inline-block;
  padding: 5px 15px;
  background-color: #39e;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  line-height: 26px;
  border-radius: 3px;

  &:hover {
    background-color: #36a4ff;
  }

  &:active {
    background-color: #2e8cd9;
  }
`;

const FooterNav = styled.nav`
  margin-left: 70px;
`;

const NavList = styled.ul`
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  list-style: none;
  display: inline-block;
  margin-right: 50px;
  font-size: 13px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 500;
`;

const NavLink = styled(Link)`
  ${linkCss}
`;

const CopyRight = styled.span`
  font-size: 16px;
  margin-left: auto;
`;

export default Footer;
