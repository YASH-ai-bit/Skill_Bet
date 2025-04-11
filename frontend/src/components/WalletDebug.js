import React, { useState, useEffect } from 'react';
import { useWallet } from '../context/WalletContext';

const WalletDebug = () => {
    const [showDebug, setShowDebug] = useState(false);
    const { account, isConnected, disconnectWallet } = useWallet();
    const [counter, setCounter] = useState(0);

    // Force re-render periodically to show updated state
    useEffect(() => {
        const timer = setInterval(() => {
            setCounter(c => c + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Handle forced disconnect
    const handleForceDisconnect = () => {
        console.log("WalletDebug: Force disconnect initiated");

        // Clear localStorage directly
        localStorage.removeItem('walletConnected');
        localStorage.removeItem('walletAddress');

        // Call context disconnect
        disconnectWallet();

        // Force UI update with custom event
        window.dispatchEvent(new Event('wallet_disconnected'));

        console.log("WalletDebug: Force disconnect completed");
    };

    // Only show in development environment
    if (process.env.NODE_ENV !== 'development') {
        return null;
    }

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <button
                onClick={() => setShowDebug(!showDebug)}
                className="bg-gray-800 text-white text-xs px-2 py-1 rounded-md"
            >
                {showDebug ? 'Hide Debug' : 'Show Debug'}
            </button>

            {showDebug && (
                <div className="bg-gray-900 text-white p-4 rounded-md mt-2 w-64 text-xs font-mono">
                    <h3 className="font-bold mb-2">Wallet Debug</h3>
                    <div className="space-y-1">
                        <p><span className="text-gray-400">Connected:</span> {isConnected ? 'Yes' : 'No'}</p>
                        <p><span className="text-gray-400">Account:</span> {account || 'None'}</p>
                        <p><span className="text-gray-400">localStorage.walletConnected:</span> {localStorage.getItem('walletConnected') || 'null'}</p>
                        <p><span className="text-gray-400">localStorage.walletAddress:</span> {localStorage.getItem('walletAddress') || 'null'}</p>
                        <p><span className="text-gray-400">Update counter:</span> {counter}</p>
                    </div>
                    <div className="mt-4 space-y-2">
                        <button
                            onClick={handleForceDisconnect}
                            className="bg-yellow-600 text-white text-xs px-2 py-1 rounded-md w-full"
                        >
                            Force Disconnect
                        </button>
                        <button
                            onClick={() => {
                                localStorage.clear();
                                window.location.reload();
                            }}
                            className="bg-red-600 text-white text-xs px-2 py-1 rounded-md w-full"
                        >
                            Reset Storage & Reload
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WalletDebug; 