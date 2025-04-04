import React, { useState } from 'react';
import { NavigationBarTitle } from '../common/navigationbartitle';
import { PrimaryButton } from '../common/primary-button';
import { BgSecureWallet } from '../../assets';
import { DotFormatAddress } from '../../helpers/common/dotformataddress';
import { CopyWhite } from '../../assets/SvgIcon';
import DashLayout from '../dashboardLayout';
import Spinner from '../common/spinner';

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

  if (!qrCode?.qrCodeUrl) {
    return(
    <DashLayout
      title="Select Token"
      backCallback={() => setSelectedMenu('')}
      navigationBarTitleClass="w-full text-[16px] font-[600] text-center text-white"
    >
    <div className='mt-[250px]'>
    <Spinner loading={true}/>
    </div>
    </DashLayout>
    )
  }

  return (
    <div
      className="flex flex-col max-h-[630px] h-screen w-full bg-no-repeat bg-cover mx-auto text-white rounded-[20px]"

      style={{
        padding: '20px',
        maxWidth: '360px',
        backgroundImage:` url(${BgSecureWallet})`,
        backgroundSize: '100% 100%',
      }}
    >
      <NavigationBarTitle
        title="Two Factor Authenticator"
        callback={() => setSelectedMenu('')}
        titleClass="w-full text-[16px] font-[600] text-center text-white"
      />
      <div className="flex flex-col pt-[25px]" >
        <h2 className="text-[24px] font-medium" style={{ marginBottom: '16px' }}>
          Google Authenticator
        </h2>
        <ol className="text-[#6B6D76] text-[14px] font-[500]" style={{ marginBottom: '24px' }}>
          <li style={{ marginBottom: '4px' }}>
            1. Download Google authenticator app
          </li>
          <li style={{ marginBottom: '4px' }}>
            2. Scan the code to set up your 2FA with any authenticator
          </li>
        </ol>
        <div
          className="flex flex-row items-center justify-center w-full"
          style={{ marginRight: 'auto', marginLeft: 'auto' }}
        >
          {qrCode?.qrCodeUrl && (
            <img src={qrCode?.qrCodeUrl} className="w-[200px] h-[200px]" />
          )}
        </div>
        <p
          className="text-[14px] text-[#6B6D76] text-start font-[500]"
          style={{ marginTop: '16px' }}
        >
          Or copy the code below and paste on your authenticator app
        </p>
        <div className="flex items-center" style={{ marginTop: '10px' }}>
          <div
            className="flex items-center flex-grow text-gray-300 bg-[#3A3C48] border border-[#6B6D76] rounded -[7px] overflow-hidden h-[35px] pl-[12px] pr-[12px"
            style={{ marginRight: '8px', borderRadius: '7px' }}
          >
            <p className="font-mono text-[#fff] font-[500]">{DotFormatAddress(qrCode?.secret)}</p>
          </div>
          <button
            className="flex items-center justify-center text-white bg-[#3A3C48] rounded-[7px] gap-[3px]"
            style={{ height: '35px', minWidth: '80px' }}
            onClick={() => copyToClipBoard()}
          >
            <CopyWhite />
            {copytext}
          </button>
        </div>
        <div style={{ marginTop: "35px" }}>
          <PrimaryButton title="Next" onClick={() => setActive(1)} />
        </div>
      </div>
    </div>
  );
};

export default TwoFaQrCode;