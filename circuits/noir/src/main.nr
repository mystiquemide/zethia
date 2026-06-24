// Zethia: Credit Score Threshold Proof
// Proves: user's credit_score > threshold
// Without revealing: actual credit_score value
//
// Public inputs (visible to verifier):
//   - threshold: the minimum score required
//
// Private inputs (hidden, known only to prover):
//   - credit_score: the user's actual score

fn main(
    credit_score: u32,    // private — user's actual score
    threshold: u32,       // public — the minimum required
) -> pub bool {
    // Verify the score exceeds the threshold
    // Using strict greater-than for financial safety
    credit_score > threshold
}

#[test]
fn test_score_above_threshold() {
    let result = main(720, 650);
    assert(result == true);
}

#[test]
fn test_score_below_threshold() {
    let result = main(500, 650);
    assert(result == false);
}

#[test]
fn test_score_equals_threshold() {
    // Equal is NOT greater, should return false
    let result = main(650, 650);
    assert(result == false);
}

#[test]
fn test_high_score_high_threshold() {
    let result = main(850, 800);
    assert(result == true);
}

#[test]
fn test_zero_score() {
    let result = main(0, 100);
    assert(result == false);
}
