import React from 'react';

import Page from '@/components/Page';
import Error from '@/modules/Error';

function NotFoundPage() {
  return (
    <Page title="Page not found">
      <Error errorCode={404} errorName="Page not found" />
    </Page>
  );
}

export default NotFoundPage;
