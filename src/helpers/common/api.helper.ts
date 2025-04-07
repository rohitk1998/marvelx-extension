import axios from "axios";
import { API_URL } from "../../constants";
import toast from "react-hot-toast";


const generateWalletApi = async (): Promise<any> => {
  try {
    const response = await axios.get(API_URL.generateWallet);
    return response
  } catch (error: any) {
    return false;
  }
};


const createUserApi = async (walletAddress: string,password:string , username: string): Promise<any> => {
  try {
    const response = await axios.post(API_URL.createUser, {
      walletAddress,
      password,
      username
    });
    return response;
  } catch (error: any) {
    console.log('error updating profile', error);
    if (error?.response?.data?.response?.data[0]?.errorResponse?.errmsg?.includes('duplicate key')) {
      toast.error(`@${username} is taken already`)
    }
    return false;
  }
}

const recoverByPhraseApi = async (secretPhrase: string,password:string): Promise<any> => {
  try {
    const response = await axios.post(API_URL.recoverWalletByPhrase, {
      secretPhrase,
      password
    });
    return response;
  } catch (error: any) {
    console.log('error recovering by phrase', error);
    return false;
  }
}

const setTransactionPin = async (walletAddress: string, pin: string): Promise<any> => {
  try {
    const response = await axios.post(API_URL.setPin, {
      walletAddress,
      pin: pin
    });

    return response;
  } catch (error: any) {
    console.error('Error setting up pin:', error.response);
    return false;
  }
};


const generate2FA = async (): Promise<any> => {
  try {
    const response = await axios.get(API_URL.generate2FA);
    return response;
  } catch (error) {
    console.log('error generate 2fa', error);
    return false;
  }
};


const verify2FA = async (token: string, userSecret: string, walletAddress: string): Promise<any> => {
  try {
    const response = await axios.post(API_URL.verify2FA, {
      token,
      userSecret,
      walletAddress
    });
    return response;
  } catch (error) {
    console.log('error verify 2fa', error);
    return false;
  }
};

const validate2FACode = async (token: string, walletAddress: string): Promise<any> => {
  try {
    const response = await axios.post(API_URL.validate2FA, {
      token,
      walletAddress
    });
    return response;
  } catch (error) {
    console.log('error validate 2fa', error);
    return false;
  }
};

const updateProfile = async (walletAddress: string, username: string): Promise<any> => {
  try {
    const response = await axios.post(API_URL.updateProfile, {
      walletAddress,
      username
    });
    return response;
  } catch (error: any) {
    console.log('error updating profile', error?.response?.data?.response?.data[0]?.errorResponse?.errmsg);
    if (error?.response?.data?.response?.data[0]?.errorResponse?.errmsg?.includes('duplicate key')) {
      toast.error(`@${username} is taken already`)
    }
    return false;
  }
}


const getProfile = async (walletAddress: string): Promise<any> => {
  try {
    const response = await axios.post(API_URL.profile, {
      walletAddress
    });
    return response;
  } catch (error: any) {
    console.log('error updating profile', error?.response?.data?.response?.data);
    return false;
  }
}


const recoverByPrivateKey = async (privateKey: string, password: string) => {
  try {
    const response = await axios.post(API_URL.recoverbyPrivateKey, {
      privateKey,
      password
    });
    return response;
  } catch (error: any) {
    return error;
  }
}

export {
  generateWalletApi,
  createUserApi,
  recoverByPhraseApi,
  setTransactionPin,
  generate2FA,
  verify2FA,
  validate2FACode,
  updateProfile,
  recoverByPrivateKey,
  getProfile
}