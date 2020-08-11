import React from 'react';
import './App.css';
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from "react-cookie";

import { useAppApolloClient } from './hooks/apolloClient';
import Routes from './Routes/routes';

function App() {

  const apolloClient = useAppApolloClient();
  return (
    <ApolloProvider client={apolloClient}>
      <CookiesProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </CookiesProvider>
    </ApolloProvider>
  );
}

export default App;
