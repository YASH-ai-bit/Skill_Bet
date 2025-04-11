import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CurrencyDollarIcon, TrophyIcon, XCircleIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

// Sample data for bets - using AI for now later will fetch using api and update using contracts and all
const sampleWinningBets = [
    { id: 1, game: 'Valorant', amount: 50, payout: 125, date: '2023-05-10', opponent: 'Player123' },
    { id: 2, game: 'CS:GO', amount: 75, payout: 180, date: '2023-05-15', opponent: 'GamerXYZ' },
    { id: 3, game: 'League of Legends', amount: 100, payout: 210, date: '2023-05-20', opponent: 'LOLMaster' },
    { id: 4, game: 'Dota 2', amount: 60, payout: 150, date: '2023-05-25', opponent: 'DotaKing' },
];

const sampleLosingBets = [
    { id: 5, game: 'Valorant', amount: 40, date: '2023-05-12', opponent: 'ShotMaster' },
    { id: 6, game: 'CS:GO', amount: 85, date: '2023-05-18', opponent: 'HeadshotPro' },
    { id: 7, game: 'Dota 2', amount: 65, date: '2023-05-22', opponent: 'DotaGod' },
];

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState('summary');

    // Use useMemo to calculate stats only when dependencies change
    const stats = useMemo(() => {
        const totalWon = sampleWinningBets.reduce((sum, bet) => sum + bet.payout, 0);
        const totalStaked = sampleWinningBets.reduce((sum, bet) => sum + bet.amount, 0) +
            sampleLosingBets.reduce((sum, bet) => sum + bet.amount, 0);
        const totalLost = sampleLosingBets.reduce((sum, bet) => sum + bet.amount, 0);
        const netProfit = totalWon - totalStaked;
        const winRate = Math.round((sampleWinningBets.length / (sampleWinningBets.length + sampleLosingBets.length)) * 100);

        return {
            totalWon,
            totalStaked,
            totalLost,
            netProfit,
            winRate
        };
    }, []); // Empty dependency array since sample data doesn't change

    return (
        <main className="min-h-screen bg-gray-900 pt-16">
            <div className="max-w-7xl mx-auto pt-10 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-8"
                >
                    <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="bg-gray-800 rounded-lg p-6 shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm">Total Won</p>
                                    <p className="text-2xl font-bold text-green-500">${stats.totalWon}</p>
                                </div>
                                <div className="rounded-full p-3 bg-green-500/10">
                                    <TrophyIcon className="h-6 w-6 text-green-500" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-6 shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm">Total Lost</p>
                                    <p className="text-2xl font-bold text-red-500">${stats.totalLost}</p>
                                </div>
                                <div className="rounded-full p-3 bg-red-500/10">
                                    <XCircleIcon className="h-6 w-6 text-red-500" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-6 shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm">Net Profit</p>
                                    <div className="flex items-center">
                                        <p className={`text-2xl font-bold ${stats.netProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                            ${Math.abs(stats.netProfit)}
                                        </p>
                                        {stats.netProfit >= 0 ? (
                                            <ArrowUpIcon className="h-4 w-4 text-green-500 ml-1" />
                                        ) : (
                                            <ArrowDownIcon className="h-4 w-4 text-red-500 ml-1" />
                                        )}
                                    </div>
                                </div>
                                <div className={`rounded-full p-3 ${stats.netProfit >= 0 ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                                    <CurrencyDollarIcon className={`h-6 w-6 ${stats.netProfit >= 0 ? 'text-green-500' : 'text-red-500'}`} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-6 shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm">Win Rate</p>
                                    <p className="text-2xl font-bold text-blue-500">{stats.winRate}%</p>
                                </div>
                                <div className="rounded-full p-3 bg-blue-500/10">
                                    <div className="h-6 w-6 rounded-full border-2 border-blue-500 flex items-center justify-center text-blue-500 font-bold">
                                        %
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="border-b border-gray-700 mb-6">
                        <div className="flex space-x-8">
                            <button
                                onClick={() => setActiveTab('summary')}
                                className={`py-4 px-1 font-medium text-sm border-b-2 ${activeTab === 'summary'
                                    ? 'border-purple-500 text-purple-500'
                                    : 'border-transparent text-gray-400 hover:text-gray-300'
                                    }`}
                            >
                                Summary
                            </button>
                            <button
                                onClick={() => setActiveTab('wins')}
                                className={`py-4 px-1 font-medium text-sm border-b-2 ${activeTab === 'wins'
                                    ? 'border-purple-500 text-purple-500'
                                    : 'border-transparent text-gray-400 hover:text-gray-300'
                                    }`}
                            >
                                Wins
                            </button>
                            <button
                                onClick={() => setActiveTab('losses')}
                                className={`py-4 px-1 font-medium text-sm border-b-2 ${activeTab === 'losses'
                                    ? 'border-purple-500 text-purple-500'
                                    : 'border-transparent text-gray-400 hover:text-gray-300'
                                    }`}
                            >
                                Losses
                            </button>
                        </div>
                    </div>

                    {/* Tab content */}
                    {activeTab === 'summary' && (
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Recent Winning Bets</h2>
                                <div className="bg-gray-800 rounded-lg overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-700">
                                        <thead className="bg-gray-700/50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Game</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Opponent</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Amount</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Payout</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-700">
                                            {sampleWinningBets.slice(0, 3).map((bet) => (
                                                <tr key={bet.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{bet.game}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{bet.opponent}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{bet.date}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">${bet.amount}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">${bet.payout}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold mb-4">Recent Losing Bets</h2>
                                <div className="bg-gray-800 rounded-lg overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-700">
                                        <thead className="bg-gray-700/50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Game</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Opponent</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Amount Lost</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-700">
                                            {sampleLosingBets.slice(0, 3).map((bet) => (
                                                <tr key={bet.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{bet.game}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{bet.opponent}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{bet.date}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">${bet.amount}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'wins' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">All Winning Bets</h2>
                            <div className="bg-gray-800 rounded-lg overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-700">
                                    <thead className="bg-gray-700/50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Game</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Opponent</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Amount</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Payout</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Profit</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-700">
                                        {sampleWinningBets.map((bet) => (
                                            <tr key={bet.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{bet.game}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{bet.opponent}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{bet.date}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">${bet.amount}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">${bet.payout}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">${bet.payout - bet.amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'losses' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">All Losing Bets</h2>
                            <div className="bg-gray-800 rounded-lg overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-700">
                                    <thead className="bg-gray-700/50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Game</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Opponent</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Amount Lost</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-700">
                                        {sampleLosingBets.map((bet) => (
                                            <tr key={bet.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{bet.game}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{bet.opponent}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{bet.date}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">${bet.amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </main>
    );
} 