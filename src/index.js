import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Data from './pages/Data';
import client from './utils/apolloClient';
import { WalletProvider } from './context/wallet';
import { ApolloProvider } from '@apollo/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <WalletProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='data/:tokenId/:faContract' element={<Data />} />
        </Routes>
      </Router>
    </WalletProvider>
  </ApolloProvider>
);