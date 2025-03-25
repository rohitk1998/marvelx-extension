import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BgSecureWallet, GreenTickImg } from '../../assets';
import { PrimaryButton } from '../common/primary-button';

interface AuthenticatorSuccessScreenProps {
  success: boolean;
}

const AuthenticatorSuccessScreen: React.FC<AuthenticatorSuccessScreenProps> = ({
  success,
}) => {
  console.log('success', success);
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div
      className="flex flex-col items-center justify-start w-full max-w-[375px] h-screen min-h-[600px] max-h-[600px] bg-no-repeat bg-cover bg-center text-white"
      style={{
        padding: '20px',
        maxHeight: '600px',
        maxWidth: '375px',
        backgroundImage: `url(${BgSecureWallet})`,
      }}
    >
      <div
        className="flex flex-row w-[100%] items-center justify-center text-center text-white"
        style={{ marginBottom: '32px' }}
      >
        <h1 className="text-lg font-medium">Two Factor Authenticator</h1>
      </div>
      <div
        className="flex flex-col items-center"
        style={{ marginTop: '40px', marginBottom: '40px' }}
      >
        <div
          className="flex items-center justify-center"
          style={{ marginTop: '40px' }}
        >
          <img src={GreenTickImg} className="w-[144px] h-[132px]" alt={''} />
        </div>
        <h2
          className="text-2xl font-semibold text-center"
          style={{ marginBottom: '8px' }}
        >
          Google Authenticator app successfully activated
        </h2>
        <p
          className="text-sm text-center text-gray-400"
          style={{ marginBottom: '16px' }}
        >
          You can now use authenticator app to complete transactions
        </p>
      </div>
      <div className="flex-grow"></div>
      <PrimaryButton
        title="Done"
        onClick={() => {
          navigate('/send', {
            state: location?.state,
          });
        }}
      />
    </div>
  );
};

export default AuthenticatorSuccessScreen;
