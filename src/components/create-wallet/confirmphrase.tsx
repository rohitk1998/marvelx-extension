import { useState } from 'react';
import { BgSecureWallet } from '../../assets';
import { PrimaryButton, NavigationBarTitle } from '../index';
import MnemonicsInputBox from './mnemonicsinputbox';
import Stepper from './stepper';
import { useAppContext } from '../../context/useappcontext';
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

interface ConfirmPhraseProps {
  steps: StepType[];
  active: number;
  done: Array<number>;
  setDone: Function;
  setActive: Function;
}

const ComfirmPhrase: React.FC<ConfirmPhraseProps> = ({
  steps,
  active,
  done,
  setActive,
}) => {
  const { mnemonicsArr, secretphrase, password,privatekey,privatekeyarr,wallet } =
    useAppContext();

  const [error, setError] = useState('');
  const [typedSeed, setTypedSeed] = useState("");

  const navigate = useNavigate();

  const handleWalletCreation = async () => {
    setWalletAndMnemonic(password);
  };

  function setWalletAndMnemonic(password: string) {
    let accountList;
    try {
      accountList = JSON.parse(localStorage.getItem(password) ?? '[]');
      const isValidAccountList =
        Array.isArray(accountList) &&
        accountList.every(
          (item) =>
            typeof item === 'object' &&
            item !== null &&
            'walletName' in item &&
            'key' in item
        );
      if (!isValidAccountList) {
        accountList = [];
      }
    } catch {
      accountList = [];
    }

    const accountExists = accountList.some(
      (account: any) => account.key === privatekey
    );
    if (!accountExists) {
      const newAccount = {
        walletName: '',
        key: privatekey,
        publicKey:wallet
      };

      accountList.push(newAccount);
      localStorage.setItem(password, JSON.stringify(accountList));
    } else {
      console.log('Account already added');
    }

    localStorage.setItem('privatekey', JSON.stringify(privatekeyarr));
    localStorage.setItem('password', password);
    localStorage.setItem('marvel-wallet-exist', 'true');
    closeTab();
  }

  const closeTab = () => {
    alert('Please pin your extension and open your dashboard');
    setTimeout(() => {
      chrome.tabs.getCurrent(function (tab: any) {
        chrome.tabs.remove(tab?.id);
      });
      navigate('/wallet-board')
    }, 3000);
  };

  const handleSecretPhraseComparison = () => {
    if (typedSeed.length !== 12) {
      setError('Please complete your secret phrase');
    }
    if (
      secretphrase !== typedSeed
    ) {
      setError('Your secret phrase is not correct');
    }
    handleWalletCreation();
    console.log('Error in confirm phrase:', error);
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-[100%] min-w-[375px] max-w-[375px] h-screen max-h-[626px] bg-no-repeat bg-cover bg-center rounded-xl"
      style={{ backgroundImage: `url(${BgSecureWallet})` }}
    >
      <div className="w-[90%] flex flex-col gap-6">
        <NavigationBarTitle
          title="Add a wallet"
          callback={() => {
            setActive(1);
          }}
        />
        <Stepper steps={steps} active={active} done={done} />
        <div className="text-center">
          <h2 className="text-[20px] font-[400] text-white">
            Confirm Recovery Phrase
          </h2>
          <p className="text-[14px] text-white" style={{marginTop:"10px"}}>
            Confirm Secret Recovery Phrase
          </p>
        </div>
        <MnemonicsInputBox
          mnemonics={typedSeed}
          setMnemonics={setTypedSeed}
        />

        <PrimaryButton
          onClick={() => handleSecretPhraseComparison()}
          title={'Proceed'}
          isDisabled={mnemonicsArr.length !== 12}
        />
      </div>
    </div>
  );
};

export default ComfirmPhrase;
