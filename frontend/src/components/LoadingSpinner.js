//This portion contains code by AI in high amount!
import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ isLoading }) => {
    if (!isLoading) return null; 

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900"
        >
            <div className="relative flex flex-col items-center">
                {/* Logo/Brand */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600"
                >
                    SkillBet
                </motion.div>

                {/* Spinner */}
                <div className="relative">
                    {/* Outer spinning circle */}
                    <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-24 h-24 rounded-full border-t-4 border-b-4 border-purple-600"
                    />

                    {/* Middle spinning circle (opposite direction) */}
                    <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: -360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute top-2 left-2 w-20 h-20 rounded-full border-r-4 border-l-4 border-pink-500"
                    />

                    {/* Inner pulsing circle */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0.5 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                        className="absolute top-6 left-6 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    />
                </div>

                {/* Loading text */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="mt-8 text-xl text-gray-300"
                >
                    Loading experience...
                </motion.div>
            </div>
        </motion.div>
    );
};

export default LoadingSpinner; 