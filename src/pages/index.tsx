import React from 'react';
import { CustomApp_PageContext } from '@/typings/hocs';
import { Page } from '@tager/web-components';

import Layout from '@/components/Layout';
import Home from '@/modules/Home';
import { isServer } from '@tager/web-core';

function HomePage() {
  return (
    <Page title="TAGER Web | OZiTAG Web Experts">
      <Layout>
        <Home />
      </Layout>
    </Page>
  );
}

HomePage.getInitialProps = async ({ store }: CustomApp_PageContext) => {
  const requestsPromise = Promise.all([]);

  if (isServer()) {
    await requestsPromise;
  }

  return {};
};

export default HomePage;
