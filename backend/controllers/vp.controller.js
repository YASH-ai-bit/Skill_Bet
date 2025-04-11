import { verifyProofOffChain } from "../utils/vp.js";


export const proofverifier = async (req, res) => {
    const { proof, publicSignals } = req.body;
    console.log(proof, publicSignals);

    try {
        const isvalid = await verifyProofOffChain(proof, publicSignals);
        console.log(isvalid);
        res.json(isvalid); // Return the complete result with proof, publicSignals, and isWinner
    } catch (error) {
        res.status(500).json({ error: "Proof verification failed", details: error.message });
    }
}