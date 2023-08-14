const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");


const getTokenDataFromSmartContract = async (address) => {
  try {
    if (!Moralis.Core.isStarted) {
      // If not, start it with your API key and server URL
      await Moralis.start({
        apiKey: "jvDJEMM3ObxfD9z7y5Okpb09S6zC6LZqgPRmSMXNErnTADFKSKFxPEpqdvoXVPwo",
      });
    }
  
    const response = await Moralis.EvmApi.token.getTokenMetadata({
      "chain": "0xaa36a7",
      "addresses": [
       address
      ]
    });
    response_json = {smart_contract_address:address,response:response.raw}
    console.log(response_json);
    return(response_json);
  } catch (e) {
    console.error(e);
  }
}
// getTokenDataFromSmartContract("0x0073CD1A0312758473ab56488946cCFc82EA89A9");
module.exports = getTokenDataFromSmartContract
// import Moralis from 'moralis';

// try {
//   await Moralis.start({
//     apiKey: "jvDJEMM3ObxfD9z7y5Okpb09S6zC6LZqgPRmSMXNErnTADFKSKFxPEpqdvoXVPwo"
//   });

//   const response = await Moralis.EvmApi.token.getTokenMetadata({
//     "chain": "0xaa36a7",
//     "addresses": [
//       "0x0073CD1A0312758473ab56488946cCFc82EA89A9"
//     ]
//   });

//   console.log(response.raw);
// } catch (e) {
//   console.error(e);
// }