import React, { useEffect, useState } from 'react';
import { sendSolanaTransactionAndConfirm } from '../../helpers';
import { getPrivateKeyLocalStorage } from '../../helpers/common/localstorage';
import { validate2FACode } from '../../helpers/common/api.helper';
import { BgSecureWallet } from '../../assets';
import { NavigationBarTitle } from '../common/navigationbartitle';
import { PrimaryButton } from '../common/primary-button';
import { ValidationError } from '../common/errortext';
import { sendSPLToken } from '../../helpers/solana/transaction';
// import { sendSPLToken } from '../../helpers/solana/transaction';

interface Transaction2FAProps {
  setActive: Function;
  token: any;
  amount: string;
  usdamount: string;
  receiveraddress: string;
  setSuccess: Function;
  setError: Function;
  error:string;
}

const ValidateTransaction2FA: React.FC<Transaction2FAProps> = ({
  token,
  usdamount,
  receiveraddress,
  amount,
  setActive,
  setSuccess,
  setError,
  error
}) => {
  const [code, setCode] = useState<string[]>(Array(6).fill(''));
  const [loading,setLoading]=useState(false);
  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const sendTransaction = async () => {
    let result= null ;
    setLoading(true)
    try {
      console.log(token, receiveraddress, usdamount, amount);
      const privateKeyArr = getPrivateKeyLocalStorage();
      if(token?.symbol !== 'SOL'){
        result = await sendSPLToken(
          privateKeyArr,
          receiveraddress,
          token?.mint,
          Number(amount)
        );
      }
      result = await sendSolanaTransactionAndConfirm(
        privateKeyArr,
        receiveraddress,
        Number(amount)
      );
      console.log('result', result);
      if (result) {
        setActive(6);
        setSuccess(true);
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
      setError(`Failed to send ${amount} ${token.symbol}`);
      setLoading(false);
    }
  };

  const handleValidationTransactionCode = async () => {
    try {
      if(code.join('') === ''){
        setError('Please enter the 2FA code')
      }
      else{
        let password: any = localStorage.getItem('password');
        let accounts: any = localStorage.getItem(password);
        if (!accounts) return;
        let defaults: any = JSON.parse(accounts);
        const firstAccountKey = Object.keys(defaults)[0];
        const defaultAccount = defaults[firstAccountKey];
       
        console.log(
          'code , wallet address:',
          code.join(''),
          defaultAccount?.publicKey
        );
        const response = await validate2FACode(
          code.join(''),
          defaultAccount?.publicKey
        );
        console.log('response validate 2FA :', response?.data?.response?.status);
        if (response?.data?.response?.status === 200) {
          sendTransaction();
        }
        else{
          setError('Invalid 2FA code');
        }
      }
    } catch (error) {
      setError('Invalid 2FA code');
    }
  };

  const handlePinBackspace = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      // Focus the previous input if the current one is empty and Backspace is pressed
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handlePaste = () => {
    navigator.clipboard.readText().then((text) => {
      const digits = text.replace(/\D/g, '').slice(0, 6).split('');
      const newCode = [...code];
      digits.forEach((digit, index) => {
        if (index < 6) {
          newCode[index] = digit;
        }
      });
      setCode(newCode);
    });
  };

  useEffect(()=> {
    setError('')
    return()=> {
      setError('')
    }
  },[])

  return (
    <div
      className="flex flex-col items-center justify-center w-[360px] min-h-[600px] h-screen max-h-[600px] bg-no-repeat bg-cover bg-center text-white mx-auto"
      style={{
        backgroundImage: `url(${BgSecureWallet})`,
        padding: '20px',
        maxHeight: '600px',
        maxWidth: '375px',
      }}
    >
      <NavigationBarTitle
        title="Validate Two Factor"
        callback={() => setActive(4)}
          titleClass="w-full text-[16px] font-[600] text-center text-white"
      />
      <div className="flex flex-col items-center mt-[67px]">
        <h2 className="text-2xl font-[700] text-center text-white">
          Enter the code on your verification app
        </h2>
        <p
           className="text-sm text-center text-[#6B6D76] w-[311px] mt-[15px]"
           style={{ marginBottom: '32px' }}
        >
          This is required to complete this transaction safely
        </p>

        <div className="relative w-full">
          <div
            className="flex justify-between"
            style={{ marginBottom: '16px' }}
          >
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  key={`code-${index}`}
                  id={`code-${index}`}
                  type="tel"
                  maxLength={1}
                  autoComplete="off"
                  value={code[index]}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e)=> handlePinBackspace(index,e)}
                  className="w-12 h-12 text-xl text-center bg-gray-800 border border-gray-700 rounded-md focus:border-gray-700 focus:outline-none"
                  style={{ padding: '8px' }}
                />
              ))}
            <button
              className="absolute right-0 text-sm text-gray-300 -bottom-6"
              style={{ padding: '4px' }}
              onClick={()=> handlePaste()}
            >
              Paste
            </button>
          </div>
        </div>
        <ValidationError error={error} />
      </div>
      <div className="flex-grow"></div>
      <PrimaryButton
        title="Confirm"
        isLoading={loading}
        onClick={handleValidationTransactionCode}
      />
    </div>
  );
};

export default ValidateTransaction2FA;
