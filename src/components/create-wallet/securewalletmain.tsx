import React, { useEffect, useState } from 'react';
import { BgSecureWallet } from '../../assets';
import { PrimaryButton, SecondaryButton, NavigationBarTitle } from '../index';
import Stepper from '../create-wallet/stepper';
import { useAppContext } from '../../context/useappcontext';
import { useNavigate } from 'react-router-dom';
import { generateWalletApi } from '../../helpers/common/api.helper';
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

const SecureWalletMain: React.FC<SecureWalletMainProps> = ({
  steps,
  active,
  done,
  setDone,
  setActive,
  setSubActive,
}) => {
  const [secretphrase, setPsecretPhrases] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    setSubActive(1);
  };

  const {
    setSecretPhrase,
    setMnemonicsArr,
    setPrivateKey,
    setWallet,
    setPrivateKeyArr,
  } = useAppContext();

  const handleWalletCreation = async () => {
    try {
      const response = await generateWalletApi();
      if (response?.data?.response?.status === 200) {
        setSecretPhrase(response?.data?.response?.data?.secretPhrase);
        setMnemonicsArr(
          response?.data?.response?.data?.secretPhrase.split(' ')
        );
        setPrivateKey(response?.data?.response?.data?.privateKey);
        setWallet(response?.data?.response?.data?.publicKey);
        setPrivateKeyArr(response?.data?.response?.data?.privateKeyArr);
        navigate('/wallet-account');
      }
    } catch (error) {
      console.error('Error generating wallet', error);
    }
  };

  const generateWallet = async () => {
    try {
      const response = await generateWalletApi();
      if (response?.data?.response?.status === 200) {
        setPsecretPhrases(response?.data?.response?.data?.secretPhrase);
        setSecretPhrase(response?.data?.response?.data?.secretPhrase);
        setMnemonicsArr(
          response?.data?.response?.data?.secretPhrase.split(' ')
        );
        setPrivateKey(response?.data?.response?.data?.privateKey);
        setWallet(response?.data?.response?.data?.publicKey);
        setPrivateKeyArr(response?.data?.response?.data?.privateKeyArr);
      }
    } catch (error) {
      console.error('Error generating wallet', error);
      return { success: false, error: 'Failed to create wallet' };
    }
  };

  useEffect(() => {
    generateWallet();
  }, []);

  console.log('secretphrase', secretphrase);

  return (
    <div
      className="relative flex flex-col items-center  w-full max-w-[375px] bg-no-repeat bg-cover bg-center rounded-[20px] pt-[26px] pr-[23px] pb-[19px] pl-[20px]"
      style={{ backgroundImage: `url(${BgSecureWallet})` }}
    >
      <div className="w-full">
        <NavigationBarTitle
          title="Add a wallet"
          callback={() => {
            setActive(0);
            setDone([]);
          }}
        />
      </div>
      <div className="w-full overflow-auto pt-[32px]">
        <Stepper steps={steps} active={active} done={done} />
        <h2 className="text-[20px] font-medium text-white text-center pb-[12px]">
          Secure wallet
        </h2>
        <p className="text-white text-[14px] font-[500] pb-[22px]">
          It is advisable to secure your seed phrase because it is the
          <strong> "master key"</strong> to your wallet. Never give it out.{' '}
          <span className="text-white cursor-pointer text-[14px] font-bold">
            Learn more
          </span>
        </p>
        <div className="text-left">
          <h3 className="text-[14px] font-bold text-white pb-[5px]">
            How do I save my Secret Recovery Phrase?
          </h3>
          <ul className="ml-4 text-white font-normal list-disc text-[12px]">
            <li className="pb-[2px]">
              Write down and store in multiple secret places
            </li>
            <li>Store in a safe deposit box</li>
          </ul>
        </div>
        <div
          className="bg-[#2A2E4F] rounded-xl h-[89px] w-full mt-[32px] mb-[29px]"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px',
          }}
        >
          <p
            className="text-[14px] text-white font-[600] text-start"
            style={{ lineHeight: '22px' }}
          >
            If someone asks for your recovery phrase, they are likely trying to
            scam you and steal your funds
          </p>
        </div>
        <div className="pb-[2px]">
          <SecondaryButton
            onClick={handleWalletCreation}
            title={'Remind me later (not recommended)'}
          />
        </div>
        <PrimaryButton
          onClick={() => {
            if (secretphrase) {
              handleNext();
            }
          }}
          title={'Secure my wallet (recommended)'}
        />
      </div>
    </div>
  );
};

export default SecureWalletMain;
