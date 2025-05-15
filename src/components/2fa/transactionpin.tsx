import React, { useEffect, useState } from 'react';
import useUserProfile from '../../hooks/useprofile';
import { BgSecureWallet } from '../../assets';
import { setTransactionPin } from '../../helpers/common/api.helper';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavigationBarTitle } from '../common/navigationbartitle';
import { ValidationError } from '../common/errortext';
import { PrimaryButton } from '../common/primary-button';
import toast from 'react-hot-toast';

interface PinProps {
  setSelectedMenu: Function;
}

const TransactionPINScreen: React.FC<PinProps> = ({ setSelectedMenu }) => {
  const { setWalletAddress, user } = useUserProfile();
  const [profile, setProfile]: any = useState(null);
  const [pin, setPin] = useState<string[]>(Array(4).fill(''));
  const [confirmPin, setConfirmPin] = useState<string[]>(Array(4).fill(''));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    fetch2FaData();
    if (user) {
      setProfile(user);
    }
  }, [user]);

  const fetch2FaData = async () => {
    let accounts: any = localStorage.getItem('account');
    if (!accounts) return;
    let defaults: any = JSON.parse(accounts);
    const firstAccountKey = Object.keys(defaults)[0];
    const defaultAccount = defaults[firstAccountKey];
    setWalletAddress(defaultAccount?.publicKey);
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
    if (!pin.join('') || !confirmPin.join('')) {
      setError('Please fill in both PIN fields');
    } else if (pin.join('') !== confirmPin.join('')) {
      setError('Pin does not match');
    } else {
      handlePinCreation();
    }
  };

  const handlePinCreation = async () => {
    setLoading(true);
    try {
      const response = await setTransactionPin(
        profile?.wallets[0],
        pin.join('')
      );
      console.log('response setup pin :',response?.data?.response?.status);
      if (response?.data?.response?.status === 200) {
        toast.success('Transaction pin set successfully');
        setError('');
        setLoading(false);
        if (location?.state?.toCompleteStep === 'transaction_pin') {
          setTimeout(
            () => navigate('/send', { state: { ...location?.state } }),
            3000
          );
        } else {
          setLoading(false);
          setTimeout(() => setSelectedMenu(''), 2000);
        }
      }
    } catch (error) {
      setLoading(false);
      setError('Error in creating pin');
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
      className="relative flex flex-col items-start justify-start w-full max-w-[360px] h-screen max-h-[600px] bg-no-repeat bg-cover bg-center text-white"
      style={{
        padding: '20px',
        maxHeight: '600px',
        maxWidth: '360px',
        backgroundImage: `url(${BgSecureWallet})`,
        backgroundSize: '100% 100%',
        margin: ' 0 auto',
      }}
    >
      <NavigationBarTitle
        title="Transaction PIN"
        callback={() => setSelectedMenu('')}
        titleClass='w-full text-[16px] font-[600] text-center text-white'
      />

      <div style={{ marginBottom: '24px', marginTop: '20px' }}>
        <p className="text-[#fff] text-[14px]" style={{ marginBottom: '6px' }}>
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
                 autoComplete="off"
                maxLength={1}
                value={pin[index]}
                onChange={(e) => handlePinChange(index, e.target.value, false)}
                onKeyDown={(e) => handlePinBackspace(index, e)}
                className="w-[56px] h-[46px] text-xl text-center bg-transparent border border-gray-600 rounded-xl focus:border-gray-600 focus:outline-none text-white"
                style={{ padding: '12px', marginLeft: '5px' }}
              />
            ))}
        </div>

        <p className="text-[#fff] text-[14px]" style={{ marginBottom: '6px' }}>
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
                autoComplete="off"
                value={confirmPin[index]}
                onChange={(e) => handlePinChange(index, e.target.value, true)}
                onKeyDown={(e) => handleConfirmPinBackspace(index, e)}
                className="w-[56px] h-[46px] text-xl text-center bg-transparent border border-gray-600 rounded-xl focus:border-gray-600 focus:outline-none text-white"
                style={{ padding: '12px', marginLeft: '5px' }}
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
        isLoading={loading}
      />
    </div>
  );
};

export default TransactionPINScreen;
