import { useNavigate } from 'react-router-dom';
import DashLayout from '../dashboardLayout';
import arrowright from '../../assets/icons/arrow-right.svg';
import { useState } from 'react';
import { toggleOffIcon, toggleONIcon,solanaIcon } from '../../assets/index';

const data = [
  {
    id: 0,
    label: 'Testnet mode',
    text: 'Applied to balances and app connections',
    nextarrow: arrowright,
  },
  {
    id: 1,
    label: 'Enable Copy Transaction',
    text: 'Copy sterilized transaction data',
    nextarrow: arrowright,
  },
];

const testNetworks = [
  {
    label: 'Solana',
    icon: arrowright,
    nextarrow: arrowright,
  },
];

const DeveloperSettings: React.FC = () => {
  const navigate = useNavigate();
  const [activeToggles, setActiveToggles] = useState<{
    [key: string]: boolean;
  }>({});

  const handleToggle = (label: string) => {
    if (label === 'Testnet mode') {
      setActiveToggles((prevState) => ({
        ...prevState,
        [label]: !prevState[label],
      }));
    }
  };

  return (
    <DashLayout
      title="Developer settings"
      backCallback={() => navigate(-1)}
      navigationBarTitleClass="w-full text-[16px] font-[600] text-center text-white"
    >
      <div
        className={`flex flex-col bg-[#4B506633] rounded-[10px] border border-[#3739417D] w-[325px] mx-auto mt-[30px]`}
      >
        {data.map((item, index) => (
          <>
            <div
              key={index}
              className="flex justify-between w-full border-b border-[#3A3C48] last:border-b-0 items-center text-[16px] font-medium cursor-pointer p-[10px_20px] "
              style={{ padding: '14px 16px' }}
            >
              <div className=" text-[#fff] font-medium flex gap-[2px] items-start justify-start w-[100%] flex-col">
                <p className="text-[16px] font-[500]">{item.label}</p>
                <p className="text-[10px] font-[400]">{item.text}</p>
              </div>
              {item.nextarrow && (
                <button onClick={() => handleToggle(item.label)}>
                  <img
                    src={
                      activeToggles[item.label] ? toggleONIcon : toggleOffIcon
                    }
                    alt="toggle"
                    className="w-[22px] h-[22px]"
                  />
                </button>
              )}
            </div>
            {activeToggles[item.label] && item.id === index && (
              <div>
                {testNetworks.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between w-full border-b border-[#3A3C48] last:border-b-0 items-center text-[16px] font-medium cursor-pointer p-[10px_20px] "
                    style={{ padding: '14px 16px' }}
                    // onClick={() => navigate('/two-factor-verification')}
                  >
                    <span className="text-[16px] text-[#fff] font-medium flex gap-[7px] items-center">
                      {item.icon && (
                        <img
                          src={solanaIcon}
                          alt="icon"
                          className="w-[24px] h-[24px]"
                        />
                      )}
                      {item.label}
                    </span>
                    {item.nextarrow && (
                      <button className='flex items-center justify-center gap-3' onClick={()=> navigate('/developer-networks')}>
                        <p className='text-gray-700 texyt-[14px] font-[500]'>{localStorage.getItem('network') === 'devnet' ? 'Solana Devnet' : 'Solana Mainnet'}</p>
                        <img
                          src={item.nextarrow}
                          alt="arrow"
                          className="w-[22px] h-[22px]"
                        />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        ))}
      </div>
    </DashLayout>
  );
};

export default DeveloperSettings;
