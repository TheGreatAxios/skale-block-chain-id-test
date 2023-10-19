// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract ChainIdTest {
    
    uint256 public chainId;

    event Create(uint256 indexed chainId);

    constructor() {
        chainId = block.chainid;
        emit Create(block.chainid);
    }
}
