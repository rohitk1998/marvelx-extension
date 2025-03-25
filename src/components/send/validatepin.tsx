import React, { useEffect, useState } from 'react';
import useUserProfile from '../../hooks/useprofile';
import { BgSecureWallet } from '../../assets';
import { ValidationError } from '../common/errortext';
import { PrimaryButton } from '../common/primary-button';

interface ValidationPinProps {
  setActive: Function;
}

const ValidatePin: React.FC<ValidationPinProps> = ({ setActive }) => {
  const { setWalletAddress, user } = useUserProfile();
  const [profile, setProfile]: any = useState(null);
  const [pin, setPin] = useState<string[]>(Array(4).fill(''));
  const [error, setError] = useState('');

  useEffect(() => {
    fetch2FaData();
    if (user) {
      setProfile(user);
    }
  }, [user]);

  const fetch2FaData = async () => {
    let password: any = localStorage.getItem('password');
    let accounts: any = localStorage.getItem(password);
    let defaults: any = JSON.parse(accounts);
    setWalletAddress(defaults[0]?.publicKey);
  };

  const handlePinChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      // Move focus to the next input when a digit is typed
      if (value && index < pin.length - 1) {
        const nextInput = document.getElementById(`pin-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  }

  const handleTransactionPinConfirm = () => {
    if (pin.join('') !== profile?.transactionPin) {
      setError('Invalid Pin');
    } else {
      setActive(5);
    }
  };

  const handlePinBackspace = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      // Focus the previous input if the current one is empty and Backspace is pressed
      const prevInput = document.getElementById(`pin-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  return (
    <div
      className="relative flex flex-col text-white bg-gradient-to-b from-gray-900 to-indigo-950"
      style={{
        height: '600px',
        maxWidth: '375px',
        padding: '24px',
        margin: '0 auto',
        backgroundImage: `url(${BgSecureWallet})`,
      }}
    >
      <div className="flex items-center" style={{ marginBottom: '48px' }}>
        <button
          className="absolute text-white left-6"
          onClick={() => setActive(3)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="w-full text-lg font-medium text-center">
          Transaction PIN
        </h1>
      </div>
      <div
        className="flex flex-col items-center justify-center"
        style={{ flex: '1 1 auto' }}
      >
        <h2
          className="text-2xl font-medium text-center"
          style={{ marginBottom: '40px' }}
        >
          Enter your transaction
          <br />
          PIN
        </h2>
        <div
          className="flex justify-center"
          style={{ marginBottom: '80px', gap: '12px' }}
        >
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <input
                key={`pin-${index}`}
                id={`pin-${index}`}
                type="tel"
                maxLength={1}
                value={pin[index]}
                onChange={(e) => handlePinChange(index, e.target.value)}
                onKeyDown={(e) => handlePinBackspace(index, e)}
                className="w-[56px] h-[46px] text-xl text-center bg-transparent border border-gray-600 rounded-xl focus:border-gray-600 focus:outline-none"
                style={{ padding: '12px' }}
              />
            ))}
        </div>
        <ValidationError error={error} />
      </div>
      <div style={{ marginTop: 'auto', marginBottom: '10px' }}>
        {pin.every((item) => item !== '') ? (
          <PrimaryButton
            onClick={handleTransactionPinConfirm}
            title="Confirm"
          />
        ) : (
          <button
            className="w-full text-[14px] text-gray-400 bg-gray-800 rounded-lg bg-opacity-40 h-[54px] font-[600]"
            style={{ padding: '16px 0' }}
            title="Confirm"
          >
            Confirm
          </button>
        )}
      </div>
    </div>
  );
};

export default ValidatePin;
