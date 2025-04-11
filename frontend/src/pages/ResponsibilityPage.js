import React from 'react';
import { motion } from 'framer-motion';

export default function ResponsibilityPage() {
    return (
        <main className="min-h-screen pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Responsible Betting</h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        We are committed to providing a safe and responsible betting environment for all users
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Set Limits Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="bg-gray-800/50 rounded-lg p-8"
                    >
                        <h2 className="text-2xl font-bold mb-4 text-blue-400">Set Limits</h2>
                        <p className="mb-6 text-gray-300">
                            We encourage all users to set personal limits on their betting activity. Our platform provides tools to help you stay in control.
                        </p>
                        <ul className="space-y-3 text-gray-300">
                            <li className="flex items-start">
                                <div className="flex-shrink-0 h-5 w-5 text-blue-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="ml-2">Daily limits on betting amount</span>
                            </li>
                            <li className="flex items-start">
                                <div className="flex-shrink-0 h-5 w-5 text-blue-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="ml-2">Deposit limits to control spending</span>
                            </li>
                            <li className="flex items-start">
                                <div className="flex-shrink-0 h-5 w-5 text-blue-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="ml-2">Loss limits to prevent excessive losses</span>
                            </li>
                            <li className="flex items-start">
                                <div className="flex-shrink-0 h-5 w-5 text-blue-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="ml-2">Time limits for betting sessions</span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Age Verification Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-gray-800/50 rounded-lg p-8"
                    >
                        <h2 className="text-2xl font-bold mb-4 text-green-400">Age Verification</h2>
                        <p className="mb-4 text-gray-300">
                            SkillBet strictly enforces age verification to ensure all users are of legal betting age. We have implemented advanced verification systems to prevent underage gambling.
                        </p>
                        <p className="mb-4 text-gray-300">
                            Our verification process is secure and compliant with regulatory requirements in all jurisdictions where we operate.
                        </p>
                        <p className="text-gray-300">
                            We take our responsibility to prevent underage gambling very seriously and will terminate accounts found to be operated by underage users.
                        </p>
                    </motion.div>

                    {/* Problem Betting Support */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="bg-gray-800/50 rounded-lg p-8"
                    >
                        <h2 className="text-2xl font-bold mb-4 text-purple-400">Problem Betting Support</h2>
                        <p className="mb-6 text-gray-300">
                            We recognize that some individuals may develop problematic betting behaviors. We provide resources and tools to help those who may be experiencing issues.
                        </p>
                        <ul className="space-y-4 text-gray-300">
                            <li className="flex items-start">
                                <div className="flex-shrink-0 h-5 w-5 text-purple-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path d="M3.5 2.75a.75.75 0 00-1.5 0v14.5a.75.75 0 001.5 0v-4.392l1.657-.348a6.449 6.449 0 014.271.572 7.948 7.948 0 005.965.524l2.078-.64A.75.75 0 0018 12.25v-8.5a.75.75 0 00-.904-.734l-2.38.501a7.25 7.25 0 01-4.186-.363l-.502-.2a8.75 8.75 0 00-5.053-.439l-1.475.31V2.75z" />
                                    </svg>
                                </div>
                                <span className="ml-2">Self-exclusion options for users who need a break</span>
                            </li>
                            <li className="flex items-start">
                                <div className="flex-shrink-0 h-5 w-5 text-purple-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="ml-2">Support hotline for immediate assistance</span>
                            </li>
                            <li className="flex items-start">
                                <div className="flex-shrink-0 h-5 w-5 text-purple-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zM6 8a2 2 0 11-4 0 2 2 0 014 0zM1.49 15.326a.78.78 0 01-.358-.442 3 3 0 014.308-3.516 6.484 6.484 0 00-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 01-2.07-.655zM16.44 15.98a4.97 4.97 0 002.07-.654.78.78 0 00.357-.442 3 3 0 00-4.308-3.517 6.484 6.484 0 011.907 3.96 2.32 2.32 0 01-.026.654zM18 8a2 2 0 11-4 0 2 2 0 014 0zM5.304 16.19a.844.844 0 01-.277-.71 5 5 0 019.947 0 .843.843 0 01-.277.71A6.975 6.975 0 0110 18a6.974 6.974 0 01-4.696-1.81z" />
                                    </svg>
                                </div>
                                <span className="ml-2">Referrals to professional counseling services</span>
                            </li>
                            <li className="flex items-start">
                                <div className="flex-shrink-0 h-5 w-5 text-purple-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path d="M10.75 16.82A7.462 7.462 0 0115 15.5c.71 0 1.396.098 2.046.282A.75.75 0 0018 15.06v-11a.75.75 0 00-.546-.721A9.006 9.006 0 0015 3a8.963 8.963 0 00-4.25 1.065V16.82zM9.25 4.065A8.963 8.963 0 005 3c-.85 0-1.673.118-2.454.339A.75.75 0 002 4.06v11a.75.75 0 00.954.721A7.506 7.506 0 015 15.5c1.579 0 3.042.487 4.25 1.32V4.065z" />
                                    </svg>
                                </div>
                                <span className="ml-2">Educational resources on responsible betting</span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Fair Play Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-gray-800/50 rounded-lg p-8"
                    >
                        <h2 className="text-2xl font-bold mb-4 text-pink-400">Fair Play</h2>
                        <p className="mb-4 text-gray-300">
                            Our platform is built on the principle of fair competition. We maintain strict policies against cheating, match-fixing, and any other form of manipulation.
                        </p>
                        <p className="mb-4 text-gray-300">
                            We employ sophisticated systems to detect unusual betting patterns and gameplay anomalies that might indicate unfair play.
                        </p>
                        <p className="text-gray-300">
                            Users found to be engaging in unfair practices will face immediate account suspension and forfeiture of funds, in accordance with our terms of service.
                        </p>
                    </motion.div>
                </div>
            </div>
        </main>
    );
} 