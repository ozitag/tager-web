import React from 'react';

import Layout from '@components/Layout';
import Page from '@components/Page';

function CustomErrorPage() {
  const obj: any = 123;

  return (
    <Page title="Test custom error">
      <Layout>{obj.toLowerCase()}</Layout>
    </Page>
  );
}

export default CustomErrorPage;
