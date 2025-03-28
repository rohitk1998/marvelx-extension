import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../dashboardLayout/index';
import useTokenBalance from '../../hooks/usetokensandbalances';
import { SolanaTokenImg } from '../../assets/index';
import Spinner from '../common/spinner';

interface SelectTokenProps {
  active: number;
  setActive: Function;
  setToken: Function;
}

const SelectToken: React.FC<SelectTokenProps> = ({
  active,
  setActive,
  setToken,
}) => {
  const { setAddress, tokens, loading } = useTokenBalance();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  console.log(active, setActive);

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
    setAddress(defaultAccount?.publicKey);
  };

  if (loading) {
    return(
    <DashboardLayout
      title="Select Token"
      backCallback={() => navigate('/wallet-board')}
      navigationBarTitleClass="w-full text-[16px] font-[600] text-center text-white"
    >
    <Spinner loading={loading}/>
    </DashboardLayout>
    )
  }
  
  return (
    <DashboardLayout
      title="Select Token"
      backCallback={() => navigate('/wallet-board')}
      navigationBarTitleClass="w-full text-[16px] font-[600] text-center text-white"
    >
      <div className="flex text-white flex-row items-center justify-between w-[333px] h-[44px]  border border-[#222326] mt-[20px] bg-[#4B50661A] mx-auto p-2 pl-[10px] rounded-[10px]">
        <input
          className="w-full border-0 focus:outline-none pl-[7px]"
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </div>
      <div className="w-[100%] h-[1px] bg-[#232532] mt-[20px]"></div>
      <div className="mt-[15px] w-[333px] h-[63px] mx-auto">
        {tokens.map((token: any) => (
          <div
            key={token?.symbol}
            className="flex items-center cursor-pointer bg-[#4B50661A] border border-[#222326] rounded-xl"
            style={{ padding: '1rem', marginTop: '10px' }}
            onClick={() => {
              setToken(token);
              setActive(1);
            }}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold`}
              style={{ marginRight: '0.75rem' }}
            >
              <img src={SolanaTokenImg} alt="" />
            </div>
            <div className="flex-1">
              <div className="font-[800] text-white text-[16px]">
                {token.name}
              </div>
              <div className="text-sm text-gray-400">{token?.amount} SOL</div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default SelectToken;
