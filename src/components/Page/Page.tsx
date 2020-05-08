import React from 'react';
import Head from 'next/head';

import { getMetaList } from './Page.helpers';
import { useRouter } from 'next/router';
import Router, { NextRouter } from 'next/dist/next-server/lib/router/router';

type Props = {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  image?: string;
  canonicalUrl?: string;
};

function getCanonicalUrl(router: NextRouter, canonicalUrlProp?: string | undefined) {
  if (!canonicalUrlProp) {
    return process.env.REACT_APP_HOSTNAME ? process.env.REACT_APP_HOSTNAME + router.asPath : null;
  }

  if (canonicalUrlProp.substr(0, 1) === '/') {
    return process.env.REACT_APP_HOSTNAME ? process.env.REACT_APP_HOSTNAME + canonicalUrlProp : null;
  }

  return canonicalUrlProp;
}

function Page({ children, title, description, image, canonicalUrl }: Props) {
  const metaList = getMetaList({ title, description, image });

  const canonicalUrlPrepared = getCanonicalUrl(useRouter(), canonicalUrl);

  return (
    <>
      <Head>
        <title>{title ?? ''}</title>

        {canonicalUrlPrepared ? <link href={canonicalUrlPrepared} rel="canonical"/> : null}
        {process.env.REACT_APP_HOSTNAME ? <link href={process.env.REACT_APP_HOSTNAME} rel="home"/> : null}

        {metaList.map((metaProps, index) => (
          <meta {...metaProps} key={index}/>
        ))}
      </Head>
      {children}
    </>
  );
}

export default Page;
