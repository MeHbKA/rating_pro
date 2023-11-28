import React from 'react';
import Layout from "../layouts/MainLayout/MainLayout";
import dynamic from 'next/dynamic'

const SpecialistsNearby = () => {
  const Map = dynamic(
    () => import('../components/Map'), // replace '@components/map' with your component's location
    { ssr: false } // This line is important. It's what prevents server-side render
  )
  return (
    <Layout>
      <Map />
    </Layout>
  );
};

export default SpecialistsNearby;
