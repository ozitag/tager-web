import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import { generateNumberArray } from '@utils/common';
import { loadingPlaceholder, media } from '@utils/mixin';

import {
  getSentryIssueById,
  SentryIssueResponse,
  getSentryFailureMessage,
} from '@services/sentry';

type Props = {
  errorId?: string;
  errorCode: number;
  errorName: string;
};

function ErrorDevelop({ errorId, errorCode, errorName }: Props) {
  const [fetchingState, setFetchingState] = useState<{
    isLoading: boolean;
    error: string | null;
  }>({
    isLoading: !!errorId,
    error: null,
  });

  const { isLoading, error } = fetchingState;

  const errorDetailsRef = useRef<SentryIssueResponse | null>(null);
  const errorDetailsCurrent = errorDetailsRef.current;

  const callStackLength = errorDetailsCurrent?.stacktrace.length;
  const [isCallStackCollapse, setCallStackCollapse] = useState(true);
  const callStackAvailableLength = !isCallStackCollapse ? callStackLength : 3;

  function expandCallStack() {
    setCallStackCollapse(false);
  }

  useEffect(() => {
    if (!errorId || errorDetailsRef.current) return;

    getSentryIssueById(errorId)
      .then((response) => {
        errorDetailsRef.current = response;

        setFetchingState({
          ...fetchingState,
          isLoading: false,
        });
      })
      .catch((error) => {
        const { code, text } = error.status;
        const message = getSentryFailureMessage(code, text);

        setFetchingState({
          error: message,
          isLoading: false,
        });
      });
  }, [errorId, fetchingState]);

  let title, sentryUrl, file, stacktrace;

  if (errorDetailsCurrent) {
    file = errorDetailsCurrent.file;
    title = errorDetailsCurrent.title;
    sentryUrl = errorDetailsCurrent.sentryUrl;
    stacktrace = errorDetailsCurrent.stacktrace;
  }

  return (
    <Container>
      <Inner>
        <Card>
          <CardInner>
            <Block>
              <ErrorName>
                {!isLoading
                  ? `${errorCode} - ${errorName}`
                  : `Loading error details...`}
              </ErrorName>
              {isLoading || title || error ? (
                <ErrorMessage isLoading={isLoading}>
                  {title ?? error}
                </ErrorMessage>
              ) : null}
              {!isLoading && !errorDetailsCurrent && errorId ? (
                <ErrorID>Error ID: {errorId}</ErrorID>
              ) : null}
              {sentryUrl ? (
                <GetDetailsLink href={sentryUrl} target="_blank">
                  Get more information
                </GetDetailsLink>
              ) : null}
            </Block>
            {isLoading || file ? (
              <Block>
                <Title isLoading={isLoading}>Source</Title>
                <SourceCode isLoading={isLoading}>
                  <File>{file}</File>
                </SourceCode>
              </Block>
            ) : null}
            {isLoading || stacktrace ? (
              <Block>
                <Title isLoading={isLoading}>Call Stack</Title>
                {stacktrace ? (
                  <CallStack>
                    {stacktrace
                      .slice(0, callStackAvailableLength)
                      .map((item, index) => (
                        <CallStackItem key={index} isLoading={isLoading}>
                          <CallStackFile>{item.file}</CallStackFile>
                          <CallStackCode>{item.code[1]}</CallStackCode>
                        </CallStackItem>
                      ))}
                    {isCallStackCollapse && stacktrace.length > 3 ? (
                      <CallStackButton onClick={expandCallStack}>
                        Show collapsed frames
                      </CallStackButton>
                    ) : null}
                  </CallStack>
                ) : (
                  <CallStack>
                    {generateNumberArray(3).map((item, index) => (
                      <CallStackItem key={index} isLoading={isLoading} />
                    ))}
                  </CallStack>
                )}
              </Block>
            ) : null}
          </CardInner>
        </Card>
      </Inner>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  color: #262626;
  background-color: rgb(180, 180, 180);
`;

const Inner = styled.div`
  width: 100%;
  max-width: 720px;
`;

const Card = styled.div`
  width: 100%;
  max-width: calc(100% - 20px);
  max-height: calc(100vh - 20px);
  margin: 0 auto;
  border-top: 5px solid #ff5555;
  border-radius: 5px;
  font-size: 16px;
  line-height: 24px;
  background-color: #fff;
  overflow-y: auto;
  box-shadow: 0 5px 25px 1px rgba(0, 0, 0, 0.25);
`;

const CardInner = styled.div`
  padding: 35px 30px;

  ${media.mobile(css`
    padding: 35px 15px;
  `)}
`;

const preloader = css`
  ${loadingPlaceholder};
  min-height: 24px;
  border-radius: 5px;
`;

const ErrorName = styled.span`
  position: relative;
  display: block;
  font-size: 24px;
  font-weight: 700;
`;

const ErrorID = styled.span`
  position: relative;
  display: block;
  margin-top: 10px;
  word-break: break-all;
  color: #999999;
`;

const ErrorMessage = styled.span<{ isLoading: boolean }>`
  position: relative;
  display: block;
  margin-top: 10px;
  color: #ff5555;

  ${({ isLoading }) =>
    isLoading &&
    css`
      ${preloader};
      max-width: 500px;
    `}
`;

const GetDetailsLink = styled.a`
  display: inline-block;
  margin-top: 5px;
  text-decoration: underline;
  color: #5566ff;
`;

const Block = styled.div`
  &:not(:last-child) {
    margin-bottom: 30px;
  }
`;

const Title = styled.span<{ isLoading: boolean }>`
  display: block;
  font-size: 24px;

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  ${({ isLoading }) =>
    isLoading &&
    css`
      ${preloader};
      max-width: 350px;
    `}
`;

const SourceCode = styled.code<{ isLoading: boolean }>`
  display: block;
  padding: 15px 25px;
  border-radius: 5px;
  background-color: #000;

  ${media.mobile(css`
    padding: 15px;
  `)}

  ${({ isLoading }) =>
    isLoading &&
    css`
      ${preloader};
      min-height: 78px;
    `}
`;

const File = styled.span`
  word-break: break-word;
  color: #b1b1b1;
`;

const CallStack = styled.ul`
  max-width: 620px;
`;

const CallStackItem = styled.li<{ isLoading: boolean }>`
  font-size: 14px;

  &:not(:last-child) {
    margin-bottom: 10px;
  }

  ${({ isLoading }) =>
    isLoading &&
    css`
      ${preloader};
      min-height: 48px;
    `}
`;

const CallStackFile = styled.span`
  word-break: break-word;
`;

const CallStackCode = styled.code`
  display: block;
  padding: 5px 0 5px 15px;
  word-break: break-word;
  color: #999999;
`;

const CallStackButton = styled.code`
  display: inline-block;
  cursor: pointer;

  &:not(:hover) {
    text-decoration: underline;
  }
`;

export default ErrorDevelop;
