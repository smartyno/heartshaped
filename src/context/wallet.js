import React, { useContext, createContext, useState, useEffect } from 'react';
import { BeaconWallet } from '@taquito/beacon-wallet';

const preferredNetwork = 'mainnet';

const options = {
  name: 'heartshaped',
  iconUrl:
    'https://pbs.twimg.com/profile_images/1636454981648654338/cNrOF6sH_400x400.jpg',
  preferredNetwork: preferredNetwork
};

const Wallet = new BeaconWallet(options);

const WalletContext = createContext({
  wallet: null
});

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    (async () => {
      const account = await getActiveAccount();
      if (account) {
        setWallet(account.address);
      }
    })();
  }, []);

  const getActiveAccount = async () => await Wallet.client.getActiveAccount();

  const disconnectWallet = async () => {
    await Wallet.disconnect();
    setWallet(null);
  };

  const connectWallet = async () => {
    let account = await Wallet.client.getActiveAccount();

    if (!account) {
      await Wallet.requestPermissions({
        network: { type: preferredNetwork }
      });
      account = await Wallet.client.getActiveAccount();
    }

    setWallet(account.address);
  };

  return (
    <WalletContext.Provider value={{ wallet, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

const useWallet = () => useContext(WalletContext);

export default useWallet;
