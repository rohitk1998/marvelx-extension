import React, { useState } from 'react';
import { sendSolanaTransactionAndConfirm } from '../../helpers';
import { getPrivateKeyLocalStorage } from '../../helpers/common/localstorage';
import { validate2FACode } from '../../helpers/common/api.helper';
import { BgSecureWallet } from '../../assets';
import { NavigationBarTitle } from '../common/navigationbartitle';
import { PrimaryButton } from '../common/primary-button';
import { ValidationError } from '../common/errortext';

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

  // const handlePaste = () => {
  //   navigator.clipboard.readText().then((text) => {
  //     const digits = text.replace(/\D/g, '').slice(0, 6).split('');
  //     const newCode = [...code];
  //     digits.forEach((digit, index) => {
  //       if (index < 6) {
  //         newCode[index] = digit;
  //       }
  //     });

  //     setCode(newCode);
  //   });
  // };

  const sendTransaction = async () => {
    try {
      console.log(token, receiveraddress, usdamount, amount);
      const privateKeyArr = getPrivateKeyLocalStorage();
      const result = await sendSolanaTransactionAndConfirm(
        privateKeyArr,
        receiveraddress,
        Number(amount)
      );
      console.log('result', result);
      if (result) {
        setActive(6);
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
      setError(`Failed to send ${amount} ${token.symbol}`);
    }
  };

  const handleValidationTransactionCode = async () => {
    try {
      let password: any = localStorage.getItem('password');
      let accounts: any = localStorage.getItem(password);
      let defaults: any = JSON.parse(accounts);
      console.log(
        'code , wallet address:',
        code.join(''),
        defaults[0]?.publicKey
      );
      const result = await validate2FACode(
        code.join(''),
        defaults[0]?.publicKey
      );
      console.log('result', result);
      if (result) {
        sendTransaction();
      }
      else{
        setError('Invalid 2FA code');
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

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full max-w-[375px] min-h-[600px] h-screen max-h-[600px] bg-no-repeat bg-cover bg-center rounded-xl text-white"
      style={{
        backgroundImage: `url(${BgSecureWallet})`,
        padding: '20px',
        maxHeight: '600px',
        maxWidth: '375px',
      }}
    >
      <NavigationBarTitle
        title="Validate Two Factor"
        callback={() => setActive(5)}
      />
      <div className="flex flex-col items-center" style={{ marginTop: '32px' }}>
        <h2 className="text-2xl font-[700] text-center text-white">
          Enter the code on your verification app
        </h2>
        <p
          className="text-sm text-center text-gray-400"
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
                  value={code[index]}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e)=> handlePinBackspace(index,e)}
                  className="w-12 h-12 text-xl text-center bg-gray-800 border border-gray-700 rounded-md focus:border-blue-500 focus:outline-none"
                  style={{ padding: '8px' }}
                />
              ))}
            <button
              className="absolute right-0 text-sm text-gray-300 -bottom-6"
              style={{ padding: '4px' }}
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
        onClick={handleValidationTransactionCode}
      />
    </div>
  );
};

export default ValidateTransaction2FA;
