import React, { useEffect, useState } from 'react';
import useUserProfile from '../../hooks/useprofile';
import { BgSecureWallet } from '../../assets';
import { setTransactionPin } from '../../helpers/common/api.helper';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavigationBarTitle } from '../common/navigationbartitle';
import { ValidationError } from '../common/errortext';
import { PrimaryButton } from '../common/primary-button';

interface PinProps {
  setSelectedMenu: Function;
}

const TransactionPINScreen: React.FC<PinProps> = ({ setSelectedMenu }) => {
  const { setWalletAddress, user } = useUserProfile();
  const [profile, setProfile]: any = useState(null);
  const [pin, setPin] = useState<string[]>(Array(4).fill(''));
  const [confirmPin, setConfirmPin] = useState<string[]>(Array(4).fill(''));
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const location = useLocation();

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

  const handlePinChange = (
    index: number,
    value: string,
    isPinConfirm: boolean
  ) => {
    if (pin.join('') == confirmPin.join('')) {
      setError('');
    }

    if (value.length <= 1) {
      const newPin = isPinConfirm ? [...confirmPin] : [...pin];
      newPin[index] = value;

      if (isPinConfirm) {
        setConfirmPin(newPin);
      } else {
        setPin(newPin);
      }

      if (value && index < 3) {
        const nextInput = document.getElementById(
          isPinConfirm ? `confirm-pin-${index + 1}` : `pin-${index + 1}`
        );
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handlePinValidation = () => {
    if (pin.join('') !== confirmPin.join('')) {
      setError('Pin does not match');
    } else {
      handlePinCreation();
    }
  };

  const handlePinCreation = async () => {
    try {
      const isPinCreated = await setTransactionPin(
        profile?.wallets[0],
        pin.join('')
      );
      if (isPinCreated) {
        if (location.state.toCompleteStep === 'transaction_pin') {
          navigate('/send', { state: { ...location.state } });
        }
      } else {
        setError('Error in creating pin');
      }
    } catch (error) {
      setError('Error in creating pin');
    }
    console.log('error set pin', error);
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

  const handleConfirmPinBackspace = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !confirmPin[index] && index > 0) {
      // Focus the previous input if the current one is empty and Backspace is pressed
      const prevInput = document.getElementById(`confirm-pin-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  return (
    <div
      className="relative flex flex-col items-start justify-start w-full max-w-[375px] h-screen max-h-[600px] bg-no-repeat bg-cover bg-center text-white"
      style={{
        padding: '20px',
        maxHeight: '600px',
        maxWidth: '375px',
        backgroundImage: `url(${BgSecureWallet})`,
      }}
    >
      <NavigationBarTitle
        title="Transaction Pin"
        callback={() => setSelectedMenu('')}
      />

      <div style={{ marginBottom: '24px', marginTop: '20px' }}>
        <p className="text-gray-400" style={{ marginBottom: '12px' }}>
          Enter transaction PIN
        </p>
        <div
          className="flex justify-between w-full gap-1"
          style={{ marginBottom: '24px' }}
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
                onChange={(e) => handlePinChange(index, e.target.value, false)}
                onKeyDown={(e)=> handlePinBackspace(index,e)}
                className="w-[56px] h-[46px] text-xl text-center bg-transparent border border-gray-600 rounded-xl focus:border-gray-600 focus:outline-none text-white"
                style={{ padding: '12px',marginLeft:'5px' }}
              />
            ))}
        </div>

        <p className="text-gray-400" style={{ marginBottom: '12px' }}>
          Confirm transaction PIN
        </p>
        <div className="flex justify-between w-full gap-1">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <input
                key={`confirm-pin-${index}`}
                id={`confirm-pin-${index}`}
                type="tel"
                maxLength={1}
                value={confirmPin[index]}
                onChange={(e) => handlePinChange(index, e.target.value, true)}
                onKeyDown={(e)=> handleConfirmPinBackspace(index,e)}
                className="w-[56px] h-[46px] text-xl text-center bg-transparent border border-gray-600 rounded-xl focus:border-gray-600 focus:outline-none text-white"
                style={{ padding: '12px',marginLeft:'5px' }}
              />
            ))}
        </div>

        <div>
          <ValidationError error={error} />
        </div>
      </div>
      <div className="flex-grow"></div>
      <PrimaryButton
        title="Create transaction PIN"
        onClick={handlePinValidation}
      />
    </div>
  );
};

export default TransactionPINScreen;
