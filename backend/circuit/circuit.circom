pragma circom 2.0.0;
include "../node_modules/circomlib/circuits/comparators.circom";

template checkWinner() {
    signal input expected;   
    signal input actual;
    
    signal output isWinner;

    component lt = LessThan(32);
    lt.in[0] <== actual;
    lt.in[1] <== expected;
    
    signal geq;
    geq <== 1 - lt.out;
    isWinner <== geq;

}

component main = checkWinner();