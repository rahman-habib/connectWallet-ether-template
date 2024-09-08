import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
// import './App.css';
import Navbar from './Components/Navbar';

function App() {
  const [connectionError, setConnectionError] = useState(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);

  useEffect(() => {
    // Check for existing account on initial load
    const storedConnection = localStorage.getItem('isWalletConnected');
    const storedAccount = localStorage.getItem('currentAccount');

    if (storedConnection && storedConnection === 'true' && storedAccount) {
      setIsWalletConnected(true);
      setCurrentAccount(storedAccount);
    } 
  }, []);

  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length > 0) {
        const account = accounts[0];
        setIsWalletConnected(true);
        setCurrentAccount(account);
        localStorage.setItem('isWalletConnected', 'true');
        localStorage.setItem('currentAccount', account);
        return account;
      } else {
        throw new Error('No accounts found');
      }
    } catch (error) {
      setConnectionError('Error connecting to Ethereum: ' + error.message);
    }
  };

  const disconnectWallet = async () => {
    try {
      setIsWalletConnected(false);
      setCurrentAccount(null);
      localStorage.removeItem('isWalletConnected');
      localStorage.removeItem('currentAccount');
    } catch (error) {
      setConnectionError('Error disconnecting from Ethereum: ' + error.message);
    }
  };

  return (
    <>
      <Navbar
        connect={connectWallet}
        disconnect={disconnectWallet}
        isWalletConnected={isWalletConnected}
        currentAccount={currentAccount}
      />
      {connectionError && <div className="alert alert-danger">{connectionError}</div>}
    </>
  );
}

export default App;