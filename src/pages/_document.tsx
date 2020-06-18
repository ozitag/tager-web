import React from 'react';

import Document, { DocumentContext, Html, Main } from 'next/document';

import { ServerStyleSheet } from 'styled-components';

import YandexMetrikaScript from '@components/YandexMetrikaScript';
import FacebookPixelScript from '@components/FacebookPixelScript';
import TagerNextHead from '@components/NextJS/TagerNextHead';
import TagerNextScript from '@components/NextJS/TagerNextScript';

/**
 * Custom Document documentation
 * https://nextjs.org/docs/advanced-features/custom-document
 */
class CustomDocument extends Document {
  /**
   * Source:
   * https://github.com/zeit/next.js/blob/canary/examples/with-typescript-styled-components/pages/_document.tsx
   */
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <TagerNextHead>
          <link rel="preconnect" href="//fonts.gstatic.com" crossOrigin="" />
          <link rel="preconnect" href="//fonts.googleapis.com" crossOrigin="" />
          {/*<link*/}
          {/*  href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500&display=swap&subset=cyrillic"*/}
          {/*  rel="stylesheet"*/}
          {/*/>*/}
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/favicon/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/favicon/safari-pinned-tab.svg"
            color="#dd6900"
          />
          <meta
            name="msapplication-config"
            content="/favicon/browserconfig.xml"
          />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </TagerNextHead>
        <body>
          <Main />
          <script src="/global.js" defer />
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.2.0/lazysizes.min.js"
            defer
          />
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.2.0/plugins/native-loading/ls.native-loading.min.js"
            defer
          />
          <script
            noModule
            src="https://unpkg.com/core-js-bundle@3.6.5/index.js"
          />
          <YandexMetrikaScript />
          <FacebookPixelScript />
          <TagerNextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
