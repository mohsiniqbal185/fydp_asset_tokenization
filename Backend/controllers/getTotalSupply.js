// // Initialize Moralis with your API key and server URL
// const Moralis = require("moralis");
// const Web3 = require("web3");
//     // If not, start it with your API key and server URL
//     Moralis.start({
//       apiKey: "jvDJEMM3ObxfD9z7y5Okpb09S6zC6LZqgPRmSMXNErnTADFKSKFxPEpqdvoXVPwo",
//     });

// // Define the contract address and ABI
// const contractAddress = "0x0073cd1a0312758473ab56488946ccfc82ea89a9"; // Replace with your contract address
const Moralis = require("moralis").default;

 // Replace with your contract ABI

// // Create a contract instance
// // const contract = new Moralis.web3.eth.Contract(contractAbi, contractAddress);

// // // Run the totalSupply function and get the result
// // const result = Moralis.runContractFunction(contract, "totalSupply");

// // // Convert the result from wei to ether and log it
// // const totalSupply = Moralis.Web3.utils.fromWei(result, "ether");
// const options = {
//     chain: "0xaa36a7",
//     address: contractAddress,
//     function_name: "totalSupply",
//     abi: contractAbi,
//     params: {},
//   };
//   const count = Moralis.Web3API.native.runContractFunction(options); console.log(count)
// console.log("Total supply:", count);
const getTokenSupplyFromSmartContract = async (smartContractAddress) => {
    const contractAbi = [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_symbol",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_totalSupply",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "_kycAddress",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "getTokensBack",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
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
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
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
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
    
try {
    if (!Moralis.Core.isStarted) {
        // If not, start it with your API key and server URL
        await Moralis.start({
          apiKey: "jvDJEMM3ObxfD9z7y5Okpb09S6zC6LZqgPRmSMXNErnTADFKSKFxPEpqdvoXVPwo",
        });
      }
  const response = await Moralis.EvmApi.utils.runContractFunction({
    "chain": "0xaa36a7",
    "functionName": "totalSupply",
    "abi": contractAbi,
    "address": smartContractAddress
  });
  
  console.log(response.raw);
  return(response.raw);
} catch (e) {
  console.error(e);
}
}
module.exports = getTokenSupplyFromSmartContract;
