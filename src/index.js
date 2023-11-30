import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Data from './pages/Data';
import { WalletProvider } from './context/wallet';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <WalletProvider>
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='data/:tokenId/:faContract' element={<Data />} />
      </Routes>
    </Router>
  </WalletProvider>
);