import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BgSecureWallet,
  copysmallNew,
  SolanaTokenImg,
} from '../../assets/index';
import useTokenBalance from '../../hooks/usetokensandbalances';
import { DotFormatAddress } from '../../helpers/common/dotformataddress';
import DashboardLayout from '../dashboardLayout/index';
import Spinner from '../common/spinner';
import QrCodeIconGray from '../common/qrcode';

interface SelectTokenProps {
  active: number;
  setActive: Function;
  setToken: Function;
}

const SelectToken: React.FC<SelectTokenProps> = ({ setActive, setToken }) => {
  const { setAddress, tokens, loading } = useTokenBalance();
  const [copied, setCopied]: any = useState('');

  let password: any = localStorage.getItem('password');
  let accounts: any = localStorage.getItem(password);
  let defaults: any = JSON.parse(accounts);
  const firstAccountKey = Object.keys(defaults)[0];
  const defaultAccount = defaults[firstAccountKey];

  const intervalRef:any = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    setWalletInLocal();
  }, []);

  const setWalletInLocal = async () => {
    setAddress(defaultAccount?.publicKey);
  };

  const copyToClipBoard = (value: number) => {
     setCopied(value);
    let currentInterval = intervalRef?.current
    if (currentInterval && copied !== value) {
      clearInterval(currentInterval);
      console.log("Previous interval cleared.");
    }
    currentInterval = setInterval(() => {
      navigator.clipboard.writeText(defaultAccount?.publicKey);
      setCopied('');
    }, 1000);
    
  };

  if (loading) {
    return (
      <DashboardLayout
        title="Select Token"
        backCallback={() => navigate('/wallet-board')}
        navigationBarTitleClass="w-full text-[16px] font-[600] text-center text-white"
      >
        <div className="mt-[250px]">
          <Spinner loading={loading} />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <div
      className="h-screen text-white max-h-[600px] bg-no-repeat max-w-[360px]  mx-auto"
      style={{
        backgroundImage: `url(${BgSecureWallet})`,
        backgroundSize: '100% 100%',
        padding: '1rem',
      }}
    >
      <div
        className="flex items-center pt-[5px]"
        style={{ marginBottom: '1.5rem' }}
      >
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
        <h3
          className="flex-1 text-[16px] text-center font-[600]"
          style={{ marginRight: '1.5rem' }}
        >
          Receive token
        </h3>
      </div>
      <div className="space-y-3">
        {tokens.map((token: any, index: number) => (
          <div
            key={token?.symbol}
            className="relative flex items-center bg-[#4B50661A] border border-[#222326b0] rounded-xl"
            style={{ padding: '14px', marginTop: '10px' }}
          >
            <div
              className="w-[100%] flex flex-row items-center cursor-pointer"
              onClick={() => {
                setToken(token);
                setActive(1);
              }}
            >
              <div
                className={`w-[42px] h-[42px] rounded-full flex items-center justify-center text-lg font-bold`}
                style={{ marginRight: '0.75rem' }}
              >
                <img
                  src={token?.logo ? token?.logo : SolanaTokenImg}
                  alt=""
                  className="w-[42px] h-[42px] rounded-full"
                />
              </div>
              <div className="flex-1">
                <div className="font-extrabold text-[16px] text-white">
                  {token.name}
                </div>
                <div className="text-[10px] font-semibold text-[#6E7186] pt-[2px] h-[15px]">
                  {copied === index ? (
                    <span className="text-[white] text-[12px] font-[500]">
                      Copied !
                    </span>
                  ) : (
                    DotFormatAddress(defaultAccount?.publicKey)
                  )}
                </div>
              </div>
            </div>
            <button
              className="w-[35px] h-[35px] rounded-lg bg-[#3A3C48] flex items-center justify-center absolute right-15 cursor-pointer text-[#fcfbfba2]"
              onClick={() => {
                setToken(token);
                setActive(1);
              }}
            >
              <QrCodeIconGray />
            </button>
            <button
              className="w-[35px] h-[35px] rounded-lg bg-[#3A3C48] flex items-center justify-center absolute right-4 cursor-pointer"
              onClick={() => copyToClipBoard(index)}
            >
              <img
                src={copysmallNew}
                alt="copy icon"
                className="w-[20px] h-[20px]"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectToken;
