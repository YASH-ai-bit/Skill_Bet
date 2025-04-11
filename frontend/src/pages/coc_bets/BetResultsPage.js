import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams, useLocation } from 'react-router-dom';
import { ArrowLeftIcon, CheckCircleIcon, XCircleIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { fetchWarDestruction } from '../fetchFromCocApi';
import { fetchProof } from '../fetchingProof';
import { connectWallet, claimReward, checkWalletConnection } from '../../utils/ethers';

const BetResultsPage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [results, setResults] = useState(null);
    const [win, setWin] = useState(false);
    const [walletConnected, setWalletConnected] = useState(false);
    const [claimingReward, setClaimingReward] = useState(false);
    const [rewardClaimed, setRewardClaimed] = useState(false);
    const [walletError, setWalletError] = useState(null);
    const [proofData, setProofData] = useState(null);
    const location = useLocation();
    const { difficulty } = useParams();

    // Extract data from state passed via navigation
    const betData = location.state || {};
    const { clanTag, expectedDestructionPercentage, betAmount } = betData;

    useEffect(() => {
        const checkResults = async () => {
            setLoading(true);
            setError(null);

            try {
                // Ensure expectedDestructionPercentage is a number
                const expectedPercentage = typeof expectedDestructionPercentage === 'string'
                    ? Number(expectedDestructionPercentage)
                    : expectedDestructionPercentage;

                // Fetch war destruction results from API
                const destructionResults = await fetchWarDestruction(clanTag);
                const proofResult = await fetchProof(destructionResults.clanDestruction, expectedPercentage);

                setProofData(proofResult);

                const finalResults = destructionResults;
                const hasWon = expectedPercentage <= finalResults.clanDestruction;

                setResults(finalResults);
                setWin(hasWon);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching results:', err);
                setError('Failed to fetch war results. Please try again later.');
                setLoading(false);
            }
        };

        checkResults();

        // Check wallet connection
        const checkWallet = async () => {
            const isConnected = await checkWalletConnection();
            setWalletConnected(isConnected);
        };

        checkWallet();
    }, [clanTag, expectedDestructionPercentage]);

    // Color theme based on difficulty
    const getThemeColors = () => {
        switch (difficulty) {
            case 'easy':
                return {
                    primary: 'from-green-500 to-emerald-600',
                    light: 'text-green-400',
                    bg: 'bg-green-500/20',
                    border: 'border-green-500/30'
                };
            case 'medium':
                return {
                    primary: 'from-blue-500 to-indigo-600',
                    light: 'text-blue-400',
                    bg: 'bg-blue-500/20',
                    border: 'border-blue-500/30'
                };
            case 'hard':
            default:
                return {
                    primary: 'from-pink-500 to-purple-600',
                    light: 'text-pink-400',
                    bg: 'bg-pink-500/20',
                    border: 'border-pink-500/30'
                };
        }
    };

    const theme = getThemeColors();
    const payoutMultiplier = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 4 : 5;
    const totalPayout = betAmount ? (Number(betAmount) * payoutMultiplier).toFixed(2) : '0.00';

    // Handle wallet connection
    const handleConnectWallet = async () => {
        try {
            setWalletError(null);
            await connectWallet();
            setWalletConnected(true);
        } catch (err) {
            console.error('Error connecting wallet:', err);
            setWalletError(err.message || 'Failed to connect wallet. Please try again.');
        }
    };

    // Handle claiming reward
    const handleClaimReward = async () => {

        // First check if wallet is connected or try to connect
        if (!walletConnected) {
            try {
                await handleConnectWallet();
                if (!walletConnected) {
                    setWalletError('Please connect your wallet to claim rewards.');
                    return;
                }
            } catch (err) {
                setWalletError('Failed to connect wallet. Please ensure MetaMask is installed and unlocked.');
                return;
            }
        }

        // Verify proof data is available
        if (!proofData || !proofData.proof || !proofData.publicSignals) {
            setWalletError('Proof data not available. Please try refreshing the page.');
            return;
        }

        // Verify that the user has won
        if (!win || proofData.isWinner !== 1) {
            setWalletError('Cannot claim reward for a challenge that was not completed successfully.');
            return;
        }

        try {
            setClaimingReward(true);
            setWalletError(null);

            // Get localStorage bet data if available
            let storedBets = [];
            try {
                storedBets = JSON.parse(localStorage.getItem('skillBets') || '[]');
            } catch (err) {
                console.warn('Could not retrieve bet data from localStorage:', err);
            }

            // Find matching bet by clanTag and difficulty
            const matchingBet = storedBets.find(bet =>
                bet.clanTag === clanTag &&
                bet.difficulty === difficulty &&
                !bet.claimed
            );

            if (matchingBet) {
                console.log("Found matching bet:", matchingBet);
            }

            console.log("Sending claim transaction with:", {
                proof: proofData.proof,
                publicSignals: proofData.publicSignals,
                multiplier: payoutMultiplier
            });

            // Call the claimReward function with proof, publicSignals, and multiplier
            claimReward(proofData.proof, proofData.publicSignals, payoutMultiplier);

            // Mark the bet as claimed in localStorage if it exists
            if (matchingBet) {
                matchingBet.claimed = true;
                matchingBet.claimTimestamp = Date.now();
                localStorage.setItem('skillBets', JSON.stringify(storedBets));
            }

            setRewardClaimed(true);
            setClaimingReward(false);
        } catch (error) {
            console.error('Error claiming reward:', error.message);
            let errorMessage = error.message || 'Failed to claim reward. Please try again.';

            // Check for common errors and provide more helpful messages
            if (errorMessage.includes('user rejected')) {
                errorMessage = 'Transaction was rejected in your wallet. Please try again.';
            } else if (errorMessage.includes('Invalid ZK proof')) {
                errorMessage = 'Verification failed. The proof could not be validated.';
            } else if (errorMessage.includes('Already claimed')) {
                errorMessage = 'This reward has already been claimed.';
            } else if (errorMessage.includes('No bet placed')) {
                errorMessage = 'No bet was found for this account. Please place a bet first.';
            }

            setWalletError(errorMessage);
            setClaimingReward(false);
        }
    };

    return (
        <div className="min-h-screen pt-16 bg-gray-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center mb-8">
                    <Link
                        to={`/coc-bets/${difficulty}`}
                        className={`flex items-center text-gray-400 hover:${theme.light} transition-colors mr-4`}
                    >
                        <ArrowLeftIcon className="h-5 w-5 mr-1" />
                        <span>Back</span>
                    </Link>
                    <h1 className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${theme.primary} pb-1`}>
                        Challenge Results
                    </h1>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
                    </div>
                ) : error ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-500/10 rounded-xl p-6 border border-red-500/30 text-center"
                    >
                        <XCircleIcon className="h-16 w-16 text-red-400 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-white mb-2">Error</h2>
                        <p className="text-gray-300 mb-4">{error}</p>
                        <Link to={`/coc-bets/${difficulty}`}>
                            <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg">
                                Try Again
                            </button>
                        </Link>
                    </motion.div>
                ) : (
                    <>
                        {/* Results Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-gray-800 rounded-xl p-6 mb-8 border border-gray-700"
                        >
                            {/* Result Header */}
                            <div className="text-center mb-8">
                                {win ? (
                                    <div className="mb-6">
                                        <CheckCircleIcon className="h-20 w-20 text-green-500 mx-auto mb-4" />
                                        <h2 className="text-3xl font-bold text-green-400">Challenge Completed!</h2>
                                        <p className="text-xl text-gray-300 mt-2">
                                            Congratulations! Your destruction percentage exceeded your expectation.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="mb-6">
                                        <XCircleIcon className="h-20 w-20 text-red-500 mx-auto mb-4" />
                                        <h2 className="text-3xl font-bold text-red-400">Challenge Failed</h2>
                                        <p className="text-xl text-gray-300 mt-2">
                                            Unfortunately, your destruction percentage didn't meet your expectation.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Battle Details */}
                            <div className="grid md:grid-cols-2 gap-8 mb-8">
                                <div className="bg-gray-900/50 rounded-lg p-4">
                                    <h3 className="text-lg font-medium text-gray-300 mb-4">Your Stats</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Clan Name:</span>
                                            <span className="text-white font-medium">{results.clanName}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Expected Destruction:</span>
                                            <span className={`font-medium ${theme.light}`}>{expectedDestructionPercentage}%</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Actual Destruction:</span>
                                            <span className={`font-medium text-xl ${win ? 'text-green-400' : 'text-red-400'}`}>
                                                {results.clanDestruction}%
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-900/50 rounded-lg p-4">
                                    <h3 className="text-lg font-medium text-gray-300 mb-4">War Details</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Opponent Clan:</span>
                                            <span className="text-white font-medium">{results.opponentName}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Opponent Destruction:</span>
                                            <span className="text-white font-medium">{results.opponentDestruction}%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payout Details */}
                            <div className={`${win ? theme.bg : 'bg-gray-800'} rounded-lg p-6 border ${win ? theme.border : 'border-gray-700'} text-center`}>
                                {win ? (
                                    <>
                                        <h3 className={`text-xl font-bold ${theme.light} mb-2`}>
                                            Payout Information
                                        </h3>
                                        <p className="text-gray-300 mb-4">
                                            Your bet of {betAmount} ETH has been processed with a {payoutMultiplier}x multiplier.
                                        </p>
                                        <div className="bg-gray-900/50 rounded-lg p-4 inline-block">
                                            <p className="text-gray-400">Total Payout:</p>
                                            <p className="text-2xl font-bold text-white">
                                                {totalPayout} ETH
                                            </p>
                                        </div>

                                        {/* Wallet connection and reward claiming */}
                                        <div className="mt-6">
                                            {rewardClaimed ? (
                                                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                                                    <CheckCircleIcon className="h-8 w-8 text-green-500 mx-auto mb-2" />
                                                    <p className="text-green-400 font-medium">Reward claimed successfully!</p>
                                                    <p className="text-sm text-gray-400 mt-2">
                                                        {totalPayout} ETH has been transferred to your wallet.
                                                    </p>
                                                </div>
                                            ) : (
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={handleClaimReward}
                                                    disabled={claimingReward}
                                                    className={`flex items-center justify-center mx-auto bg-gradient-to-r ${theme.primary} text-white font-bold py-3 px-8 rounded-lg ${claimingReward ? 'opacity-70 cursor-not-allowed' : ''}`}
                                                >
                                                    {claimingReward ? (
                                                        <>
                                                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                                                            Processing...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <CurrencyDollarIcon className="h-5 w-5 mr-2" />
                                                            {walletConnected ? 'Claim Reward' : 'Connect Wallet & Claim'}
                                                        </>
                                                    )}
                                                </motion.button>
                                            )}

                                            {walletError && (
                                                <p className="text-red-400 text-sm mt-2">{walletError}</p>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h3 className="text-xl font-bold text-red-400 mb-2">
                                            Better Luck Next Time
                                        </h3>
                                        <p className="text-gray-300">
                                            Your bet of {betAmount} ETH did not meet the required destruction percentage.
                                        </p>
                                        <p className="text-sm text-gray-400 mt-4">
                                            Try again with a different strategy or lower expected destruction percentage.
                                        </p>
                                    </>
                                )}
                            </div>
                        </motion.div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/coc-bets" className="flex-1">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg"
                                >
                                    Back to Challenges
                                </motion.button>
                            </Link>
                            <Link to={`/coc-bets/${difficulty}`} className="flex-1">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`w-full bg-gradient-to-r ${theme.primary} text-white font-bold py-3 px-4 rounded-lg`}
                                >
                                    Try Again
                                </motion.button>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default BetResultsPage; 