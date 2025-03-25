import axios from "axios";
import { API_URL } from "../../constants";
async function getAccountTokens(address: string, selectedChain: string):Promise<any>{
  let tokens = [];
  let nfts = [];
  let balance = 0;
  try {
    const res = await axios.get(API_URL.getTokens, {
      params: {
        userAddress: address,
        network: selectedChain,
      },
    });

    const response = res?.data;

    if (response?.tokens?.length > 0) {
      tokens = response?.tokens
    }

    if (response?.nfts?.length > 0) {
      nfts = response?.nfts
    }
    balance = response?.balance

    return {
      tokens: tokens || [],
      balance: balance || 0,
      nfts: nfts || []
    }
  }
  catch (error) {
    console.log("error in balance fetching:", error);
  }
}


export {
  getAccountTokens
}