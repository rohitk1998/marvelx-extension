import React, { useEffect, useState } from 'react';
import { verify2FA } from '../../helpers/common/api.helper';
import { BgSecureWallet } from '../../assets';
import { PrimaryButton } from '../common/primary-button';
import { NavigationBarTitle } from '../common/navigationbartitle';
import { ValidationError } from '../common/errortext';

interface Verify2FAProps {
  address: string;
  qrCode: any;
  setSuccess: Function;
  setError: Function;
  setActive: Function;
  error: string;
}

const Verify2FA: React.FC<Verify2FAProps> = ({
  address,
  qrCode,
  setSuccess,
  setError,
  setActive,
  error,
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

  const handleVerify2FA = async () => {
    try {
      if (code.join('') == '') {
        setError('Please enter a 6-digit code');
      } else {
        const result = await verify2FA(code.join(''), qrCode.secret, address);
        console.log('verifi 2FA :',result)
        if (result) {
          setSuccess(true);
          setActive(2);
        } else {
          setError('Invalid 2FA code');
        }
      }
    } catch (error) {
      setError('Invalid 2FA code');
    }
  };

  const handleCodeBackspace = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  useEffect(() => {
    setError('');
  }, []);

  return (
    <div
      className="flex flex-col max-h-[600px] h-screen w-full bg-no-repeat bg-cover mx-auto text-white"
      style={{
        padding: '20px',
        maxHeight: '600px',
        maxWidth: '360px',
        backgroundImage: `url(${BgSecureWallet})`,
        backgroundSize: '100% 100%',
      }}
    >
      <NavigationBarTitle
        title="Two Factor Authenticator"
        callback={() => setActive(0)}
        titleClass="w-full text-[16px] font-[600] text-center text-white"
      />

      <div className="w-[312px] h-[33px] mx-auto mt-[32px] text-center">
        <h2
          className="text-[24px] font-[500] text-white pt-[30px]"
          style={{ marginBottom: '3px' }}
        >
          Validate authenticator app
        </h2>
        <p className="text-sm text-[#6B6D76]" style={{ marginBottom: '24px' }}>
          Enter the code from your authenticator app
        </p>
        <div className="relative pt-[40px] gap-x-8">
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
                  onKeyDown={(e) => handleCodeBackspace(index, e)}
                  className="w-12 h-12 text-xl text-center bg-gray-800 border border-gray-700 rounded-md focus:border-gray-700 focus:outline-none"
                  style={{ padding: '8px' }}
                />
              ))}
            <button
              onClick={handlePaste}
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
      <div style={{ marginTop: '30px' }}>
        <PrimaryButton onClick={handleVerify2FA} title="Confirm" />
      </div>
    </div>
  );
};

export default Verify2FA;
