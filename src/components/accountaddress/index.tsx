import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CopySmall, SolanaTokenImg } from '../../assets/index';
import { DotFormatAddress } from '../../helpers/common/dotformataddress';
import DashboardLayout from "../dashboardLayout/index";

interface AccountAddressesProps { }

const AccountAddresses: React.FC<AccountAddressesProps> = () => {
  const [addresses, setAddresses]: any = useState([]);
  const [copied, setCopied] = useState(false);
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
    setAddresses((prev: string[]) => [...prev, defaultAccount?.publicKey])
  };

  const copyToClipBoard = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <DashboardLayout title="Account Address" backCallback={()=> navigate('/edit-account')} navigationBarTitleClass='w-full text-[16px] font-[600] text-center text-white'>
        <div className='mx-auto mt-[20px]'>
        {addresses.map((token: any) => (
          <div key={token} className="flex items-center cursor-pointer bg-[#4B50661A] border border-[#222326] rounded-xl p-4 mt-2 w-[325px] mx-auto">
            <div className="flex items-center justify-center w-10 h-10 mr-3 text-lg font-bold rounded-full">
              <img src={SolanaTokenImg} alt="" />
            </div>
            <div className="flex-1">
              <div className="font-extrabold text-[16px] text-white">Solana</div>
              <div className="text-[14px] font-normal text-white">
                {DotFormatAddress(token)}
              </div>
            </div>
            <div className="w-[35px] h-[35px] rounded-lg bg-[#3A3C48] flex items-center justify-center">
              {!copied && (
                <button onClick={() => copyToClipBoard(token)}>
                  <img src={CopySmall} alt="copy icon" />
                </button>
              )}
              {copied && <img src={CopySmall} alt="copied icon" />}
            </div>
          </div>
        ))}
        </div>
    </DashboardLayout>
  );
};

export default AccountAddresses;
