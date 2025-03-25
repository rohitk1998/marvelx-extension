import React, { useState } from 'react';
import TwoFactorAuthenticatorMenu from './menuscreen';
import TransactionPINScreen from './transactionpin';
import Auth2FA from './auth2Fa';

const TwoFactorAuthenticator: React.FC = () => {
  const [selectedmenu,setSelectedMenu] = useState('');
  
  return (
    <>
    { selectedmenu === '' &&  <TwoFactorAuthenticatorMenu setSelectedMenu={setSelectedMenu} />}
    { selectedmenu === 'Google Authenticator' &&  <Auth2FA setSelectedMenu={setSelectedMenu} />}
    { selectedmenu === 'Transaction PIN' &&  <TransactionPINScreen setSelectedMenu={setSelectedMenu} />}
    </>
  );
};

export default TwoFactorAuthenticator;
