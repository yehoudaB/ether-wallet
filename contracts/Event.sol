// SPDX-License-Identifier: MIT
/*
    WARNING: Please note that this contract has not been audited and as such may not be feasible 
    to deploy to the mainnet as is. The contract acts only as an example to showcase how to develop
    smart contracts in Solidity. It may contain vulnerabilities that are unaccounted for and as such,
    should not be used in real environment. Do your own diligence before deploying any smart contracts
    to the blockchain because once deployed, you cannot modify the contract.
*/
pragma solidity ^0.8.17;
contract Event {
    event DepositEvent(address indexed sender, uint amount, uint timestamp);
    
    function addDepositEvent() public payable {
        emit DepositEvent(msg.sender, msg.value, block.timestamp);
    }
   
}