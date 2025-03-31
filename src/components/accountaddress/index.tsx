import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CopySmall, SolanaTokenImg } from '../../assets/index';
import { DotFormatAddress } from '../../helpers/common/dotformataddress';
import DashboardLayout from '../dashboardLayout/index';
import { QRCode } from 'react-qrcode-logo';
import { copysmallNew } from '../../assets';

interface AccountAddressesProps {}

const AccountAddresses: React.FC<AccountAddressesProps> = () => {
  const [addresses, setAddresses]: any = useState([]);
  const [copytext, setCopyText] = useState('Copy');
  const navigate = useNavigate();

  useEffect(() => {
    setWalletInLocal();
  }, []);

  const setWalletInLocal = async () => {
    let password: any = localStorage.getItem('password');
    let accounts: any = localStorage.getItem(password);
    if (!accounts) return;
    let defaults: any = JSON.parse(accounts);
    const firstAccountKey = Object.keys(defaults)[0];
    const defaultAccount = defaults[firstAccountKey];
    setAddresses((prev: string[]) => [...prev, defaultAccount?.publicKey]);
  };

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(addresses[0]);
    setCopyText('Copied');
    setTimeout(() => {
      setCopyText('Copy');
    }, 3000);
  };

  return (
    <DashboardLayout
      title="Account Address"
      backCallback={() => navigate('/edit-account')}
      navigationBarTitleClass="w-full text-[16px] font-[600] text-center text-white"
    >
      <div className="text-center mt-[35px]">
        <p className="font-[800] text-[16px] text-white">Solana</p>
      </div>
      <div className="w-[203px] h-[203px] rounded-[15px] bg-white mx-auto mt-[20px] overflow-hidden">
        <QRCode
          value={addresses[0]}
          logoImage={SolanaTokenImg}
          qrStyle="squares"
          removeQrCodeBehindLogo={true}
          logoPaddingStyle="circle"
          logoWidth={50}
          logoHeight={50}
          style={{ width: '203px', height: '203px' }}
        />
      </div>
      <div className="bg-[#4B50661A] rounded-[10px] border-[0.5px] border-[#222326] w-[333px] h-[130px] flex flex-col items-center justify-center mx-auto mt-[35px] p-1">
        <div style={{ padding: '16px 16px' }} className="w-[100%] text-center">
          <p className="text-white text-[15px] font-[500] w-full break-words">
            {addresses[0]}
          </p>
        </div>
        <div className="w-[100%] text-[#3A3C48] border mb-1"></div>
        <div
          className="w-[30%] flex justify-center text-white gap-2 mt-1 cursor-pointer"
          onClick={() => copyToClipBoard()}
        >
          <p>{copytext}</p>
          <div className="w-[24px] h-[24px] rounded-[6px] bg-[#3A3C48] p-1">
            <img src={copysmallNew} alt="" />
          </div>
        </div>
      </div>
      <div className='w-[277px] h-[52px] mx-auto text-center mt-[35px]'>
        <p className='text-[14px] font-[500] text-white'>This address can only be used to receive Solana Tokens</p>
      </div>
    </DashboardLayout>
  );
};

export default AccountAddresses;
