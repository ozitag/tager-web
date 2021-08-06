import React from 'react';
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

import { Nullable } from '@tager/web-core';
import {
  AnalyticsSettingsType,
  getAnalyticsSettings,
  SiteVerificationMeta,
} from '@tager/web-analytics';

type CustomDocumentProps = {
  settings: Nullable<AnalyticsSettingsType>;
};

/**
 * Custom Document documentation
 * https://nextjs.org/docs/advanced-features/custom-document
 */
class CustomDocument extends Document<CustomDocumentProps> {
  /**
   * Source:
   * https://github.com/zeit/next.js/blob/canary/examples/with-typescript-styled-components/pages/_document.tsx
   */
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps & CustomDocumentProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      const settings = await getAnalyticsSettings()
        .then((response) => response.data)
        .catch((error) => null);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
        settings,
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    const { settings } = this.props;

    const themeColor = '#000000';
    const appName = 'TAGER Web App';

    return (
      <Html lang="en">
        <Head>
          <SiteVerificationMeta
            google={settings?.googleVerification}
            yandex={settings?.yandexVerification}
          />

          {/*<link rel="preconnect" href="//fonts.gstatic.com" crossOrigin="" />*/}
          {/*<link rel="preconnect" href="//fonts.googleapis.com" crossOrigin="" />*/}
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
            color={themeColor}
          />

          <meta
            name="msapplication-config"
            content="/favicon/browserconfig.xml"
          />

          {appName ? <meta name="application-name" content={appName} /> : null}

          {themeColor ? (
            <>
              <meta name="theme-color" content={themeColor} />
              <meta
                name="apple-mobile-web-app-status-bar-style"
                content={themeColor}
              />
              <meta content={`ya-title=${themeColor},ya-dock=fade`} />
              <meta name="msapplication-navbutton-color" content={themeColor} />
              <meta name="msapplication-TileColor" content={themeColor} />
            </>
          ) : null}
        </Head>
        <body>
          <Main />
          <script src="/static/js/global.js" defer />
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
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
