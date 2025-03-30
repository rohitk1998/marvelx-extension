import { useNavigate } from 'react-router-dom';
import DashLayout from '../dashboardLayout';
import { useEffect, useState } from 'react';

const data2 = [
  {
    label: 'Solana Devnet',
    value: 'devnet',
  },
  {
    label: 'Solana Mainnet',
    value: 'mainnet',
  },
];

const DeveloperTestNetworks: React.FC = () => {
  const [activeCheckbox, setActiveCheckbox] = useState<string | null>(
    localStorage.getItem('network') || null
  );
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('network', activeCheckbox ?? '');
  }, [activeCheckbox]);

  return (
    <DashLayout
      title="Security and Privacy"
      backCallback={() => navigate(-1)}
      navigationBarTitleClass="w-full text-[16px] font-[600] text-center text-white"
    >
      <div className="flex flex-col bg-[#4B506633] rounded-[10px] border border-[#3739417D] w-[325px] h-[11 2px] mx-auto mt-[35px]">
        {data2.map((item, index) => (
          <div
            key={index}
            className="flex justify-between w-full border-b border-[#3A3C48] last:border-b-0 items-center text-[16px] font-medium cursor-pointer p-[10px_20px] "
            style={{ padding: '14px 16px' }}
          >
            <span className="text-[16px] text-[#fff] font-medium flex gap-[7px] items-center">
              {item.label}
            </span>
            <input
              onChange={() =>
                setActiveCheckbox(
                  activeCheckbox === item.value ? null : item.value
                )
              }
              checked={activeCheckbox === item.value}
              type="checkbox"
              className={`w-[20px] h-[20px] flex items-center justify-center bg-gray-800 appearance-none rounded-[6px]
                ${
                  activeCheckbox === item.value &&
                  "checked:bg-[#1142C7] checked:border-transparent focus:ring-0 after:content-['✔'] after:text-white after:text-[12px] cursor-pointer after:font-bold after:flex after:items-center after:justify-center checked:after:opacity-100 after:opacity-0"
                }
                `}
            />
          </div>
        ))}
      </div>
      <div className="text-start w-[324px] h-[57px] mx-auto mt-2">
        <p className="text-[14px] font-[500] text-white">
          Switching to any testnet network is for test purposes only. Testnet
          tokens don’t hold any value.
        </p>
      </div>
    </DashLayout>
  );
};

export default DeveloperTestNetworks;
