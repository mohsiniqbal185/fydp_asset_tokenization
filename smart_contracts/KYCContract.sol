//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract KYCContract {
    
    mapping(address => bool) public kycStatus;
    address public owner;
    
    constructor() {
        owner = msg.sender;
    }
    
    event KYCVerified(address indexed user);
    
    function verifyKYC(address user) public {
        require(msg.sender == owner, "Only the deployer can call this function");
        kycStatus[user] = true;
        emit KYCVerified(user);
    }
    
    function revokeKYC(address user) public {
        require(msg.sender == owner, "Only the deployer can call this function");
        kycStatus[user] = false;
    }
    
    function checkKYCStatus(address user) public view returns (bool) {
        return kycStatus[user];
    }
    
}
