import React from 'react';
import App from 'next/app';
import NProgress from 'nprogress';
import Router from 'next/router';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/node';

import '@assets/css/index.css';
import withRedux from '@hocs/withRedux';
import { i18n, appWithTranslation } from '@server/i18n';
import { updateCookie } from '@utils/cookie';
import { Nullable } from '@typings/common';
import { CustomAppProps } from '@typings/hocs';
import ModalProvider from '@components/Modal';
import withYandexMetrika from '@hocs/withYandexMetrika';

Sentry.init({
  enabled: process.env.NODE_ENV === 'production',
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.REACT_APP_SENTRY_ENVIRONMENT,
});

/**
 * Custom App documentation
 * https://nextjs.org/docs/advanced-features/custom-app
 */
class CustomApp extends App<CustomAppProps> {
  /**
   * Adding a custom getInitialProps in your App will disable Automatic Static Optimization.
   * https://nextjs.org/docs/advanced-features/automatic-static-optimization
   */
  /*
  static async getInitialProps({ Component, ctx }: AppContext) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }
*/

  componentDidMount() {
    i18n.on('languageChanged', (lang: string) => updateCookie('lng', lang));

    NProgress.configure({ showSpinner: false });
    let timeoutId: Nullable<number> = null;
    const TIMEOUT = 500;

    function resetTimeoutIfNeeded() {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    }

    Router.events.on('routeChangeStart', (url) => {
      resetTimeoutIfNeeded();
      timeoutId = setTimeout(() => NProgress.start(), TIMEOUT);
    });
    Router.events.on('routeChangeComplete', () => {
      resetTimeoutIfNeeded();
      NProgress.done();
    });
    Router.events.on('routeChangeError', () => {
      resetTimeoutIfNeeded();
      NProgress.done();
    });
  }

  render() {
    const { Component, pageProps, store } = this.props;

    // Workaround for https://github.com/zeit/next.js/issues/8592
    // @ts-ignore
    const { err } = this.props;
    const modifiedPageProps = { ...pageProps, err };
    return (
      <Provider store={store}>
        <ModalProvider>
          <Component {...modifiedPageProps} />
        </ModalProvider>
      </Provider>
    );
  }
}

export default withYandexMetrika(appWithTranslation(withRedux(CustomApp)));
