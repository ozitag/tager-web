import React, { useEffect } from 'react';
import App from 'next/app';
import * as Sentry from '@sentry/node';
import {
  cookie,
  useFacebookPixel,
  useGoogleAnalytics,
  useGoogleTagManager,
  useProgressBar,
  useYandexMetrika,
} from '@tager/web-core';
import { ModalProvider } from '@tager/web-components';

import '@/assets/css/index.css';
import withRedux from '@/hocs/withRedux';
import { i18n, appWithTranslation } from '@server/i18n';
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

  useGoogleTagManager();
  useGoogleAnalytics();
  useYandexMetrika();
  useFacebookPixel();

  useEffect(() => {
    i18n.on('languageChanged', (lang: string) => cookie.set('lng', lang));
  }, []);

  const { Component, pageProps } = props;

  // Workaround for https://github.com/zeit/next.js/issues/8592
  // @ts-ignore
  const { err } = props;
  const modifiedPageProps = { ...pageProps, err };
  return (
    <ModalProvider>
      <Component {...modifiedPageProps} />
    </ModalProvider>
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

export default appWithTranslation(withRedux(CustomApp));
