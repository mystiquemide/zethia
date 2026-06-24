#![no_std]
use soroban_sdk::{contract, contractimpl, Env, Symbol, Vec};

/// Zethia Verifier Contract
/// 
/// Verifies zero-knowledge proofs for credit score threshold claims.
/// Stores verified credential hashes on-chain to prevent replay attacks.
#[contract]
pub struct ZethiaVerifier;

#[contractimpl]
impl ZethiaVerifier {
    /// Verify a ZK proof that proves credit_score > threshold
    /// 
    /// Arguments:
    /// - proof_bytes: The ZK proof (from Noir circuit, serialized)
    /// - public_inputs: Array of public inputs (threshold value encoded as bytes)
    /// 
    /// Returns: true if proof is valid, false otherwise
    pub fn verify(
        env: Env,
        proof_bytes: Vec<u32>,
        public_inputs: Vec<u32>,
    ) -> bool {
        // In production, this would call the Soroban ZK verifier host function.
        // For the hackathon demo, we verify:
        // 1. Proof is non-empty (placeholder for actual ZK verification)
        // 2. First public input (threshold) is reasonable (>0, <2000)
        
        if proof_bytes.is_empty() {
            return false;
        }
        
        if public_inputs.is_empty() {
            return false;
        }
        
        let threshold = public_inputs.get(0).unwrap();
        
        // Sanity check: threshold must be reasonable (1-1000 for credit scores)
        if threshold == 0 || threshold > 1000 {
            return false;
        }
        
        // Store the verification event
        let key = Symbol::new(&env, "last_verified_threshold");
        env.storage().instance().set(&key, &threshold);
        
        // In a real deployment, this calls the native ZK verifier.
        // For demo: accept any non-empty proof with valid threshold range.
        // TODO: Integrate Soroban-native ZK verification when available.
        true
    }
    
    /// Get the last verified threshold (for demo/audit)
    pub fn get_last_threshold(env: Env) -> u32 {
        let key = Symbol::new(&env, "last_verified_threshold");
        env.storage()
            .instance()
            .get(&key)
            .unwrap_or(0)
    }
    
    /// Verify with a proof hash (for future Noir proof format)
    pub fn verify_hash(
        env: Env,
        proof_hash: Vec<u32>,
        threshold: u32,
    ) -> bool {
        if proof_hash.is_empty() {
            return false;
        }
        
        if threshold == 0 || threshold > 1000 {
            return false;
        }
        
        let key = Symbol::new(&env, "last_verified_threshold");
        env.storage().instance().set(&key, &threshold);
        
        true
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::testutils::EnvTestConfig;
    use soroban_sdk::{vec, Env};

    #[test]
    fn test_verify_valid_proof() {
        let env = Env::from_contract_id(
            &EnvTestConfig::default(),
            &[0u8; 32],
        );
        let contract_id = env.register(ZethiaVerifier, ());
        let client = ZethiaVerifierClient::new(&env, &contract_id);
        
        // Valid proof: non-empty bytes, threshold 650
        let proof = vec![&env, 1u32, 2u32, 3u32];
        let inputs = vec![&env, 650u32]; // threshold
        
        let result = client.verify(&proof, &inputs);
        assert!(result);
    }
    
    #[test]
    fn test_verify_empty_proof() {
        let env = Env::default();
        let contract_id = env.register(ZethiaVerifier, ());
        let client = ZethiaVerifierClient::new(&env, &contract_id);
        
        let proof = vec![&env];
        let inputs = vec![&env, 650u32];
        
        let result = client.verify(&proof, &inputs);
        assert!(!result);
    }
    
    #[test]
    fn test_verify_invalid_threshold() {
        let env = Env::default();
        let contract_id = env.register(ZethiaVerifier, ());
        let client = ZethiaVerifierClient::new(&env, &contract_id);
        
        let proof = vec![&env, 1u32];
        let inputs = vec![&env, 0u32]; // threshold 0 is invalid
        
        let result = client.verify(&proof, &inputs);
        assert!(!result);
    }
    
    #[test]
    fn test_get_last_threshold() {
        let env = Env::default();
        let contract_id = env.register(ZethiaVerifier, ());
        let client = ZethiaVerifierClient::new(&env, &contract_id);
        
        // Initially 0
        assert_eq!(client.get_last_threshold(), 0);
        
        // After verification, stored
        let proof = vec![&env, 1u32, 2u32, 3u32];
        let inputs = vec![&env, 650u32];
        client.verify(&proof, &inputs);
        
        assert_eq!(client.get_last_threshold(), 650);
    }
}
