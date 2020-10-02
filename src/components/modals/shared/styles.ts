import styled from 'styled-components';

import Button from '@/components/Button';

export const Container = styled.div`
  max-width: 600px;
  width: 100%;

  background-color: #ffffff;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
`;

export const Header = styled.header`
  height: 60px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 0 20px;
`;

export const HeaderTitle = styled.span`
  font-weight: 600;
  font-size: 16px;
  line-height: 28px;

  flex-grow: 1;
`;

export const Content = styled.div`
  padding: 20px;
  position: relative;
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
  border-top: 1px solid #ccc;
`;

export const FooterButton = styled(Button)`
  margin-left: 20px;
  height: 40px;
  width: 100px;
`;
