import React from 'react';
import Head from 'next/head';

import { getMetaList } from './Page.helpers';

type Props = {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  image?: string;
};

function Page({ children, title, description, image }: Props) {
  const metaList = getMetaList({ title, description, image });
  return (
    <>
      <Head>
        <title>{title ?? ''}</title>
        {metaList.map((metaProps, index) => (
          <meta {...metaProps} key={index} />
        ))}
        <link rel="preconnect" href="//fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="//fonts.googleapis.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:400,400i,500,500i,700,700i|Roboto+Slab:400,700|Roboto+Mono:400,500&subset=cyrillic"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  );
}

export default Page;
