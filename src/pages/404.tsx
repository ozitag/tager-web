import React from 'react';

import Page from '@components/Page';
import ErrorContent from '@modules/ErrorContent';

function NotFoundPage() {
  return (
    <Page title="Page not found">
      <ErrorContent statusCode={404} errorName="Page not found" />
    </Page>
  );
}

export default NotFoundPage;
