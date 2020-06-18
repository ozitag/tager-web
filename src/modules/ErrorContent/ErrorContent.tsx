import React from 'react';
import styled from 'styled-components';

type Props = {
  statusCode?: number;
  message?: string;
};

function ErrorContent({ statusCode, message }: Props) {
  return (
    <Container>
      {statusCode ? <StatusCode>{statusCode}</StatusCode> : null}
      {message ? <Message>{message.replace(/\.$/, '')}</Message> : null}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding-bottom: 35px;
  text-align: center;
  text-transform: uppercase;
  color: #262626;
`;

const StatusCode = styled.span`
  display: inline-block;
  max-width: 100%;
  margin-bottom: 15px;
  font-size: 250px;
  font-weight: 900;
  line-height: 1;
`;

const Message = styled.span`
  display: inline-block;
  max-width: 100%;
  font-size: 25px;
  text-transform: uppercase;
  color: #000;
`;

export default ErrorContent;
