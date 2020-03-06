import React from 'react';
import App from 'next/app';
import NProgress from 'nprogress';
import Router from 'next/router';
import { Provider } from 'react-redux';

import '@assets/css/index.css';
import withRedux, { ReduxWrapperProps } from '@hocs/withRedux';
import { i18n, appWithTranslation } from '@server/i18n';
import { updateCookie } from '@utils/cookie';

/**
 * Custom App documentation
 * https://nextjs.org/docs/advanced-features/custom-app
 */
class CustomApp extends App<ReduxWrapperProps> {
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

    Router.events.on('routeChangeStart', url => NProgress.start());
    Router.events.on('routeChangeComplete', () => NProgress.done());
    Router.events.on('routeChangeError', () => NProgress.done());
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default appWithTranslation(withRedux(CustomApp));
