import React, { useState } from 'react';
import { Copy } from 'lucide-react';
import { NavigationBarTitle } from '../common/navigationbartitle';
import { PrimaryButton } from '../common/primary-button';
import { BgSecureWallet } from '../../assets';
import { DotFormatAddress } from '../../helpers/common/dotformataddress';

interface QrCodeProps {
  setSelectedMenu: Function;
  setActive: Function;
  qrCode: any;
}

const TwoFaQrCode: React.FC<QrCodeProps> = ({
  setSelectedMenu,
  setActive,
  qrCode,
}) => {
  const [copytext, setCopyText] = useState('Copy');

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(qrCode?.secret);
    setCopyText('Copied');
    setTimeout(() => {
      setCopyText('Copy');
    }, 5000);
  };

  console.log('qrCode?.url', qrCode?.qrCodeUrl);
  return (
    <div
      className="flex flex-col max-h-[600px] h-screen w-full bg-no-repeat bg-cover mx-auto text-white"
      style={{
        padding: '20px',
        maxHeight: '600px',
        maxWidth: '375px',
        backgroundImage: `url(${BgSecureWallet})`,
        backgroundSize: '100% 100%',
      }}
    >
      {/* Header with back button */}
      <NavigationBarTitle
        title="Two Factor Authenticator"
        callback={() => setSelectedMenu('')}
      />

      {/* Main content */}
      <div className="flex flex-col" style={{ marginTop: '12px' }}>
        <h2 className="text-2xl font-bold" style={{ marginBottom: '16px' }}>
          Google Authenticator
        </h2>

        {/* Instructions */}
        <ol className="text-gray-400" style={{ marginBottom: '24px' }}>
          <li style={{ marginBottom: '4px' }}>
            1. Download Google authenticator app
          </li>
          <li style={{ marginBottom: '4px' }}>
            2. Scan the code to set up your 2FA with any authenticator
          </li>
        </ol>

        {/* QR Code */}
        <div
          className="flex flex-row items-center justify-center w-full"
          style={{ marginRight: 'auto', marginLeft: 'auto', marginTop: '20px' }}
        >
          {qrCode?.qrCodeUrl && (
            <img src={qrCode?.qrCodeUrl} className="w-[200px] h-[200px]" />
          )}
        </div>

        {/* Alternative instruction */}
        <p
          className="text-[14px] text-gray-400 text-start font-[500]"
          style={{ marginTop: '16px' }}
        >
          Or copy the code below and paste on your authenticator app
        </p>

        {/* Code input and copy button */}
        <div className="flex items-center" style={{ marginTop: '8px' }}>
          <div
            className="flex items-center flex-grow text-gray-300 bg-gray-800 rounded"
            style={{ padding: '12px 16px', marginRight: '8px', height: '48px' }}
          >
            <p className="font-mono">{DotFormatAddress(qrCode?.secret)}</p>
          </div>
          <button
            className="flex items-center justify-center text-white bg-gray-700 rounded"
            style={{ padding: '12px 16px', height: '48px', minWidth: '80px' }}
            onClick={() => copyToClipBoard()}
          >
            <Copy size={16} style={{ marginRight: '8px' }} />
            {copytext}
          </button>
        </div>
      <div style={{marginTop:"10px"}}>
      <PrimaryButton title="Next" onClick={() => setActive(1)} />
      </div>
      </div>
    </div>
  );
};

export default TwoFaQrCode;
