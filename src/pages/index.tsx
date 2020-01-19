import React from 'react';

import Layout from '@components/Layout';
import Page from '@components/Page';
import carImage from '@assets/images/background-car.png';

function Home() {
  return (
    <Page title={process.env.REACT_APP_TITLE}>
      <Layout>
        <img src={carImage} alt="" />
      </Layout>
    </Page>
  );
}

export default Home;
