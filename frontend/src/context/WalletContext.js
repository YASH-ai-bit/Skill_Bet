import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [provider, setProvider] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    // Disconnect handler made into a useCallback to avoid dependency issues
    const disconnectWallet = useCallback(() => {
        console.log('Disconnecting wallet. Current state:', { account, isConnected });

        // Reset all state values
        setAccount(null);
        setProvider(null);
        setIsConnected(false);

        // Clear localStorage
        localStorage.removeItem('walletConnected');
        localStorage.removeItem('walletAddress');

        console.log('Wallet disconnected, state cleared');

        // Force a re-render and a complete reset
        window.dispatchEvent(new Event('wallet_disconnected'));
    }, [account, isConnected]);

    const connectWallet = async () => {
        try {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                const address = await signer.getAddress();

                setProvider(provider);
                setAccount(address);
                setIsConnected(true);

                // Store connection state in localStorage
                localStorage.setItem('walletConnected', 'true');
                localStorage.setItem('walletAddress', address);

                console.log('Wallet connected:', address);
            } else {
                alert('Please install MetaMask to use this application');
            }
        } catch (error) {
            console.error('Error connecting wallet:', error);
            alert('Failed to connect wallet. Please try again.');
        }
    };

    // Fallback to Infura provider if MetaMask is not available
    const getInfuraProvider = () => {
        const infuraId = process.env.REACT_APP_INFURA_ID;
        if (!infuraId) {
            console.warn('REACT_APP_INFURA_ID not found in environment variables');
            return null;
        }

        return new ethers.providers.InfuraProvider('mainnet', infuraId);
    };

    // Handle wallet account changes
    useEffect(() => {
        if (window.ethereum) {
            const handleAccountsChanged = (accounts) => {
                console.log('Accounts changed:', accounts);
                if (accounts.length === 0) {
                    // User disconnected their wallet via MetaMask
                    disconnectWallet();
                } else if (account && accounts[0] !== account) {
                    // User switched accounts
                    setAccount(accounts[0]);
                    localStorage.setItem('walletAddress', accounts[0]);
                }
            };

            window.ethereum.on('accountsChanged', handleAccountsChanged);

            // Listen for wallet disconnected event to sync across components
            const handleWalletDisconnected = () => {
                console.log('Wallet disconnected event received');
                setAccount(null);
                setIsConnected(false);
            };

            window.addEventListener('wallet_disconnected', handleWalletDisconnected);

            return () => {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
                window.removeEventListener('wallet_disconnected', handleWalletDisconnected);
            };
        }
    }, [account, disconnectWallet]);

    useEffect(() => {
        // Check if wallet was previously connected
        const wasConnected = localStorage.getItem('walletConnected');
        const savedAddress = localStorage.getItem('walletAddress');

        console.log('Initial wallet check:', { wasConnected, savedAddress });

        if (wasConnected === 'true' && window.ethereum) {
            connectWallet();
        } else if (wasConnected === 'true' && savedAddress) {
            // If MetaMask is not available but we have a saved address,
            // try to use Infura as a read-only provider
            const infuraProvider = getInfuraProvider();
            if (infuraProvider) {
                setProvider(infuraProvider);
                setAccount(savedAddress);
                setIsConnected(true);
            }
        }
    }, []);

    return (
        <WalletContext.Provider value={{
            account,
            provider,
            isConnected,
            connectWallet,
            disconnectWallet
        }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
}; 