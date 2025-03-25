import { useEffect } from 'react';
import { BgRecoveryPhrase } from '../../assets';
import { PrimaryButton, NavigationBarTitle } from '../index';
import MnemonicsBox from './mnemonicsbox';
import Stepper from './stepper';
import { useAppContext } from '../../context/useappcontext';
import axios from "axios";
import { API_URL } from '../../constants';

interface StepType {
  id: number;
  value: number;
  Component: React.FC<{
    steps: StepType[];
    active: number;
    done: number[];
    setDone: Function;
    setActive: Function;
  }>;
}

interface SecureWalletMainProps {
  steps: StepType[];
  active: number;
  done: Array<number>;
  setDone: Function;
  setActive: Function;
  setSubActive: Function;
}

const RevealRecoveryPhrase: React.FC<SecureWalletMainProps> = ({
  steps,
  active,
  done,
  setSubActive,
}) => {

  const {password,setSecretPhrase,setMnemonicsArr,setPrivateKey,setWallet,setPrivateKeyArr} = useAppContext();
  const generateWallet = async () =>{
    try {
      const response = await axios.post(API_URL.createWallet,{
        password: password
      });
      console.log("Wallet Created:", response.data?.data);
      setSecretPhrase(response.data?.data?.secretPhrase);
      setMnemonicsArr(response.data?.data?.secretPhrase.split(" "));
      setPrivateKey(response.data?.data?.privateKey);
      setWallet(response.data?.data?.walletAddress);
      setPrivateKeyArr(response.data?.data?.privateKeyArr);
    } catch (error) {
      console.error("Error creating wallet:", error);
      return { success: false, error: "Failed to create wallet" };
    }
  }

  useEffect(()=>{
    generateWallet();
  },[])
  
  return (
    <div
      className="flex flex-col items-center justify-center w-full max-w-[375px] h-screen max-h-[855px] bg-no-repeat bg-cover bg-center rounded-xl gap-8"
      style={{ backgroundImage: `url(${BgRecoveryPhrase})` }}
    >
      <div className="w-[90%] flex flex-col gap-8">
        <NavigationBarTitle
          title="Add a wallet"
          callback={() => {
            setSubActive(0);
          }}
        />
        <Stepper steps={steps} active={active} done={done} />
        <div className="text-center">
          <h2 className="text-[20px] font-[400] text-white letter-space-2">
            Write down your Secret Recovery Phrase
          </h2>
          <p
            className="px-4 text-[14px] text-start text-white"
            style={{ marginTop: '10px' }}
          >
            Write down the 12-word Secret Recovery Phrase and save it in a place
            you trust and only you can access.
          </p>
        </div>
        <div className="w-full max-w-md text-left">
          <h3 className="mb-2 text-[14px] font-semibold text-white">Tips:</h3>
          <ul className="text-[12px] text-white font-[400] list-disc list-inside">
            <li style={{ marginLeft: '10px', lineHeight: '20px' }}>
              Write down and store in multiple secret places
            </li>
            <li style={{ marginLeft: '10px', lineHeight: '20px' }}>
              Store in a safe deposit box
            </li>
          </ul>
        </div>
        <MnemonicsBox
          isBlur={true}
        />
        <PrimaryButton
          onClick={() => setSubActive(2)}
          title={'Reveal Secret Recovery Phrase'}
        />
      </div>
    </div>
  );
};

export default RevealRecoveryPhrase;
