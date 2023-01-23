import client from '../lib/apolloClient';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app'
import Layout from '../components/Layout';
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  )
}

export default MyApp
