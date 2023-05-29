//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./KYCContract.sol";

contract DolmenMallREITToken {
    
    string public name = "DolmenMall REIT Token";
    string public symbol = "DMRT";
    uint256 public totalSupply = 1000;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    address public owner;
    KYCContract kyc;

    constructor(address _kycAddress) {
        balanceOf[msg.sender] = totalSupply;
        owner = msg.sender;
        kyc = KYCContract(_kycAddress);

    }
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    function transfer(address to, uint256 value) public returns (bool) {
        require(msg.sender == owner, "Only the deployer can call this function");
        require(kyc.checkKYCStatus(to), "Recipient is not KYC verified");
        require(value <= balanceOf[msg.sender], "Insufficient balance");
        require(value >= 1, "Tokens transferred should always be equal or greater than 1");
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }
    
    
    function transferFrom(address from, address to, uint256 value) public returns (bool) {
        require(kyc.checkKYCStatus(from), "Sender is not KYC verified");
        require(kyc.checkKYCStatus(to), "Recipient is not KYC verified");
        require(value <= balanceOf[from], "Insufficient balance");
        require(value >= 1, "Tokens transferred should always be equal or greater than 1");
        balanceOf[from] -= value;
        balanceOf[to] += value;
        emit Transfer(from, to, value);
        return true;
    }
    
    function getTokensBack(address to, uint256 value) public returns (bool) {
        require(msg.sender == owner, "Only the deployer can call this function");
        require(value <= balanceOf[to], "Insufficient balance");
        require(value >= 1, "Tokens transferred should always be equal or greater than 1");
        balanceOf[to] -= value;
        balanceOf[msg.sender] += value;
        emit Transfer(to, msg.sender, value);
        return true;
    }
}