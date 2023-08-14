const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");

const getTokenDataFromSmartContract = async () => {
  try {
    await Moralis.start({
      apiKey: "jvDJEMM3ObxfD9z7y5Okpb09S6zC6LZqgPRmSMXNErnTADFKSKFxPEpqdvoXVPwo"
    });
  
    const response = await Moralis.EvmApi.token.getTokenMetadata({
      "chain": "0xaa36a7",
      "addresses": [
        "0x0073CD1A0312758473ab56488946cCFc82EA89A9"
      ]
    });
    response_json = {smart_contract_address:'0x0073CD1A0312758473ab56488946cCFc82EA89A9',response:response.raw}
    console.log(response_json);
    return(response_json);
  } catch (e) {
    console.error(e);
  }
}
getTokenDataFromSmartContract();
// module.exports = {runApp}
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