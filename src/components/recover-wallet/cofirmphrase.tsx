import { useState } from 'react';
import { BgSecureWallet } from '../../assets';
import { PrimaryButton, NavigationBarTitle } from '../index';
import MnemonicsInputBox from './mnemonicsinputbox';
import { useAppContext } from '../../context/useappcontext';
import { useNavigate } from 'react-router-dom';
import { ValidationError } from '../common/errortext';
import { recoverByPhraseApi } from '../../helpers/common/api.helper';

interface ConfirmPhraseProps {
  active: number;
  setActive: Function;
}

const RecoverWalletComfirmPhrase: React.FC<ConfirmPhraseProps> = ({
  setActive,
}) => {
  const {
    setSecretPhrase,
    setMnemonicsArr,
    setPrivateKey,
    setWallet,
    setPrivateKeyArr,
    password,
  } = useAppContext();
  const [error, setError] = useState('');
  const [typedSeed, setTypedSeed] = useState('');

  const navigate = useNavigate();

  const recoverWallet = async () => {
    try {
      const response = await recoverByPhraseApi(typedSeed, password);
      console.log('response', response,response?.data?.response?.data?.publicKey);
      if (response?.data?.response?.status !== 200) {
        setError(response?.data?.response?.message);
      } else {
        setSecretPhrase(response?.data?.response?.data?.secretPhrase);
        setMnemonicsArr(
          response?.data?.response?.data?.secretPhrase?.split(' ')
        );
        setPrivateKey(response?.data?.response?.data?.privateKey);
        setWallet(response?.data?.response?.data?.publicKey);
        setPrivateKeyArr(response?.data?.response?.data?.privateKeyArr);
        navigate('/wallet-account', {
          state: { isRcovered: true },
        });
      }
    } catch (error) {
      console.error('Error recovering wallet:', error);
      return { success: false, error: 'Failed to recover wallet' };
    }
  };

  const handleSecretPhraseComparison = () => {
    const typedSeedArr = typedSeed.split(' ') ?? [];
    const isNotCompleted = typedSeedArr?.some(
      (word: string) => word.trim() === ''
    );
    if (typedSeedArr.length !== 12 || isNotCompleted) {
      setError('Please complete your secret phrase');
    } else {
      setError('');
      recoverWallet();
    }
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

        <div className="mt-[35px] w-[310px] mx-auto">
          <MnemonicsInputBox setMnemonics={setTypedSeed} />
          <div className="w-[310px] mx-auto mt-[3px] h-[10px]">
            <ValidationError error={error} />
          </div>
        </div>

        <div className="w-full mt-[20px]">
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
