import React from 'react';
import { CustomApp_PageContext } from '@/typings/hocs';
import { Page } from '@tager/web-components';

import Layout from '@/components/Layout';
import Home from '@/modules/Home';
import { countUpdated } from '@/store/reducers/example';

function HomePage({ date }: { date: string }) {
  return (
    <Page title="TAGER Web | OZiTAG Web Experts">
      <Layout>
        <h2>Date: {date}</h2>
        <Home />
      </Layout>
    </Page>
  );
}

HomePage.getInitialProps = (context: CustomApp_PageContext) => {
  /**
   * Declaring namespace dependencies:
   * https://github.com/isaachinman/next-i18next#4-declaring-namespace-dependencies
   */
  context.store.dispatch(countUpdated(777));
  return { namespacesRequired: ['common'], date: new Date().toISOString() };
};

export default HomePage;
