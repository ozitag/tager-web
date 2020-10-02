import React from 'react';
import styled from 'styled-components';

import { ModalProps } from '@tager/web-components';

import TextInput from '@/components/TextInput';

import CloseButton from '../shared/CloseButton';
import {
  Container,
  Header,
  HeaderTitle,
  Content,
  Footer,
  FooterButton,
} from '../shared/styles';

type ExampleModalProps = ModalProps<{ title: string }>;

function ExampleModal({ innerProps, closeModal }: ExampleModalProps) {
  const { title } = innerProps;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    closeModal();
  }

  return (
    <Container>
      <form onSubmit={handleSubmit} noValidate>
        <Header>
          <HeaderTitle>{title}</HeaderTitle>
          <CloseButton onClick={closeModal} />
        </Header>

        <Content>
          <Row>
            <InputLabel>Email</InputLabel>
            <TextInput name="email" />
          </Row>
          <Row>
            <InputLabel>Password</InputLabel>
            <TextInput name="password" type="password" />
          </Row>
        </Content>

        <Footer>
          <FooterButton variant="outlined" type="submit">
            Submit
          </FooterButton>
        </Footer>
      </form>
    </Container>
  );
}

const Row = styled.div`
  margin-bottom: 1rem;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

export default ExampleModal;
