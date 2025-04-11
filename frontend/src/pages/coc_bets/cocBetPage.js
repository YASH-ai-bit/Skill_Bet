import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import cocVideo from '../../assets/videos/coc_video.webm';

const CocBetPage = () => {
    const [hoveredOption, setHoveredOption] = useState(null);

    const difficultyOptions = [
        {
            id: 'easy',
            title: 'Easy',
            description: 'Lower stakes, perfect for beginners. Win by completing basic village challenges.',
            minBet: 0.01,
            maxPayout: 0.03,
            route: '/coc-bets/easy'
        },
        {
            id: 'medium',
            title: 'Medium',
            description: 'Moderate difficulty challenges requiring tactical skills. Higher stakes and rewards.',
            minBet: 0.025,
            maxPayout: 0.1,
            route: '/coc-bets/medium'
        },
        {
            id: 'hard',
            title: 'Hard',
            description: 'Expert-level challenges. High risk, high reward for proven Clash of Clans masters.',
            minBet: 0.05,
            maxPayout: 0.25,
            route: '/coc-bets/hard'
        }
    ];

    return (
        <div className="min-h-screen pt-16 bg-gray-900 relative overflow-hidden">
            {/* Video Background */}
            <div className="fixed inset-0 z-0 opacity-20">
                <video
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src={cocVideo} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gray-900 bg-opacity-60"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 pb-2">
                        Clash of Clans Betting
                    </h1>
                    <p className="text-xl text-gray-300 ">
                        Select your difficulty level and put your Clash of Clans skills to the test
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 mt-8">
                    {difficultyOptions.map((option, index) => (
                        <motion.div
                            key={option.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="relative h-full"
                        >
                            <Link
                                to={option.route}
                                className="block h-full"
                                onMouseEnter={() => setHoveredOption(option.id)}
                                onMouseLeave={() => setHoveredOption(null)}
                            >
                                <motion.div
                                    whileHover={{ y: -8, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                                    className={`h-full bg-gray-800 rounded-xl overflow-hidden border-2 transition-all duration-300 ${hoveredOption === option.id ? 'border-orange-500' : 'border-gray-700'
                                        }`}
                                >
                                    <div className="p-6 flex flex-col h-full">
                                        <div
                                            className={`text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r ${option.id === 'easy' ? 'from-green-400 to-emerald-500' :
                                                option.id === 'medium' ? 'from-blue-400 to-indigo-500' :
                                                    'from-red-400 to-pink-500'
                                                }`}
                                        >
                                            {option.title}
                                        </div>
                                        <p className="text-gray-300 mb-6">{option.description}</p>
                                        <div className="mt-auto">
                                            <div className="mb-4">
                                                <span className="text-gray-400">Min Bet:</span>{''}
                                                <span className="text-white font-medium">{option.minBet} ETH</span>
                                            </div>
                                            <div className="mb-6">
                                                <span className="text-gray-400">Max Payout:</span>{' '}
                                                <span className="text-white font-medium">{option.maxPayout} ETH</span>
                                            </div>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all ${option.id === 'easy' ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                                                    option.id === 'medium' ? 'bg-gradient-to-r from-blue-500 to-indigo-600' :
                                                        'bg-gradient-to-r from-red-500 to-pink-600'
                                                    }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    window.location.href = option.route;
                                                }}
                                            >
                                                Select {option.title}
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-16 bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700"
                >
                    <h2 className="text-2xl font-bold mb-4 text-orange-400">How It Works</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-xl mb-4">1</div>
                            <h3 className="text-lg font-medium text-white mb-2">Choose Difficulty</h3>
                            <p className="text-gray-400">Select a difficulty level that matches your skill and risk appetite</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-xl mb-4">2</div>
                            <h3 className="text-lg font-medium text-white mb-2">Place Your Bet</h3>
                            <p className="text-gray-400">Set your stake amount and review challenge requirements</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-xl mb-4">3</div>
                            <h3 className="text-lg font-medium text-white mb-2">Complete Challenge</h3>
                            <p className="text-gray-400">Win your challenge to receive automatic payout to your wallet</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CocBetPage;
