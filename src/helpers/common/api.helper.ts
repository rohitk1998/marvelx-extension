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
    // if (error?.response?.data?.error?.errorResponse?.errmsg.includes('duplicate key')) {
    //   toast.error(`@${username} is taken already`)
    // }
    return false;
  }
}

const setTransactionPin = async (walletAddress: string, pin: string): Promise<any> => {
  try {
    const response = await axios.post(API_URL.setPin, {
      walletAddress,
      transactionPin: pin
    });

    return response.data
  } catch (error: any) {
    console.error('Error:', error.response ? error.response.data.message : error.message);
    return false;
  }
};


const generate2FA = async (): Promise<any> => {
  try {
    const response = await axios.post(API_URL.generate2FA);
    return response?.data?.data;
  } catch (error) {
    console.log('error generate 2fa', error);
  }
};


const verify2FA = async (token: string, userSecret: string, walletAddress: string): Promise<any> => {
  try {
    const response = await axios.post(API_URL.verify2FA, {
      token,
      userSecret,
      walletAddress
    });
    return response?.data;
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
    return response?.data;
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
    return response?.data;
  } catch (error: any) {
    console.log('error updating profile', error?.response?.data?.error?.errorResponse?.errmsg);
    if (error?.response?.data?.error?.errorResponse?.errmsg.includes('duplicate key')) {
      toast.error(`@${username} is taken already`)
    }
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
  setTransactionPin,
  generate2FA,
  verify2FA,
  validate2FACode,
  updateProfile,
  recoverByPrivateKey
}