import React, { useEffect } from 'react';
import { NextComponentType } from 'next';
import { Router } from 'next/router';

import GoogleAnalytics from '@/services/googleAnalytics';

function withGoogleAnalytics(NextComponent: NextComponentType<any, any, any>) {
  function GoogleAnalyticsHOC(props: any) {
    useEffect(() => {
      const googleTracker = new GoogleAnalytics();

      googleTracker.init();
      googleTracker.trackPageView();

      function handleRouteChangeComplete() {
        googleTracker.trackPageView();
      }

      Router.events.on('routeChangeComplete', handleRouteChangeComplete);

      return () => {
        Router.events.off('routeChangeComplete', handleRouteChangeComplete);
      };
    }, []);

    return <NextComponent {...props} />;
  }

  // if (NextComponent.getInitialProps) {
  //   GoogleAnalyticsHOC.getInitialProps = NextComponent.getInitialProps;
  // }

  GoogleAnalyticsHOC.displayName = 'withGoogleAnalytics';

  return GoogleAnalyticsHOC;
}

export default withGoogleAnalytics;
