import React from 'react';

import { Page } from '@tager/web-components';

import Layout from '@/components/Layout';

function HomePage() {
  return (
    <Page title="Next.js starter | OZiTAG Web Experts">
      <Layout>
        <h2>Test</h2>
      </Layout>
    </Page>
  );
}

HomePage.getInitialProps = () => {
  /**
   * Declaring namespace dependencies:
   * https://github.com/isaachinman/next-i18next#4-declaring-namespace-dependencies
   */
  return { namespacesRequired: ['common'] };
};

export default HomePage;
