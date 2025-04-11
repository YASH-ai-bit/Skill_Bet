import { ethers } from 'ethers';
const plonkVerifierABI = [
	{
		"inputs": [
			{
				"internalType": "uint256[24]",
				"name": "_proof",
				"type": "uint256[24]"
			},
			{
				"internalType": "uint256[1]",
				"name": "_pubSignals",
				"type": "uint256[1]"
			}
		],
		"name": "verifyProof",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "plonkVerifierAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "BetPlaced",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[24]",
				"name": "proof",
				"type": "uint256[24]"
			},
			{
				"internalType": "uint256[1]",
				"name": "pubSignals",
				"type": "uint256[1]"
			},
			{
				"internalType": "uint256",
				"name": "multiplier",
				"type": "uint256"
			}
		],
		"name": "claimReward",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "emergencyWithdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "placeBet",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "ProofFailed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "RewardClaimed",
		"type": "event"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "hasClaimed",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "s_plonkVerifierAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userBets",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
// Contract address (replace with actual deployed address)
const contractAddress = "0xC55ecE91e68054f4d1f18D615c0D34838C38Df29";
const plonkVerifierAddress = "0x59916371751b428fE97e25BBB31fbf61870E8d72"

// Connect to wallet
export const connectWallet = async () => {
    try {
        // Check if MetaMask is installed
        if (!window.ethereum) {
            throw new Error("MetaMask is not installed. Please install MetaMask to continue.");
        }

        // Request access to the user's Ethereum accounts
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Get the connected wallet address
        const address = accounts[0];

        // Create provider and signer
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        return { address, signer, provider };
    } catch (error) {
        console.error("Error connecting to wallet:", error);
        throw error;
    }
};

// Place bet function
export const placeBet = async (amount) => {
    try {
        if (typeof amount !== "string" && typeof amount !== "number") {
            throw new Error(`Invalid amount type: ${typeof amount}, value: ${JSON.stringify(amount)}`);
        }
        // Connect to wallet
        const { signer } = await connectWallet();
        console.log(amount);

        if (isNaN(amount) || parseFloat(amount) <= 0) {
            console.error("Please enter a valid ETH amount.");
            return;
        }
        // Connect to the contract
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const ethAmount = amount.toString().trim();

        // Parse ETH to wei
        const amountInWei = ethers.utils.parseEther(ethAmount);

        // Call the placeBet function with ETH value
        const tx = await contract.placeBet({ value: amountInWei });

        // Wait for the transaction to be mined
        const receipt = await tx.wait();

        console.log("Bet placed successfully:", receipt);
        return receipt;
    } catch (error) {
        console.error("Error placing bet:", error.message);
        throw error;
    }
};

// Claim reward function using ZK proof
export const claimReward = async (proof, publicSignals, multiplier) => {
    try {
        // Connect to wallet
        const { signer } = await connectWallet();
        // Connect to the contract
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        const plonkVerifier = new ethers.Contract(plonkVerifierAddress, plonkVerifierABI, signer);
        // Get the multiplier based on difficulty level
        const payoutMultiplier = typeof multiplier === 'number'
            ? multiplier
            : multiplier === 'easy' ? 3 : multiplier === 'medium' ? 4 : 5;
          
          try {
            const tx = await contract.claimReward(proof, publicSignals, 1 )
          } catch (error) {
            console.error("Transaction failed:", error.message);
          }
          
    } catch (error) {
        console.error("Error claiming reward:", error.message);
        throw error;
    }
};

// Check if wallet is connected
export const checkWalletConnection = async () => {
    try {
        if (!window.ethereum) return false;

        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        return accounts.length > 0;
    } catch (error) {
        console.error("Error checking wallet connection:", error);
        return false;
    }
};

// Get current wallet address
export const getCurrentWalletAddress = async () => {
    try {
        if (!window.ethereum) return null;

        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        return accounts.length > 0 ? accounts[0] : null;
    } catch (error) {
        console.error("Error getting wallet address:", error);
        return null;
    }
}; 