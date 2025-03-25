import { useState } from 'react';
import { BgSecureWallet } from '../../assets';
import { PrimaryButton, NavigationBarTitle } from '../index';
import MnemonicsInputBox from '../create-wallet/mnemonicsinputbox';
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
        password:password
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
    localStorage.setItem('marvel-wallet-exist', 'true');
    localStorage.setItem('secretphrase',typedSeed);
    closeTab();
}

  // function setAccount(
  //   password: string,
  //   privatekey: string,
  //   publickey: string,
  //   privatekeyarr: Array<any>
  // ) {
  //   let accountList;
  //   try {
  //     accountList = JSON.parse(localStorage.getItem(password) ?? '[]');
  //     const isValidAccountList =
  //       Array.isArray(accountList) &&
  //       accountList.every(
  //         (item) =>
  //           typeof item === 'object' &&
  //           item !== null &&
  //           'walletName' in item &&
  //           'key' in item &&
  //           'publicKey' in item
  //       );
  //     if (!isValidAccountList) {
  //       accountList = [];
  //     }
  //   } catch {
  //     accountList = [];
  //   }

  //   const accountExists = accountList.some(
  //     (account: any) => account.key === privatekey
  //   );
  //   if (!accountExists) {
  //     const newAccount = {
  //       walletName: '',
  //       key: privatekey,
  //       publicKey: publickey,
  //     };

  //     accountList.push(newAccount);
  //     localStorage.setItem(password, JSON.stringify(accountList));
  //   } else {
  //     console.log('Account already added');
  //   }
  //   localStorage.setItem('privatekey', JSON.stringify(privatekeyarr));
  //   localStorage.setItem('password', password);
  //   localStorage.setItem('marvel-wallet-exist', 'true');
  //   closeTab();
  // }

  const closeTab = () => {
    alert('Please pin your extension and open your dashboard');
    setTimeout(() => {
      navigate('/#/wallet-board')
      chrome.tabs.getCurrent(function (tab: any) {
        chrome.tabs.remove(tab?.id);
      });
    }, 2000);
  };

  const handleSecretPhraseComparison = () => {
    if (typedSeed.length !== 12) {
      setError('Please complete your secret phrase');
    }
    handleWalletRecovery();
    console.log('Error in confirm phrase:', error);
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-[100%] min-w-[375px] max-w-[375px] h-screen max-h-[580px] bg-no-repeat bg-cover bg-center rounded-xl"
      style={{ backgroundImage: `url(${BgSecureWallet})` }}
    >
      <div className="w-[90%] flex flex-col gap-8">
        <NavigationBarTitle
          title="Recover your wallet"
          callback={() => {
            setActive(0);
          }}
        />
        <div className="text-center">
          <h2 className="text-[20px] font-[400] text-white">
            Confirm Recovery Phrase
          </h2>
          <p className="text-[14px] text-white" style={{ marginTop: '10px' }}>
            Confirm Secret Recovery Phrase
          </p>
        </div>
        <MnemonicsInputBox mnemonics={typedSeed} setMnemonics={setTypedSeed} />

        <PrimaryButton
          onClick={() => handleSecretPhraseComparison()}
          title={'Proceed'}
        />
      </div>
    </div>
  );
};

export default RecoverWalletComfirmPhrase;
