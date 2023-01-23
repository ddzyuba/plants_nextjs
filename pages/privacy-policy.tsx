import type { NextPage } from 'next';
import ServiceHero from '../components/Services/ServiceHero';
import Content from '../components/Services/Content';
import Head from 'next/head';
import { gql, useQuery } from '@apollo/client';

const GET_PRIVACY_POLICY = gql`
  query GetPrivacyPolicy {
    privacyPolicyPage {
      data {
        attributes {
          title
          content
        }
      }
    }
  }
`;

const PrivacyPolicy: NextPage = () => {
  const { loading, error, data } = useQuery(GET_PRIVACY_POLICY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      <Head>
        <title>Privacy Policy</title>
        <meta name="description" content="Plants" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ServiceHero title={data.privacyPolicyPage.data.attributes.title} />
      <Content content={data.privacyPolicyPage.data.attributes.content} />
    </div>
  );
};

export default PrivacyPolicy;