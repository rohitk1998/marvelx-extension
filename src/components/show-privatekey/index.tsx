import React, { useEffect, useState } from 'react';
import { BgSecureWallet } from '../../assets';
import { NavigationBarTitle } from '../common/navigationbartitle';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';

const PrivateKeyDisplay: React.FC = () => {
  const [key, setKey] = useState('');

  const navigate = useNavigate();

  const setWalletInLocal = async () => {
    let password: any = localStorage.getItem('password');
    let accounts: any = localStorage.getItem(password);
    if (!accounts) return;
    let defaults: any = JSON.parse(accounts);
    const firstAccountKey = Object.keys(defaults)[0];
    console.log('firstAccountKey', firstAccountKey);
    const defaultAccount = defaults[firstAccountKey];
    setKey(defaultAccount?.key);
  };

  useEffect(() => {
    setWalletInLocal();
  }, []);

  return (
    <div
      className="flex flex-col h-screen text-white bg-no-repeat"
      style={{
        backgroundImage: `url(${BgSecureWallet})`,
        padding: '1rem',
        height: '600px',
        width: '375px',
        maxWidth: '375px',
        margin: '0px',
      }}
    >
      <NavigationBarTitle
        title="Show Private Key"
        callback={() => navigate(ROUTES.EDIT_ACCOUNT)}
      />

      <div
        className="text-red-300 bg-red-900 bg-opacity-50 rounded-xl"
        style={{
          paddingLeft: '16px',
          paddingRight: '16px',
          paddingTop: '12px',
          paddingBottom: '12px',
          marginBottom: '16px',
          marginTop: '40px',
        }}
      >
        <p className="text-sm">
          Do not share your Private Key. Anyone with your Private Key can have
          access to your account.
        </p>
      </div>
      <div className="border-[rgba(255,255,255,0.6)] justify-between rounded-[10px] border p-4 space-y-4 flex flex-wrap gap-y-4 gap-x-1 w-full max-w-full"
      style={{padding:"16px 16px"}}
      >
        <p className="text-white text-[14px] font-bold w-full break-words">
          {key}
        </p>
      </div>
    </div>
  );
};

export default PrivateKeyDisplay;
