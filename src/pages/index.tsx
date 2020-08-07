import React from 'react';
import { CustomApp_PageContext } from '@/typings/hocs';
import { Page } from '@tager/web-components';

import Layout from '@/components/Layout';
import Home from '@/modules/Home';
import { getMenuItemListThunk } from '@/store/reducers/tager/menus';
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

  /** i18n:enabled */
  /**
   * Declaring namespace dependencies:
   * https://github.com/isaachinman/next-i18next#4-declaring-namespace-dependencies
   */
  return { namespacesRequired: ['common'] };
  /** i18n:enabled:end */

  /** i18n:disabled */
  // return {};
  /** i18n:disabled:end */
};

export default HomePage;
