import React from 'react';
import { motion } from 'framer-motion';

export default function AboutPage() {
    return (
        <main className="min-h-screen pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">About SkillBet</h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        The premier platform for skill-based betting in the gaming world
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Mission Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="bg-gray-800/50 rounded-lg p-8"
                    >
                        <h2 className="text-2xl font-bold mb-4 text-purple-400">Our Mission</h2>
                        <p className="mb-4 text-gray-300">
                            SkillBet was founded with a simple mission: to create a fair, transparent, and exciting platform where gamers can compete and bet on their skills.
                        </p>
                        <p className="mb-4 text-gray-300">
                            We believe that skill-based competition should be rewarded, and our platform enables players to put their abilities to the test in a secure environment.
                        </p>
                        <p className="text-gray-300">
                            By leveraging blockchain technology, we've built a platform that ensures transparency, fair play, and immediate payouts.
                        </p>
                    </motion.div>

                    {/* How It Works Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-gray-800/50 rounded-lg p-8"
                    >
                        <h2 className="text-2xl font-bold mb-4 text-blue-400">How It Works</h2>
                        <ul className="space-y-4 text-gray-300">
                            <li className="flex items-start">
                                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-400/20 text-blue-400 mr-3 mt-0.5">1</span>
                                <span>Connect your wallet and deposit funds to your account</span>
                            </li>
                            <li className="flex items-start">
                                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-400/20 text-blue-400 mr-3 mt-0.5">2</span>
                                <span>Challenge other players or accept existing challenges</span>
                            </li>
                            <li className="flex items-start">
                                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-400/20 text-blue-400 mr-3 mt-0.5">3</span>
                                <span>Compete in your favorite games and showcase your skills</span>
                            </li>
                            <li className="flex items-start">
                                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-400/20 text-blue-400 mr-3 mt-0.5">4</span>
                                <span>Winners receive automatic payouts through smart contracts</span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Blockchain Integration Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="bg-gray-800/50 rounded-lg p-8"
                    >
                        <h2 className="text-2xl font-bold mb-4 text-green-400">Blockchain Integration</h2>
                        <p className="mb-4 text-gray-300">
                            Our platform is built on blockchain technology, ensuring transparent transactions and secure betting.
                        </p>
                        <p className="mb-4 text-gray-300">
                            Smart contracts automatically handle bet resolution and payouts, eliminating the need for intermediaries and ensuring fairness.
                        </p>
                        <p className="text-gray-300">
                            We support multiple cryptocurrencies, making it easy for gamers worldwide to participate without currency barriers.
                        </p>
                    </motion.div>

                    {/* Fair Play Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-gray-800/50 rounded-lg p-8"
                    >
                        <h2 className="text-2xl font-bold mb-4 text-pink-400">Fair Play Guarantee</h2>
                        <p className="mb-4 text-gray-300">
                            We take fair play seriously. Our platform employs advanced anti-cheat detection systems to ensure all competitions are legitimate.
                        </p>
                        <p className="mb-4 text-gray-300">
                            Match results are verified through game APIs and, when necessary, by our expert review team to prevent fraud.
                        </p>
                        <p className="text-gray-300">
                            Disputes are handled through a decentralized arbitration system that ensures impartial resolution.
                        </p>
                    </motion.div>
                </div>
            </div>
        </main>
    );
} 