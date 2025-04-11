export const fetchProof = async (actual, expected) => {
    try {
        // Ensure both values are numbers
        const actualValue = typeof actual === 'string' ? Number(actual) : actual;
        const expectedValue = typeof expected === 'string' ? Number(expected) : expected;

        const response = await fetch('http://localhost:8080/api/gp', {
            method: 'POST',
            body: JSON.stringify({
                actual: actualValue,
                expected: expectedValue
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch proof: ${response.statusText}`);
        }

        const data = await response.json();

        // Ensure the proof is in the right format for the smart contract
        // The zkBet contract expects the proof as bytes and publicSignals as uint256[]
        return {
            proof: data.proof, // This should be bytes format already from backend
            publicSignals: data.publicSignals, // Array of uint256
            isWinner: data.isWinner, // 0 or 1
            result: data.result // Human readable result
        };
    } catch (error) {
        console.error("Error fetching proof:", error);
        throw error;
    }
};