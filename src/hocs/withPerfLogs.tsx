import React from 'react';
import { AppInitialProps } from 'next/app';

import { isomorphicLog, isServer } from '@tager/web-core';

import { CustomApp_Component } from '@/typings/hocs';

type MomentType = { hr?: [number, number]; timestamp?: number };

function startMeasurement(): MomentType {
  return isServer() ? { hr: process.hrtime() } : { timestamp: Date.now() };
}

function finishMeasurement(start: MomentType): number {
  if (isServer() && start.hr) {
    const hrEnd = process.hrtime(start.hr);
    return hrEnd[1] / 1000000;
  }

  if (start.timestamp) {
    return Date.now() - start.timestamp;
  }

  return 0;
}

function withPerfLogs(CustomApp: CustomApp_Component) {
  const AppWithPerfLogs: CustomApp_Component = (props) => {
    return <CustomApp {...props} />;
  };

  const componentName = CustomApp.displayName || CustomApp.name || 'App';
  AppWithPerfLogs.displayName = `withPerfLogs(${componentName})`;

  AppWithPerfLogs.getInitialProps = async (appCtx) => {
    let appProps: AppInitialProps = { pageProps: {} };

    const start = startMeasurement();

    /** If `CustomApp` has `getInitialProps` method */
    if (CustomApp.getInitialProps) {
      appProps = await CustomApp.getInitialProps(appCtx);
    } else {
      /** Otherwise get `pageProps` directly from page `Component` */
      if (appCtx.Component.getInitialProps) {
        const pageProps = await appCtx.Component.getInitialProps(appCtx.ctx);

        appProps = {
          pageProps,
        };
      }
    }

    const time = finishMeasurement(start);

    const message = `Page: ${appCtx.ctx.asPath},  \`getInitialProps\` execution time: ${time}ms`;
    isomorphicLog(message);

    return { ...appProps };
  };

  return AppWithPerfLogs;
}

export default withPerfLogs;
