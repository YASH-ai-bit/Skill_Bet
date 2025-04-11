import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { fetchWarDestruction } from '../fetchFromCocApi';
import { ArrowLeftIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { placeBet, connectWallet, checkWalletConnection } from '../../utils/ethers.js';

const EasyBet = () => {
    const [betAmount, setBetAmount] = useState('');
    const [clanTag, setClanTag] = useState('');
    const [destructionPercentage, setDestructionPercentage] = useState(30);
    const [success, setSuccess] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [betPlaced, setBetPlaced] = useState(false);
    const [isPlacingBet, setIsPlacingBet] = useState(false);
    const [walletConnected, setWalletConnected] = useState(false);
    const [betError, setBetError] = useState(null);
    const navigate = useNavigate();

    const challengeRequirements = [
        'Win 3 multiplayer battles in a row',
        'Achieve at least 1 star in each battle',
        'Use at least 10 troops in each attack',
        'Complete all battles within 24 hours'
    ];

    // Check wallet connection on component mount
    useEffect(() => {
        const checkWallet = async () => {
            const isConnected = await checkWalletConnection();
            setWalletConnected(isConnected);
        };

        checkWallet();
    }, []);

    const handlePlaceBet = async (e) => {
        e.preventDefault();

        if (!clanTag) {
            alert('Please enter your Clan Tag');
            return;
        }

        if (destructionPercentage < 60 || destructionPercentage > 100) {
            alert('Please enter a valid destruction percentage (60-100%)');
            return;
        }

        if (!betAmount || betAmount < 0.01) {
            alert('Please enter a valid bet amount (minimum 0.01 ETH)');
            return;
        }

        try {
            setIsPlacingBet(true);
            setBetError(null);

            // Connect to wallet if not already connected
            if (!walletConnected) {
                try {
                    await connectWallet();
                    setWalletConnected(true);
                } catch (err) {
                    console.error("Error connecting wallet:", err);
                    setBetError("Failed to connect wallet. Please make sure MetaMask is installed and unlocked.");
                    setIsPlacingBet(false);
                    return;
                }
            }

            // Place bet using the smart contract
            const receipt = await placeBet(betAmount);
            console.log("Transaction receipt:", receipt);

            // Store bet data in localStorage for use when claiming rewards
            const betData = {
                clanTag,
                difficulty: 'easy',
                expectedDestructionPercentage: Number(destructionPercentage),
                betAmount,
                timestamp: Date.now(),
                transactionHash: receipt.transactionHash
            };

            try {
                // Store bet data in localStorage
                const existingBets = JSON.parse(localStorage.getItem('skillBets') || '[]');
                existingBets.push(betData);
                localStorage.setItem('skillBets', JSON.stringify(existingBets));
            } catch (storageErr) {
                console.error("Could not store bet data:", storageErr);
            }

            // Update UI state
            setSuccess(true);
            setBetPlaced(true);
            setIsPlacingBet(false);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            console.error('Error placing bet:', err);
            setBetError(err.message || 'Failed to place bet. Please try again.');
            setIsPlacingBet(false);
        }
    };

    const handleSeeResults = () => {
        // Navigate to results page with bet data
        navigate(`/coc-bets/results/easy`, {
            state: {
                clanTag,
                expectedDestructionPercentage: Number(destructionPercentage),
                betAmount: Number(betAmount)
            }
        });
    };

    return (
        <div className="min-h-screen pt-16 bg-gray-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center mb-8">
                    <Link
                        to="/coc-bets"
                        className="flex items-center text-gray-400 hover:text-green-500 transition-colors mr-4"
                    >
                        <ArrowLeftIcon className="h-5 w-5 mr-1" />
                        <span>Back</span>
                    </Link>
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 pb-1">
                        Easy Challenge
                    </h1>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gray-800 rounded-xl p-6 mb-8 border border-green-500/30"
                >
                    <div className="flex items-start justify-between mb-6">
                        <h2 className="text-xl font-bold text-white">Challenge Details</h2>
                        <button
                            onClick={() => setShowInfo(!showInfo)}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <InformationCircleIcon className="h-6 w-6" />
                        </button>
                    </div>

                    {showInfo && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: 0.3 }}
                            className="mb-6 p-4 bg-gray-700/50 rounded-lg text-gray-300 text-sm"
                        >
                            <p>Easy challenges are designed for casual players or beginners. The payout ratio is lower, but so is the risk.</p>
                            <p className="mt-2">All challenges are verified through our game integration API to ensure fair play.</p>
                        </motion.div>
                    )}

                    <div className="space-y-4 mb-8">
                        <p className="text-gray-300">Complete the following requirements to win:</p>
                        <ul className="space-y-2">
                            {challengeRequirements.map((req, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-green-500/20 text-green-500 text-xs mr-3 mt-0.5">
                                        ✓
                                    </span>
                                    <span className="text-gray-300">{req}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mb-6">
                        <div className="flex justify-between mb-2">
                            <label htmlFor="clanTag" className="text-gray-300 font-medium">Your Clan Tag</label>
                            <span className="text-gray-400 text-sm">Required</span>
                        </div>
                        <div className="relative">
                            <span className="absolute left-3 top-3 text-gray-400">#</span>
                            <input
                                id="clanTag"
                                type="text"
                                value={clanTag}
                                onChange={(e) => setClanTag(e.target.value)}
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-8 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="Enter your clan tag"
                                disabled={betPlaced}
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="flex justify-between mb-2">
                            <label htmlFor="destructionPercentage" className="text-gray-300 font-medium">Expected Destruction Percentage</label>
                            <span className="text-gray-400 text-sm">{destructionPercentage}%</span>
                        </div>
                        <div className="relative">
                            <input
                                id="destructionPercentage"
                                type="range"
                                min="60"
                                max="100"
                                step="1"
                                value={destructionPercentage}
                                onChange={(e) => setDestructionPercentage(e.target.value)}
                                className="w-full bg-gray-700 accent-green-500 h-2 rounded-lg appearance-none cursor-pointer"
                                disabled={betPlaced}
                            />
                            <div className="flex justify-between mt-2 text-xs text-gray-400">
                                <span>60%</span>
                                <span>75%</span>
                                <span>90%</span>
                                <span>100%</span>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="flex justify-between mb-2">
                            <label htmlFor="betAmount" className="text-gray-300 font-medium">Your Bet Amount</label>
                            <span className="text-gray-400 text-sm">Min: 0.01 ETH</span>
                        </div>
                        <div className="relative">
                            <span className="absolute left-3 top-3 text-gray-400">Ξ</span>
                            <input
                                id="betAmount"
                                type="number"
                                min="0.01"
                                value={betAmount}
                                onChange={(e) => setBetAmount(e.target.value)}
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-8 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="Enter amount"
                                disabled={betPlaced}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <p className="text-gray-400 text-sm">Potential Payout</p>
                            <p className="text-xl font-bold text-green-500">
                                {betAmount ? (Number(betAmount) * 3).toFixed(2) : '0.00'} ETH
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Payout Ratio</p>
                            <p className="text-xl font-bold text-white">3x</p>
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={betPlaced ? handleSeeResults : handlePlaceBet}
                        disabled={isPlacingBet}
                        className={`w-full font-bold py-3 px-4 rounded-lg ${isPlacingBet ? 'opacity-70 cursor-not-allowed' : ''} ${betPlaced
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                            : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                            }`}
                    >
                        {isPlacingBet ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                                <span>Processing...</span>
                            </div>
                        ) : (
                            betPlaced ? 'See Results' : (walletConnected ? 'Place Bet' : 'Connect Wallet & Place Bet')
                        )}
                    </motion.button>

                    {betError && (
                        <p className="mt-2 text-red-400 text-sm">{betError}</p>
                    )}

                    {success && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-center"
                        >
                            <p className="text-green-400 font-medium">Bet placed successfully! Complete the challenge to win.</p>
                        </motion.div>
                    )}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="bg-gray-800/80 rounded-lg p-4 text-sm text-gray-400"
                >
                    <p>Note: Your skill-based bet will be held in escrow until the challenge is completed or the time expires.</p>
                    <p className="mt-2">Please ensure you have linked your Clash of Clans account in your profile before placing bets.</p>
                    {betPlaced && (
                        <p className="mt-2 text-green-400">Challenge active! Return to this page to check your results after completing the required battles.</p>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default EasyBet;
