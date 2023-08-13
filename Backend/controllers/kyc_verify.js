const { ethers } = require("ethers");

async function kycVerifyUser(wallet_address) {
    const privateKey = "503259ad1995c4d6c1ff137b9cf9458d8ae431c53bd3b517e4b918d6546a6da5";
    const infuraApiKey = "871a013c7c6847ab848c305add3fa472";
    contractAddress = "0x605b246eeE74010959B4fD434FFC90b5c3d85C13";
    const contractABI = [
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                    }
                ],
                "name": "KYCVerified",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                    }
                ],
                "name": "checkKYCStatus",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "kycStatus",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                    }
                ],
                "name": "revokeKYC",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                    }
                ],
                "name": "verifyKYC",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }

  ];

  const provider = new ethers.providers.InfuraProvider("sepolia", infuraApiKey);

  const wallet = new ethers.Wallet(privateKey, provider);

  const contract = new ethers.Contract(contractAddress, contractABI, wallet);

  try {
    const tx = await contract.verifyKYC(wallet_address);
    await tx.wait();
    
    console.log(`KYC verified address ${wallet_address}`);
    console.log(`Transaction hash:`, tx.hash);
    return tx.hash;
  } catch (error) {
    console.error("Error transferring tokens:", error);
  }
}

module.exports = kycVerifyUser;
