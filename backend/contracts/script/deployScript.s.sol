// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {PlonkVerifier} from "../src/PlonkVerifier.sol";
import {zkBet} from "../src/zkBet.sol";

contract zkDeployScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = uint256(vm.envBytes32("PRIVATE_KEY"));
        vm.startBroadcast(deployerPrivateKey);

        PlonkVerifier pv = new PlonkVerifier();
        zkBet betting_contract = new zkBet(address(pv));

        vm.stopBroadcast();
    }
}