import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { getOrigin } from '@utils/common';

import { getMetaList, getCanonicalUrl } from './Page.helpers';

type Props = {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  image?: string;
  canonicalUrl?: string;
};

function Page({ children, title, description, image, canonicalUrl }: Props) {
  const router = useRouter();

  const metaList = getMetaList({
    title,
    description,
    image,
    currentPath: router.asPath,
  });
  const canonicalUrlPrepared = getCanonicalUrl(router.asPath, canonicalUrl);
  const homePageUrl = getOrigin();

  return (
    <>
      <Head>
        <title>{title ?? ''}</title>

        {canonicalUrlPrepared ? (
          <link href={canonicalUrlPrepared} rel="canonical" />
        ) : null}
        {homePageUrl ? <link href={homePageUrl} rel="home" /> : null}

        {metaList.map((metaProps, index) => (
          <meta {...metaProps} key={index} />
        ))}
      </Head>
      {children}
    </>
  );
}

export default Page;
