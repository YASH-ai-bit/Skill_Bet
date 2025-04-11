import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import valorantVideo from '../../assets/videos/valorant_video.mp4';

const ValorantBetPage = () => {
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
                    <source src={valorantVideo} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gray-900 bg-opacity-60"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-3xl"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 pb-2">
                        Valorant Betting
                    </h1>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-gray-800/70 backdrop-blur-sm p-8 rounded-xl border border-indigo-500/30 mb-8"
                    >
                        <h2 className="text-2xl font-bold mb-4 text-indigo-400">Coming Soon</h2>
                        <p className="text-xl text-gray-300 mb-6">
                            We're working hard to bring you the best Valorant betting experience.
                        </p>
                        <p className="text-gray-400">
                            Our team is developing exciting bet options specifically tailored for Valorant players.
                            Bet on your aim precision, map control strategies, and clutch abilities.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="p-6 bg-gray-800/40 rounded-lg"
                    >
                        <p className="text-gray-300 text-lg font-medium mb-2">Expected Launch:</p>
                        <p className="text-indigo-400 text-xl">Coming this Summer</p>
                    </motion.div>

                    <Link to="/" className="mt-8 inline-block">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 px-4 rounded-lg transition-colors"
                        >
                            <ArrowLeftIcon className="h-4 w-4 mr-2" />
                            Return to Home
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default ValorantBetPage; 