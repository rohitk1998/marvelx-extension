import { useState } from 'react';
import { PrimaryButton, NavigationBarTitle } from '../index';
import MnemonicsInputBox from './mnemonicsinputbox';
import Stepper from './stepper';
import { useAppContext } from '../../context/useappcontext';
import { BgRecoveryPhrase } from '../../assets';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
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
  const {
    mnemonicsArr,
    secretphrase,
    password,
    privatekey,
    privatekeyarr,
    wallet,
  } = useAppContext();

  const [error, setError] = useState('');
  const [typedSeed, setTypedSeed] = useState([]);
  const navigate = useNavigate()

  const handleWalletCreation = async () => {
    setWalletAndMnemonic(password);
  };

  function setWalletAndMnemonic(password: string) {
    localStorage.clear();
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
    localStorage.setItem('secretphrase', secretphrase);
    localStorage.setItem('network', 'devnet');
    setTimeout(()=> navigate(ROUTES.WALLET_ACCOUNT) , 1000)
  }

  const handleSecretPhraseComparison = () => {
    console.log('secretphrase:typedSeed', secretphrase, typedSeed);
    const isNotCompleted = typedSeed?.some((word: string) => word.trim() === '');
    console.log("isNotCompleted",isNotCompleted)
    if (typedSeed.length !== 12 || isNotCompleted) {
      setError('Please complete your secret phrase');
    } else if (secretphrase !== typedSeed?.join(' ')) {
      setError('Your secret phrase is not correct');
    } else {
      setError('')
      handleWalletCreation();
    }
  };

  console.log('Error in confirm phrase:', error);
  return (
    <div
      className="relative flex flex-col items-center w-full max-w-[375px] overflow-auto bg-no-repeat bg-cover bg-center rounded-[20px] pt-[26px] pr-[18px] pb-[19px] pl-[20px]"
      style={{ backgroundImage: `url(${BgRecoveryPhrase})` }}
    >
      <NavigationBarTitle
        title="Add a wallet"
        callback={() => {
          setActive(1);
        }}
      />
      <div className="w-full overflow-auto pt-[32px]">
        <Stepper steps={steps} active={active} done={done} />
        <div className="text-center">
          <h2 className="text-[20px] font-[400] text-white">
            Confirm Recovery Phrase
          </h2>
          <p className="text-[14px] text-white" style={{ marginTop: '10px' }}>
            Confirm Secret Recovery Phrase
          </p>
        </div>
        <MnemonicsInputBox
          mnemonic={mnemonicsArr}
          setMnemonics={setTypedSeed}
          error={error}
        />
        <PrimaryButton
          onClick={() => handleSecretPhraseComparison()}
          title={'Confirm'}
          isDisabled={mnemonicsArr.length !== 12}
        />
      </div>
    </div>
  );
};

export default ComfirmPhrase;
