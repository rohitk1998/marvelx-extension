import React from 'react';
import { ChevronRight } from 'lucide-react';
import { BgSecureWallet } from '../../assets';
import { NavigationBarTitle } from '../common/navigationbartitle';
import { useLocation, useNavigate } from 'react-router-dom';

interface MenuProps {
  setSelectedMenu: Function;
}

const TwoFactorAuthenticatorMenu: React.FC<MenuProps> = ({
  setSelectedMenu,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col w-full h-full text-white min-h-[600px]"
      style={{
        padding: '20px',
        maxHeight: '600px',
        maxWidth: '360px',
        backgroundImage: `url(${BgSecureWallet})`,
        margin: 'auto',
      }}
    >
      <NavigationBarTitle
        title="Two Factor Authenticator"
        callback={() => {
          if (location?.state) {
            navigate('/send', {
              state: location?.state,
            });
          } else {
            navigate(-1);
          }
        }}
        titleClass="w-full text-[16px] font-[600] text-center text-white"
      />
      <div className="flex flex-col" style={{ marginTop: '20px' }}>
        <button
          className="flex items-center justify-between w-full text-white bg-[#4B50661A] border border-[#222326] rounded-xl"
          style={{ padding: '10px 15px', marginBottom: '12px' }}
          onClick={() => setSelectedMenu('Google Authenticator')}
        >
          <span className="text-lg font-semibold cursor-pointer">Google Authenticator</span>
          <ChevronRight size={20} className="text-gray-400" />
        </button>
        <button
          className="flex items-center justify-between w-full text-white bg-[#4B50661A] border border-[#222326] rounded-xl"
          style={{ padding: '10px 15px', marginBottom: '12px' }}
          onClick={() => setSelectedMenu('Transaction PIN')}
        >
          <span className="text-lg font-semibold cursor-pointer">Transaction PIN</span>
          <ChevronRight size={20} className="text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default TwoFactorAuthenticatorMenu;
