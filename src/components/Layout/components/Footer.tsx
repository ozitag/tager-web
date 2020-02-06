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
  flex: 0;
`;

export default Footer;
