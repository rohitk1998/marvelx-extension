import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BgSecureWallet, CopySmall, SOL } from '../../assets/index';
import { DotFormatAddress } from '../../helpers/common/dotformataddress';

interface AccountAddressesProps {}

const AccountAddresses: React.FC<AccountAddressesProps> = () => {
  const [addresses,setAddresses]:any=useState([]);
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
    setAddresses((prev:string[])=> [...prev,defaultAccount?.publicKey])
  };

  const copyToClipBoard = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

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
      <div className="flex items-center" style={{ marginBottom: '1.5rem' }}>
        <button style={{ marginRight: '1rem' }} onClick={() => navigate(-1)}>
          <svg
            className="w-6 h-6 cursor-pointer"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
        </button>
        <h1
          className="flex-1 text-xl font-medium text-center"
          style={{ marginRight: '1.5rem' }}
        >
          Account Address
        </h1>
      </div>
      <div className="space-y-3">
        {addresses.map((token: any) => (
          <div
            key={token}
            className="flex items-center cursor-pointer bg-[#4B50661A] border border-[#222326] rounded-xl"
            style={{ padding: '1rem', marginTop: '10px' }}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold`}
              style={{ marginRight: '0.75rem' }}
            >
              <img src={SOL} alt="" />
            </div>
            <div className="flex-1">
              <div className="font-medium">{'Solana'}</div>
              <div className="text-[14px] font-[400] text-white">
                {DotFormatAddress(token)}
              </div>
            </div>
            <div className="w-[35px] h-[35px] rounded-lg bg-gray-400 flex items-center justify-center">
              {!copied && (
                <button
                  onClick={() => copyToClipBoard(token)}
                >
                  <img src={CopySmall} alt="copy icon" />
                </button>
              )}
              {copied && <img src={CopySmall} alt="copied icon" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountAddresses;
