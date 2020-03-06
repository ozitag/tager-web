import React from 'react';
import styled from 'styled-components';

import TextInput from './TextInput';

export default {
  component: TextInput,
  title: 'Text Input',
};

const Container = styled.div`
  width: 240px;
  padding: 10px;
`;

export const defaultVariant = () => (
  <Container>
    <TextInput placeholder="Placeholder text..." />
  </Container>
);

defaultVariant.story = {
  name: 'default',
};

export const invalid = () => (
  <Container>
    <TextInput invalid={true} value="Error" />
  </Container>
);
