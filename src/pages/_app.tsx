import React from 'react';
import * as Sentry from '@sentry/node';
import Head from 'next/head';

import '@/assets/css/index.css';

import { AdminBar } from '@tager/web-panel';
import { useAnalytics } from '@tager/web-analytics';
import { useFixedVhProperty, useProgressBar } from '@tager/web-core';
import { ModalProvider } from '@tager/web-components';

import withRedux from '@/hocs/withRedux';
import withPerfLogs from '@/hocs/withPerfLogs';
import { CustomApp_Component } from '@/typings/hocs';

Sentry.init({
  enabled:
    process.env.NODE_ENV === 'production' &&
    process.env.NEXT_PUBLIC_ENV !== 'local',
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: [
    process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT,
    process.env.NEXT_PUBLIC_ENV,
  ].join('_'),
});

/**
 * Custom App documentation
 * https://nextjs.org/docs/advanced-features/custom-app
 */
const CustomApp: CustomApp_Component = (props) => {
  useProgressBar({ showSpinner: false });

  useAnalytics();
  useFixedVhProperty();

  const { Component, pageProps } = props;

  // Workaround for https://github.com/zeit/next.js/issues/8592
  // @ts-ignore
  const { err } = props;
  const modifiedPageProps = { ...pageProps, err };
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <AdminBar />
      <ModalProvider>
        <Component {...modifiedPageProps} />
      </ModalProvider>
    </>
  );
};

/**
 * Only use this method if you have blocking data requirements for
 * every single page in your application. This disables the ability to
 * perform automatic static optimization, causing every page in your app to
 * be server-side rendered.
 *
 * Reference: https://nextjs.org/docs/advanced-features/custom-app
 */
// CustomApp.getInitialProps = async (appContext) => {
//   /** calls page's `getInitialProps` and fills `appProps.pageProps` */
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps };
// };

export default withRedux(withPerfLogs(CustomApp));
