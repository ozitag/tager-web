import React from 'react';
import Head from 'next/head';

import { getMetaList, getCanonicalUrl } from './Page.helpers';
import { useRouter } from 'next/router';

type Props = {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  image?: string;
  canonicalUrl?: string;
};

function Page({ children, title, description, image, canonicalUrl }: Props) {
  const router = useRouter();

  const metaList = getMetaList(router, { title, description, image });
  const canonicalUrlPrepared = getCanonicalUrl(router, canonicalUrl);

  return (
    <>
      <Head>
        <title>{title ?? ''}</title>

        {canonicalUrlPrepared ? (
          <link href={canonicalUrlPrepared} rel="canonical" />
        ) : null}
        {process.env.REACT_APP_HOSTNAME ? (
          <link href={process.env.REACT_APP_HOSTNAME} rel="home" />
        ) : null}

        {metaList.map((metaProps, index) => (
          <meta {...metaProps} key={index} />
        ))}
      </Head>
      {children}
    </>
  );
}

export default Page;
