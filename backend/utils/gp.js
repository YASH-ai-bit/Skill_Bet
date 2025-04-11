import path from "path";
import * as snarkjs from "snarkjs";

export async function generateProof(actual, expected) {
  const inputs = {
    expected,
    actual
  };

  const wasmPath = path.join(process.cwd(), "../backend/circuit/build/circuit_js/circuit.wasm");
  const zkeyPath = path.join(process.cwd(), "../backend/circuit/build/proving_key.zkey");

  try {
    const { proof, publicSignals } = await snarkjs.plonk.fullProve(inputs, wasmPath, zkeyPath);

    const calldataBlob = await snarkjs.plonk.exportSolidityCallData(proof, publicSignals);
    console.log("Calldata Blob:", calldataBlob);

    const regex = /\[.*?\]/g;
    const matches = calldataBlob.match(regex);

    if (!matches || matches.length < 2) {
      throw new Error("Invalid calldata format");
    }

    // ✅ Use new variable names
    const formattedProof = JSON.parse(matches[0]); // plonk proof is a single hex string
    const formattedPublicSignals = JSON.parse(matches[1]);

    // Optional logic
    const isWinner = formattedPublicSignals[0] === "0x0000000000000000000000000000000000000000000000000000000000000001" ? 1 : 0;

    return {
      proof: formattedProof,
      publicSignals: formattedPublicSignals,
      isWinner,
      result: {
        actual,
        expected,
        passed: isWinner === 1
      }
    };
  } catch (err) {
    console.error("Proof generation failed:", err);
    return {
      proof: "",
      publicSignals: [],
      isWinner: null,
      error: err.message
    };
  }
}
