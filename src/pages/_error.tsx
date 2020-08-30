import React from 'react';
import * as Sentry from '@sentry/node';
import NextError, { ErrorProps } from 'next/error';

import { ErrorModule as TagerError, Page } from '@tager/web-components';

import { CustomApp_PageContext } from '@/typings/hocs';

type InitialErrorProps = ErrorProps & {
  isInitProps?: boolean;
  errorId?: string;
  err?: any;
};

type Props = InitialErrorProps;

function ErrorPage({ statusCode, title, isInitProps, errorId, err }: Props) {
  if (!isInitProps && !errorId && err) {
    // getInitialProps is not called in case of
    // https://github.com/zeit/next.js/issues/8592. As a workaround, we pass
    // err via _app.js so it can be captured
    errorId = Sentry.captureException(err);
  }

  const errorCode = statusCode ?? 500;
  const errorName = err?.name
    ? err.name.replace(/\.$/, '')
    : title ?? 'JavaScript Error';

  return (
    <Page title="An error occurred">
      <TagerError
        errorCode={errorCode}
        errorName={errorName}
        errorId={errorId}
      />
    </Page>
  );
}

ErrorPage.getInitialProps = async (
  pageContext: CustomApp_PageContext
): Promise<InitialErrorProps> => {
  const { res, err, asPath } = pageContext;

  const errorInitialProps = (await NextError.getInitialProps(
    pageContext
  )) as InitialErrorProps;

  // Workaround for https://github.com/zeit/next.js/issues/8592, mark when
  // getInitialProps has run
  errorInitialProps.isInitProps = true;

  if (res) {
    // Running on the server, the response object is available.
    //
    // Next.js will pass an err on the server if a page's `getInitialProps`
    // threw or returned a Promise that rejected

    if (res.statusCode === 404) {
      // Opinionated: do not record an exception in Sentry for 404
      return { statusCode: 404 };
    }

    if (err) {
      errorInitialProps.errorId = Sentry.captureException(err);

      return errorInitialProps;
    }
  } else {
    // Running on the client (browser).
    //
    // Next.js will provide an err if:
    //
    //  - a page's `getInitialProps` threw or returned a Promise that rejected
    //  - an exception was thrown somewhere in the React lifecycle (render,
    //    componentDidMount, etc) that was caught by Next.js's React Error
    //    Boundary. Read more about what types of exceptions are caught by Error
    //    Boundaries: https://reactjs.org/docs/error-boundaries.html
    if (err) {
      errorInitialProps.errorId = Sentry.captureException(err);

      return errorInitialProps;
    }
  }

  // If this point is reached, getInitialProps was called without any
  // information about what the error might be. This is unexpected and may
  // indicate a bug introduced in Next.js, so record it in Sentry
  errorInitialProps.errorId = Sentry.captureException(
    new Error(`_error.js getInitialProps missing data at path: ${asPath}`)
  );

  return errorInitialProps;
};

export default ErrorPage;
