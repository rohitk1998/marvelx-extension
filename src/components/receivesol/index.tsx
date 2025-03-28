import DashboardLayout from '../dashboardLayout/index';
import warning from '../../assets/icons/warning-2.svg';
import { useState } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { SolanaTokenImg } from '../../assets';

interface SelectTokenProps {
  active: number;
  setActive: Function;
  token: any;
}

const ReceiveSol: React.FC<SelectTokenProps> = ({ token, setActive }) => {
  const [copytext, setCopyText] = useState('Copy');
  const copyToClipBoard = () => {
    navigator.clipboard.writeText(token.associatedTokenAddress);
    setCopyText('Copied');
    setTimeout(() => {
      setCopyText('Copy');
    }, 3000);
  };

  return (
    <DashboardLayout
      title="Receive SOL"
      showButton={true}
      btntitle={copytext}
      onClick={() => copyToClipBoard()}
      backCallback={() => setActive(0)}
      navigationBarTitleClass="w-full text-[16px] font-[600] text-center text-white"
    >
      <div
        className="flex flex-col items-center justify-center"
        style={{ paddingTop: '62px' }}
      >
        <QRCode
          value={token.associatedTokenAddress}
          logoImage={SolanaTokenImg}
          qrStyle="squares"
          removeQrCodeBehindLogo={true}
          logoPaddingStyle="circle"
          logoWidth={50}
          logoHeight={50}
          style={{width:"213px",height:"212px"}}
        />
        <p
          className="text-[14px]font-semi text-[#fff] w-full max-w-[301px] m-auto whitespace-normal break-words text-center"
          style={{ padding: '15px 0 50px 0' }}
        >
          {token.associatedTokenAddress}
        </p>
        <div className="flex gap-[5px] pl-[16px] pr-[16px] mt-[25px]">
          {' '}
          <img src={warning} alt="imgs" className="w-[18px] h-[18px]" />{' '}
          <span className="text-[#9D9EA4] text-[10px]">
            Please make sure that only SOL deposit is made via this address.
            Otherwise, your funds will not be added to available balance - nor
            will it be refunded
          </span>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReceiveSol;
