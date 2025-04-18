import { useEffect, useState } from 'react';
import { truncateWithoutRounding } from '../../helpers/common/truncatewithoutrounding';

interface BalanceProps {
  usdBalance: number | any;
}

const BalanceBoard: React.FC<BalanceProps> = ({ usdBalance }) => {
  const [stats, setStats] = useState({
    usd: '',
    precentage: '',
  });

  useEffect(() => {
    fetchTetherPrice();
  }, []);

  async function fetchTetherPrice() {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=Tether&vs_currencies=usd&include_24hr_change=true'
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response?.status}`);
      }
      const data = await response.json();
      console.log('Tether Price (USD):', data?.tether?.usd);
      setStats({
        usd: data?.tether?.usd,
        precentage: data?.tether?.usd_24h_change.toString(),
      });
      console.log('24h Change (%):', data?.tether?.usd_24h_change);
      return data;
    } catch (error) {
      console.error('Failed to fetch Tether price:', error);
    }
  }

  return (
    <div className="bg-[#4B50661A] rounded-[18px] border-[0.5px] border-[#222326] w-[329px] h-[130px] flex flex-col items-center justify-center mx-auto">
      <h2 className="text-[48px] font-[800] text-[#fff] text-center">
        ${usdBalance ? usdBalance?.toFixed(2) : '0.00'}
      </h2>
      <p className="text-[#fff] flex gap-[7px] justify-center font-bold text-[16px]">
        ${truncateWithoutRounding(Number(stats?.usd), 2)}{' '}
        <span
          className={`justify-center font-bold flex items-center ${
            stats?.precentage?.includes('-')
              ? 'bg-[#af1b1b4d]'
              : 'bg-[#0BA0244D]'
          } text-[14px] rounded-[41px] ${
            stats?.precentage?.includes('-')
              ? 'text-[#fc2d2d]'
              : 'text-[#54D56A]'
          } w-[70px] h-[25px] text-center`}
        >
          {stats?.precentage?.includes('-') ? '' : '+'}{' '}
          {truncateWithoutRounding(Number(stats?.precentage), 2)}%
        </span>
      </p>
    </div>
  );
};

export default BalanceBoard;
