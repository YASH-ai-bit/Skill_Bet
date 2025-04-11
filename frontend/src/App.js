import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';
import ResponsibilityPage from './pages/ResponsibilityPage';
import ContactPage from './pages/ContactPage';
import LoadingSpinner from './components/LoadingSpinner';
import CocBetPage from './pages/coc_bets/cocBetPage';
import EasyBet from './pages/coc_bets/easyBet';
import MediumBet from './pages/coc_bets/mediumBet';
import HardBet from './pages/coc_bets/hardBet';
import BetResultsPage from './pages/coc_bets/BetResultsPage';
import ValorantBetPage from './pages/valorant_bets/valorantBetPage';
import CsgoBetPage from './pages/csgo_bets/csgoBetPage';
import { WalletProvider } from './context/WalletContext';
import WalletDebug from './components/WalletDebug';

function App() {
    const [isLoading, setIsLoading] = useState(true);

    // Show loading spinner on initial load and page reloads
    useEffect(() => {
        // Set loading state initially
        setIsLoading(true);

        // Simulate loading delay (can be removed in production)
        const loadTimer = setTimeout(() => {
            setIsLoading(false);
        }, 2500); // 2.5 second loading animation

        // Add event listener for page reloads
        const handleBeforeUnload = () => {
            setIsLoading(true);
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        // Cleanup
        return () => {
            clearTimeout(loadTimer);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return (
        <WalletProvider>
            <Router>
                <div className="App min-h-screen bg-gray-900">
                    <LoadingSpinner isLoading={isLoading} />
                    {!isLoading && (
                        <>
                            <Navigation />
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/dashboard" element={<DashboardPage />} />
                                <Route path="/about" element={<AboutPage />} />
                                <Route path="/responsibility" element={<ResponsibilityPage />} />
                                <Route path="/contact" element={<ContactPage />} />

                                {/* CoC Betting Routes */}
                                <Route path="/coc-bets" element={<CocBetPage />} />
                                <Route path="/coc-bets/easy" element={<EasyBet />} />
                                <Route path="/coc-bets/medium" element={<MediumBet />} />
                                <Route path="/coc-bets/hard" element={<HardBet />} />
                                <Route path="/coc-bets/results/:difficulty" element={<BetResultsPage />} />

                                {/* Valorant Betting Routes */}
                                <Route path="/valorant-bets" element={<ValorantBetPage />} />

                                {/* CSGO Betting Routes */}
                                <Route path="/csgo-bets" element={<CsgoBetPage />} />
                            </Routes>
                            <WalletDebug />
                        </>
                    )}
                </div>
            </Router>
        </WalletProvider>
    );
}

export default App;