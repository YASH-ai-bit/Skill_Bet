// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface IPlonkVerifier {
    function verifyProof(uint256[24] calldata proof, uint256[] memory pubSignals) external view returns (bool);
}

contract zkBet {
    address public s_plonkVerifierAddress;
    mapping(address => uint256) public userBets;
    mapping(address => bool) public hasClaimed;

    event BetPlaced(address indexed user, uint256 amount);
    event RewardClaimed(address indexed user, uint256 amount);
    event ProofFailed(address indexed user);

    constructor(address plonkVerifierAddress) {
        s_plonkVerifierAddress = plonkVerifierAddress;
    }

    // Step 1: User places a bet
    function placeBet() external payable {
        require(msg.value > 0, "Bet must be greater than 0");
        require(!hasClaimed[msg.sender], "Already claimed");

        userBets[msg.sender] = msg.value;
        emit BetPlaced(msg.sender, msg.value);
    }

    // Step 2: User submits a proof that they won
    function claimReward(uint256[24] calldata proof, uint256[] memory pubSignals, uint256 multiplier) external {
        require(userBets[msg.sender] > 0, "No bet placed");
        require(!hasClaimed[msg.sender], "Already claimed");

        // Verify the ZK proof
        bool isValid = IPlonkVerifier(s_plonkVerifierAddress).verifyProof(proof, pubSignals);
        require(isValid, "Invalid ZK proof");

        // Check if user won (expected ≤ actual) => isWinner == 1
        require(pubSignals[0] == 1, "Condition not met: not a winner");

        uint256 reward = userBets[msg.sender] * multiplier;
        userBets[msg.sender] = 0;
        hasClaimed[msg.sender] = true;

        (bool sent, ) = msg.sender.call{value: reward}("");
        require(sent, "Transfer failed");

        emit RewardClaimed(msg.sender, reward);
    }
    // Allow contract owner to withdraw unclaimed funds later (optional)
    function emergencyWithdraw(address to) external {
        require(msg.sender == tx.origin, "Only EOA can call this");
        payable(to).transfer(address(this).balance);
    }

    // Accept ETH directly (optional)
    receive() external payable {}
}
