# Skill Bet

A decentralized betting platform focused on skill-based gaming. Place bets on your gaming skills and earn rewards through verifiable on-chain proofs.

## Overview

Skill Bet is a web3 application that allows users to:
- Place bets on their performance in popular games like Clash of Clans, Valorant, and CS:GO
- Verify their in-game achievements using zero-knowledge proofs
- Claim rewards based on their gaming performance

## Project Structure

### Frontend (React)
- Modern UI built with React, Tailwind CSS, and Framer Motion
- Web3 wallet integration (MetaMask)

### Backend (Node.js)
- Express.js server handling API requests
- MongoDB integration for data persistence
- API routes for different games (Clash of Clans, Valorant, CS:GO)

### Blockchain (Solidity)
- Smart contracts for secure bet placement and reward distribution
- Zero-knowledge proof verification system
- Foundry for testing and deployment

## Technology Stack

### Frontend
- React.js
- Tailwind CSS
- Framer Motion
- ethers.js
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- ZK Proof generation

### Smart Contracts
- Solidity
- Foundry
- Zero-knowledge cryptography (Plonk verifier)

## Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- MetaMask wallet
- Ethereum testnet account with test ETH

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```
   
4. Access the frontend at `http://localhost:3000`

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file based on the example
   - Add your MongoDB connection string
   - Add other required API keys for game integrations

4. Start the server:
   ```
   node server.js
   ```

5. The server will run at `http://localhost:8080`

### Smart Contract Deployment
1. Navigate to the contracts directory:
   ```
   cd backend/contracts
   ```

2. Compile the contracts:
   ```
   forge build
   ```

3. Deploy the contracts to your preferred testnet or local network.

## Features

- **Secure Betting**: Place bets on your gaming skills in a trustless environment
- **ZK Proofs**: Use zero-knowledge proofs to verify game achievements without revealing private data
- **Multiple Games**: Support for Clash of Clans, Valorant, and CS:GO
- **User Dashboard**: Track your bets, winnings, and performance (currently hardcoded, will make backend!)
- **Web3 Integration**: Connect with MetaMask to interact with the blockchain

## Future Enhancements

- Additional game integrations
