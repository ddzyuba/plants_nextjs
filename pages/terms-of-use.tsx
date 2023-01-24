import type { NextPage } from 'next';
import ServiceHero from '../components/Services/ServiceHero';
import Content from '../components/Services/Content';
import Head from 'next/head';
import { gql, useQuery } from '@apollo/client';

const GET_TERMS_OF_USE = gql`
  query GetTermsOfUse {
    termsOfUsePage {
      data {
        attributes {
          title
          content
        }
      }
    }
  }
`;

const TermsOfUse: NextPage = () => {
  const { loading, error, data } = useQuery(GET_TERMS_OF_USE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      <Head>
        <title>Terms Of Use</title>
        <meta name="description" content="Plants" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ServiceHero title={data.termsOfUsePage.data.attributes.title} />
      <Content content={data.termsOfUsePage.data.attributes.content} />
    </div>
  );
};

export default TermsOfUse;