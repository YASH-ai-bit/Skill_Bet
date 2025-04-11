import * as snarkjs from "snarkjs";
import fs from "fs";
export async function verifyProofOffChain(proof, publicSignals) {
  // 1. Load the verification key (from your .zkey file)
  const verificationKey = JSON.parse( fs.readFile("../circuit/build/proving_key.zkey"));

  // 2. Verify the proof
  const isValid = await snarkjs.plonk.verify(
    verificationKey,
    publicSignals,
    proof
  );

  return isValid;
}

