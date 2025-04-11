import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import valorant_image from "../assets/images/valorant_image.jpg";
import coc_image from "../assets/images/coc_image.jpg";
import csgo_image from "../assets/images/csgo_image.jpg";
import { useWallet } from '../context/WalletContext';
import metamaskFox from "../assets/images/metamask-fox.svg";

const games = [
    {
        name: 'Clash Of Clans',
        image: coc_image,
        description: 'A Unique Strategy Based Multiplayer Game',
        route: '/coc-bets'
    },
    {
        name: 'Valorant',
        image: valorant_image,
        description: 'Tactical FPS game with unique agent abilities',
        route: '/valorant-bets'
    },
    {
        name: 'CS:GO',
        image: csgo_image,
        description: 'Classic tactical shooter with competitive gameplay',
        route: '/csgo-bets'
    },
];

// Words to cycle through in the typing animation
const WORDS = ["Skills", "Game", "Plan", "Passion", "Strategy"];
const TYPING_SPEED = 100; // ms per character for typing
const DELETING_SPEED = 50; // ms per character for deleting
const PAUSE_DURATION = 1000; // ms to pause at complete word

export default function HomePage() {
    const { connectWallet, disconnectWallet, account, isConnected } = useWallet();
    const navigate = useNavigate();
    const [isHovering, setIsHovering] = useState(false);
    const [gradientPosition, setGradientPosition] = useState(0);
    const animationRef = useRef(null);
    const lastTimeRef = useRef(0);
    const [localAccount, setLocalAccount] = useState(account); // Local state for wallet address

    // Simplified typing animation state
    const [displayText, setDisplayText] = useState("");
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    // Typing animation logic
    useEffect(() => {
        const currentWord = WORDS[currentWordIndex];

        // Set the timeout for the next character update
        const timeout = setTimeout(() => {
            // If we're deleting characters
            if (isDeleting) {
                // Remove a character
                setDisplayText(prev => prev.substring(0, prev.length - 1));

                // If all characters are deleted, start typing the next word
                if (displayText.length === 1) {
                    setIsDeleting(false);
                    setCurrentWordIndex((currentWordIndex + 1) % WORDS.length);
                }
            }
            // If we're typing characters
            else {
                // Add the next character from the current word
                setDisplayText(prev => currentWord.substring(0, prev.length + 1));

                // If the word is complete, start deleting after a pause
                if (displayText.length === currentWord.length) {
                    setTimeout(() => {
                        setIsDeleting(true);
                    }, PAUSE_DURATION);
                    return;
                }
            }
        }, isDeleting ? DELETING_SPEED : TYPING_SPEED);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentWordIndex]);

    // Handle gradient movement with useRef to avoid re-renders --> Suggested by AI
    useEffect(() => {
        const speed = 0.00008;

        const animate = (time) => {
            if (!lastTimeRef.current) lastTimeRef.current = time;

            const delta = time - lastTimeRef.current;
            lastTimeRef.current = time;

            setGradientPosition(prev => (prev + delta * speed) % 1);
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    const handleConnectWallet = async (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        console.log("HomePage: Connect button clicked");
        try {
            await connectWallet();
        } catch (error) {
            console.error('Error connecting wallet:', error);
        }
    };

    const handleDisconnectWallet = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        console.log("HomePage: Disconnect button clicked, before disconnectWallet()");
        disconnectWallet();
        // Force local state update
        setLocalAccount(null);
        console.log("HomePage: After disconnectWallet(), local state updated");
    };

    // Track changes to wallet state
    useEffect(() => {
        console.log("HomePage: Wallet account changed:", { account, isConnected, localAccount });
        setLocalAccount(account);
    }, [account, isConnected]);

    // Listen for wallet disconnection event
    useEffect(() => {
        const handleWalletDisconnected = () => {
            console.log("HomePage: Received wallet disconnected event");
            setLocalAccount(null);
        };

        window.addEventListener('wallet_disconnected', handleWalletDisconnected);

        return () => {
            window.removeEventListener('wallet_disconnected', handleWalletDisconnected);
        };
    }, []);

    return (
        <main className="min-h-screen relative overflow-hidden pt-16">
            {/* Dynamic Gradient Background */}
            <div
                className="fixed inset-0 pointer-events-none bg-gray-950"
                style={{
                    background: `linear-gradient(
            ${gradientPosition * 360}deg,
            rgba(99, 102, 241, 0.15) 0%,
            rgba(168, 85, 247, 0.15) 20%,
            rgba(236, 72, 153, 0.15) 40%,
            rgba(59, 130, 246, 0.15) 60%,
            rgba(16, 185, 129, 0.15) 80%,
            rgba(99, 102, 241, 0.15) 100%
          )`,
                    backgroundSize: '400% 400%',
                }}
            />

            {/* Subtle Pattern Overlay */}
            <div
                className="fixed inset-0 pointer-events-none opacity-10"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%239C92AC' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundSize: '8px 8px'
                }}
            />

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center z-10 px-4 py-12"
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 tracking-tight pb-3">
                        Bet on Your <span className="inline-block min-w-24">{displayText}</span>
                        <span className="text-purple-500 animate-pulse-subtle">|</span>
                    </h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
                    >
                        Prove your gaming prowess and earn rewards through
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400"> blockchain-powered</span> skill betting
                    </motion.p>

                    <div className="flex justify-center">
                        {localAccount ? (
                            <motion.div
                                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)" }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center bg-gray-800 border border-purple-500/30 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 relative overflow-hidden group shadow-lg"
                                onMouseEnter={() => setIsHovering(true)}
                                onMouseLeave={() => setIsHovering(false)}
                            >
                                <img
                                    src={metamaskFox}
                                    alt="MetaMask"
                                    className="h-7 w-7 mr-3"
                                />
                                <div className="flex flex-col items-start">
                                    <span className="text-sm text-gray-400">Connected Wallet</span>
                                    <span className="font-mono">{localAccount.substring(0, 6)}...{localAccount.substring(localAccount.length - 4)}</span>
                                </div>
                                <button
                                    onClick={handleDisconnectWallet}
                                    className="ml-4 bg-red-600/80 hover:bg-red-700 text-white text-xs font-medium py-1 px-3 rounded-full transition-colors"
                                >
                                    Disconnect
                                </button>
                                {isHovering && (
                                    <motion.div
                                        className="absolute inset-0 bg-purple-500/10 opacity-30"
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 0.3 }}
                                        transition={{ duration: 0.4 }}
                                    />
                                )}
                            </motion.div>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)" }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 relative overflow-hidden group shadow-lg flex items-center"
                                onMouseEnter={() => setIsHovering(true)}
                                onMouseLeave={() => setIsHovering(false)}
                                onClick={handleConnectWallet}
                            >
                                <span className="relative z-10 mr-2">
                                    Connect Wallet
                                </span>
                                <img
                                    src={metamaskFox}
                                    alt="MetaMask"
                                    className="h-6 w-6 relative z-10"
                                />
                                {isHovering && (
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-30"
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 0.3 }}
                                        transition={{ duration: 0.4 }}
                                    />
                                )}
                            </motion.button>
                        )}
                    </div>
                </motion.div>
            </section>

            {/* Games Section */}
            <section className="py-20 bg-gray-900/80 backdrop-blur-lg relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
                    >
                        Popular Games
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.8 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-gray-400 text-center mb-12 max-w-2xl mx-auto"
                    >
                        Select from our curated list of competitive games and start betting on your skills today
                    </motion.p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {games.map((game, index) => (
                            <motion.div
                                key={game.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 relative group border border-gray-700/50"
                                whileHover={{
                                    y: -8,
                                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)",
                                    transition: { duration: 0.3 }
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="aspect-w-16 aspect-h-9 bg-gray-700 relative overflow-hidden">
                                    <div className="w-full h-48 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                                        <img src={game.image} alt="" />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
                                </div>
                                <div className="p-6 relative">
                                    <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-purple-400 transition-colors duration-300">{game.name}</h3>
                                    <p className="text-gray-400 mb-6">{game.description}</p>
                                    <Link to={game.route} className="block w-full">
                                        <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform group-hover:translate-y-0 translate-y-0">
                                            Place Bet
                                        </button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
} 