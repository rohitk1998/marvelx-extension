import { useState } from 'react';
import { BgSecureWallet } from '../../assets';
import { PrimaryButton, NavigationBarTitle } from '../index';
import MnemonicsInputBox from './mnemonicsinputbox';
import { useAppContext } from '../../context/useappcontext';
import axios from 'axios';
import { API_URL } from '../../constants';
import { useNavigate } from 'react-router-dom';

interface ConfirmPhraseProps {
  active: number;
  setActive: Function;
}

const RecoverWalletComfirmPhrase: React.FC<ConfirmPhraseProps> = ({
  setActive,
}) => {
  const { password } = useAppContext();
  const [error, setError] = useState('');
  const [typedSeed, setTypedSeed] = useState('');

  const navigate = useNavigate();

  const recoverWallet = async () => {
    try {
      const response = await axios.post(API_URL.recoverWallet, {
        secretPhrase: typedSeed,
        password: password,
      });
      setAccount(
        password,
        response?.data?.data?.privateKey,
        response?.data?.data?.publicKey,
        response?.data?.data?.privateKeyArr
      );
    } catch (error) {
      console.error('Error recovering wallet:', error);
      return { success: false, error: 'Failed to recover wallet' };
    }
  };

  const handleWalletRecovery = async () => {
    await recoverWallet();
  };

  function setAccount(
    password: string,
    privatekey: string,
    publickey: string,
    privatekeyarr: Array<any>
  ) {
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
        publicKey: publickey,
      };
      localStorage.setItem(password, JSON.stringify(accountList));
    } else {
      console.log('Account already added');
    }

    localStorage.setItem('privatekey', JSON.stringify(privatekeyarr));
    localStorage.setItem('password', password);
    localStorage.setItem('secretphrase', typedSeed);
    localStorage.setItem('network','devnet');
    navigate('/wallet-account');
  }

  const handleSecretPhraseComparison = () => {
    if (typedSeed.length !== 12) {
      setError('Please complete your secret phrase');
    }
    handleWalletRecovery();
    console.log('Error in confirm phrase:', error);
  };

  return (
    <div
      className="relative flex flex-col items-center w-full max-w-[375px] overflow-auto bg-no-repeat bg-cover bg-center rounded-[20px] pt-[26px] pr-[18px] pb-[19px] pl-[20px]"
      style={{ backgroundImage: `url(${BgSecureWallet})` }}
    >
      <NavigationBarTitle
        title="By Secret Key Phrase"
        callback={() => {
          setActive(0);
        }}
        titleClass="w-full text-[16px] font-[600] text-center text-white"
      />
      <div className="w-full overflow-auto pt-[22px]">
        <div className="text-center">
          <h2 className="text-[20px] font-[500] text-white">
            Enter Secret Recovery Phrase to access your wallet
          </h2>
        </div>

        <div className='mt-[35px]'>
        <MnemonicsInputBox mnemonics={typedSeed} setMnemonics={setTypedSeed} />
        </div>

        <div className='w-full mt-[20px]'>
        <PrimaryButton
          onClick={() => handleSecretPhraseComparison()}
          title={'Confirm'}
        />
        </div>
      </div>
    </div>
  );
};

export default RecoverWalletComfirmPhrase;
