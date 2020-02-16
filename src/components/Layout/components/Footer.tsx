import React from 'react';
import styled from 'styled-components';

import ContentContainer from '@components/ContentContainer';

function Footer() {
  return (
    <FooterContainer>
      <ContentContainer></ContentContainer>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  flex: 0 0 80px;
  border-top: 1px solid #d7d7d7;
`;

export default Footer;
