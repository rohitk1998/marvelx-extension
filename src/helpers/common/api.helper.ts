import axios from "axios";
import { API_URL } from "../../constants";
import toast from "react-hot-toast";

const setTransactionPin = async (walletAddress: string, pin: string) => {
  try {
    const response = await axios.post(API_URL.setPin, {
      walletAddress,
      transactionPin: pin
    });

    console.log(response.data.message);
    return response.data
  } catch (error: any) {
    console.error('Error:', error.response ? error.response.data.message : error.message);
    return false;
  }
};


const generate2FA = async () => {
  try {
    const response = await axios.post(API_URL.generate2FA);
    console.log(response?.data?.data?.qrCodeUrl); // Show QR Code
    console.log('2fa qr code url:',response?.data?.data);
    return response?.data?.data;
  } catch (error) {
    console.log('error generate 2fa', error);
  }
};


const verify2FA = async ( token:string , userSecret:string ,walletAddress:string) => {
  try {
    const response = await axios.post(API_URL.verify2FA,{
      token,
      userSecret,
      walletAddress
    });
    console.log('is 2FA verified repsonse:',response);
    return response?.data;
  } catch (error) {
    console.log('error verify 2fa', error);
    return false;
  }
};

const validate2FACode = async ( token:string , walletAddress:string) => {
  try {
    const response = await axios.post(API_URL.validate2FA,{
      token,
      walletAddress
    });
    console.log('2FA validated :',response?.data);
    return response?.data;
  } catch (error) {
    console.log('error validate 2fa', error);
    return false;
  }
};

const updateProfile = async (walletAddress:string,username:string) => {
  try {
    const response = await axios.post(API_URL.updateProfile,{
      walletAddress,
      username
    });
    console.log('update Profile:',response?.data);
    return response?.data;
  } catch (error:any) {
    console.log('error updating profile', error?.response?.data?.error?.errorResponse?.errmsg);
    if(error?.response?.data?.error?.errorResponse?.errmsg.includes('duplicate key')){
     toast.error(`@${username} is taken already`)
    }
    return false;
  }
}


const recoverByPrivateKey = async (privateKey:string,password:string) => {
  try {
    const response = await axios.post(API_URL.recoverbyPrivateKey,{
      privateKey,
      password
    });
    return response;
  } catch (error:any) {
    return error;
  }
}

export {
  setTransactionPin,
  generate2FA,
  verify2FA,
  validate2FACode,
  updateProfile,
  recoverByPrivateKey
}