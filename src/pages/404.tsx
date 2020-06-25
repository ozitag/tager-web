import React from 'react';

import { Page, ErrorModule as TagerError } from '@tager/web-components';

function NotFoundPage() {
  return (
    <Page title="Page not found">
      <TagerError errorCode={404} errorName="Page not found" />
    </Page>
  );
}

export default NotFoundPage;
