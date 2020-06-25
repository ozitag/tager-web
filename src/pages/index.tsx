import React from 'react';
import { Page } from '@tager/web-components';

import Layout from '@/components/Layout';
import Home from '@/modules/Home';

function HomePage() {
  return (
    <Page title="Next.js starter | OZiTAG Web Experts">
      <Layout>
        <Home />
      </Layout>
    </Page>
  );
}

export default HomePage;
