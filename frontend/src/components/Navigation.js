import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bars3Icon,
    XMarkIcon,
    HomeIcon,
    UserCircleIcon,
    ShieldCheckIcon,
    EnvelopeIcon
} from '@heroicons/react/24/outline';
import logo128 from "../assets/images/logo128.png"
import { useWallet } from '../context/WalletContext';
import metamaskFox from "../assets/images/metamask-fox.svg";

const menuItems = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Dashboard', href: '/dashboard', icon: UserCircleIcon },
    { name: 'About', href: '/about', icon: UserCircleIcon },
    { name: 'Responsibility', href: '/responsibility', icon: ShieldCheckIcon },
    { name: 'Contact', href: '/contact', icon: EnvelopeIcon },
];

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const { account, connectWallet, disconnectWallet } = useWallet();
    const [localAccount, setLocalAccount] = useState(account);

    // Handle disconnect wallet click
    const handleDisconnectClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Navigation: Disconnect button clicked");
        disconnectWallet();
        setLocalAccount(null);
    };

    // Handle connect wallet click
    const handleConnectClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Navigation: Connect button clicked");
        connectWallet();
    };

    // Update local state when wallet context changes
    useEffect(() => {
        console.log("Navigation: Account changed:", account);
        setLocalAccount(account);
    }, [account]);

    // Listen for wallet disconnection event
    useEffect(() => {
        const handleWalletDisconnected = () => {
            console.log("Navigation: Received wallet disconnected event");
            setLocalAccount(null);
        };

        window.addEventListener('wallet_disconnected', handleWalletDisconnected);

        return () => {
            window.removeEventListener('wallet_disconnected', handleWalletDisconnected);
        };
    }, []);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            const nav = document.getElementById('mobile-menu-container');
            if (nav && !nav.contains(event.target) && !event.target.closest('button[aria-label="Toggle menu"]')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close menu when route changes --> suggested by AI
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    return (
        <nav className="fixed items-center w-full z-50 bg-gray-900/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <img className="h-15 m-0 p-0 mr-0" src={logo128} alt="SkillBet Logo" />
                            <span className=" m-0 p-0 mr-0 ml-0 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                                SkillBet
                            </span>
                        </Link>
                    </div>

                    {/* Connect Wallet button - always visible */}
                    <div className="flex items-center">
                        {localAccount ? (
                            <div className="mr-4 bg-gray-800 border border-purple-500/30 text-white text-sm font-medium py-1 px-2 rounded-full transition-all hover:bg-gray-700 flex items-center">
                                <img
                                    src={metamaskFox}
                                    alt="MetaMask"
                                    className="h-6 w-6 mr-2"
                                />
                                <span className="mr-2 hidden sm:inline text-gray-300 font-mono">
                                    {localAccount.substring(0, 6)}...{localAccount.substring(localAccount.length - 4)}
                                </span>
                                <button
                                    onClick={handleDisconnectClick}
                                    className="ml-2 bg-red-600/80 hover:bg-red-700 text-white text-xs font-medium py-1 px-2 rounded-full transition-colors"
                                >
                                    <span className="sm:inline">Disconnect</span>
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={handleConnectClick}
                                className="mr-4 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2 px-4 rounded-full transition-colors flex items-center"
                            >
                                <span className="mr-2">Connect Wallet</span>
                                <img
                                    src={metamaskFox}
                                    alt="MetaMask"
                                    className="h-5 w-5"
                                />
                            </button>
                        )}

                        {/* Hamburger menu button */}
                        <button
                            aria-label="Toggle menu"
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                        >
                            {isOpen ? (
                                <XMarkIcon className="block h-6 w-6" />
                            ) : (
                                <Bars3Icon className="block h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Slide-out menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        id="mobile-menu-container"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="fixed top-0 right-0 h-full w-64 bg-gray-900 shadow-lg z-50"
                    >
                        <div className="flex justify-end p-4">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`flex items-center text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-3 rounded-md text-base font-medium transition-colors ${location.pathname === item.href ? 'bg-gray-800 text-white' : ''
                                        }`}
                                >
                                    <item.icon className="h-5 w-5 mr-3" />
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
} 