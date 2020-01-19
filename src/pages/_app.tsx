import React from 'react';
import App from 'next/app';
import NProgress from 'nprogress';
import Router from 'next/router';
import 'normalize.css';

import '@assets/css/nprogress.css';
import '@assets/css/fonts.css';

/**
 * Custom App documentation
 * https://nextjs.org/docs/advanced-features/custom-app
 */
class CustomApp extends App {
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
    Router.events.on('routeChangeStart', url => NProgress.start());
    Router.events.on('routeChangeComplete', () => NProgress.done());
    Router.events.on('routeChangeError', () => NProgress.done());
  }

  /*
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
*/
}

export default CustomApp;
