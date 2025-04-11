import { generateProof } from '../utils/gp.js';

export const proofgenerator = async (req, res) => {
    const { actual, expected } = req.body;
    console.log(actual, expected);
    if (typeof actual !== "number" || typeof expected !== "number") {
        return res.status(400).json({ error: "Invalid input. Numbers expected." });
    }

    try {
        const result = await generateProof(actual, expected);
        res.json(result); // Return the complete result with proof, publicSignals, and isWinner
    } catch (error) {
        res.status(500).json({ error: "Proof generation failed", details: error.message });
    }
}