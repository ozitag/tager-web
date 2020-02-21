import React from 'react';
import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';

import { ServerStyleSheet } from 'styled-components';

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
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
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
      <Html>
        <Head>
          <link rel="preconnect" href="//fonts.gstatic.com" crossOrigin="" />
          <link rel="preconnect" href="//fonts.googleapis.com" crossOrigin="" />
          <link
            href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500&display=swap&subset=cyrillic"
            rel="stylesheet"
          />
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
            rel="stylesheet"
            type="text/css"
          />
          <link rel="icon" href="/favicon-32x32.png" />
        </Head>
        <body>
          <Main />
          <script src="/lazysizes-init.js" defer />
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.2.0/lazysizes.min.js"
            defer
          />
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.2.0/plugins/native-loading/ls.native-loading.min.js"
            defer
          />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
