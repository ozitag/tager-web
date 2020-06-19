import React from 'react';

import Layout from '@components/Layout';
import Page from '@components/Page';
import Home from '@modules/Home';

function HomePage() {
  return (
    <Page title="Next.js starter | OZiTAG Web Experts">
      <Layout>
        {({} as any).toLowerCase()}
        <Home />
      </Layout>
    </Page>
  );
}

export default HomePage;
