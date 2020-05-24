import React, { useEffect } from 'react';
import { NextComponentType } from 'next';
import { Router } from 'next/router';

import YandexMetrika from '@services/yandexMetrika';

function withYandexMetrika(NextComponent: NextComponentType<any, any, any>) {
  function YandexMetrikaHOC(props: any) {
    useEffect(() => {
      const yandexTracker = new YandexMetrika();
      if (!yandexTracker.isTrackerEnabled()) return;

      yandexTracker.init();
      yandexTracker.trackPageView();

      Router.events.on('routeChangeComplete', () => {
        yandexTracker.trackPageView();
      });
    }, []);

    return <NextComponent {...props} />;
  }

  if (NextComponent.getInitialProps) {
    YandexMetrikaHOC.getInitialProps = NextComponent.getInitialProps;
  }

  YandexMetrikaHOC.displayName = 'withYandexMetrika';

  return YandexMetrikaHOC;
}

export default withYandexMetrika;
