import React, { useEffect } from 'react';
import { BgSecureWallet } from '../../assets';
import { PrimaryButton, SecondaryButton, NavigationBarTitle } from '../index';
import Stepper from '../create-wallet/stepper';
import { useAppContext } from '../../context/useappcontext';
import axios from 'axios';
import { API_URL } from '../../constants';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const handleNext = () => {
    setSubActive(1);
    console.log('Next');
  };

  const {
    secretphrase,
    password,
    privatekey,
    privatekeyarr,
    wallet,
    setSecretPhrase,
    setMnemonicsArr,
    setPrivateKey,
    setWallet,
    setPrivateKeyArr,
  } = useAppContext();

  const handleWalletCreation = async () => {
    setWalletAndMnemonic(password);
  };

  function setWalletAndMnemonic(password: string) {
    let accountList;
    try {
      accountList = JSON.parse(localStorage.getItem(password) ?? '{}');
      if (typeof accountList !== 'object' || accountList === null) {
        accountList = {};
      }
    } catch {
      accountList = {};
    }

    const accountKeys = Object.keys(accountList);
    const accountExists = Object.values(accountList).some(
      (account: any) => account.key === privatekey
    );

    if (!accountExists) {
      const newAccountKey = `account${accountKeys.length + 1}`;
      accountList[newAccountKey] = {
        walletName: '',
        key: privatekey,
        publicKey: wallet,
      };
      localStorage.setItem(password, JSON.stringify(accountList));
    } else {
      console.log('Account already added');
    }

    localStorage.setItem('privatekey', JSON.stringify(privatekeyarr));
    localStorage.setItem('password', password);
    localStorage.setItem('marvel-wallet-exist', 'true');
    localStorage.setItem('secretphrase', secretphrase);
    localStorage.setItem('network', 'devnet');
    closeTab();
  }

  const closeTab = () => {
    alert('Please pin your extension and open your dashboard');
    setTimeout(() => {
      navigate('/#/wallet-board');
      chrome.tabs.getCurrent(function (tab: any) {
        chrome.tabs.remove(tab?.id);
      });
    }, 2000);
  };

  const generateWallet = async () => {
    try {
      const response = await axios.post(API_URL.createWallet, {
        password: password,
      });
      console.log('Wallet Created:', response.data?.data);
      setSecretPhrase(response.data?.data?.secretPhrase);
      setMnemonicsArr(response.data?.data?.secretPhrase.split(' '));
      setPrivateKey(response.data?.data?.privateKey);
      setWallet(response.data?.data?.walletAddress);
      setPrivateKeyArr(response.data?.data?.privateKeyArr);
    } catch (error) {
      console.error('Error creating wallet:', error);
      return { success: false, error: 'Failed to create wallet' };
    }
  };

  useEffect(() => {
    generateWallet();
  }, []);

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
          onClick={handleNext}
          title={'Secure my wallet (recommended)'}
        />
      </div>
    </div>
  );
};

export default SecureWalletMain;
