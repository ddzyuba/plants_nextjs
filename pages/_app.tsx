import { useState } from 'react';
import client from '../lib/apolloClient';
import AppContext from '../components/AppContext';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app'
import Layout from '../components/Layout';
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleIsMenuOpen = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        isMenuOpen: isMenuOpen,
        toggleIsMenuOpen: toggleIsMenuOpen
      }}
    >
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </AppContext.Provider>
  )
}

export default MyApp
