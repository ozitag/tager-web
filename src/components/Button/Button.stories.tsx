import React from 'react';
import styled from 'styled-components';

import Button from './Button';

export default {
  component: Button,
  title: 'Button',
};

const Container = styled.div`
  width: 240px;
  padding: 10px;

  button {
    width: 100%;
  }
`;

export const contained = () => (
  <Container>
    <Button variant="contained">Сохранить</Button>
  </Container>
);

export const outlined = () => (
  <Container>
    <Button variant="outlined">Удалить</Button>
  </Container>
);
