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
      </Head>
      {children}
    </>
  );
}

export default Page;
