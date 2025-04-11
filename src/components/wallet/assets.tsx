import solana from '../../assets/solana.svg';
import graphfirst from '../../assets/graphfirst.png';
import Spinner from '../common/spinner';
import { truncateWithoutRounding } from '../../helpers/common/truncatewithoutrounding';
import { useEffect, useState } from 'react';
import { smartSlugify } from '../../helpers/common/slugify';

interface AssetsProps {
  tokens: Array<any>;
  loading: boolean;
}

const Assets: React.FC<AssetsProps> = ({ tokens, loading }) => {
  const [_tokens,setTokens]:any = useState([]);

  useEffect(()=> {
    updateTokensListStats();
  },[tokens])
  
  async function updateTokensListStats() {
    try {
      const fetches = (tokens || []).map(async (token: any) => {
        let name = smartSlugify(token?.name);
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${name}/market_chart?vs_currency=usd&days=1`
        );
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log('data:', data);
  
        return {
          ...token,
          price:calculatePrice(data?.prices[data?.prices?.length - 1][1]),
          usd_24h_change: calculateUsdChange(data?.prices[0][1] , data?.prices[data?.prices?.length - 1][1]), // replace with actual logic later
        };
      });
  
      const tokenList = await Promise.all(fetches);
      setTokens(tokenList);
    } catch (error) {
      console.error('Failed to fetch token stats:', error);
      setTokens([]);
    }
  }


  const calculateUsdChange = (first: number, second: number): string => {
    const diff = second - first;
    const absDiff = Math.abs(diff);
    console.log("absDiff",absDiff)
    if (absDiff < 0.02 && diff !== 0) {
      return `${diff > 0 ? '+' : '-'}<$0.02`;
    } else if (diff > 0) {
      return `+$${absDiff.toFixed(2)}`;
    } else if (diff < 0) {
      return `-$${absDiff.toFixed(2)}`;
    } else {
      return '$0.00'; // no change
    }
  };

  const calculatePrice = (value : number)=> {
    if (value < 0.02) {
      return `<$0.02`;
    } else if (value > 0) {
      return `$${value.toFixed(2)}`;
    } else if (value < 0) {
      return `$${value.toFixed(2)}`;
    } else {
      return '$0.00'; // no change
    }
  }


  return (

    <div className=" mx-auto w-[329px] mb-[20px]">
      <h4
        className="text-[#fff] text-[16px] font-extrabold"
        style={{
          padding: '20px 0 22px 0',
        }}
      >
        My assets
      </h4>
      {loading ? (
        <div className="w-[329px] mx-auto items-center mt-[50px]">
          <Spinner loading={loading} />
        </div>
      ) : (
        <ul>
          <li className="flex flex-col gap-[25px]">
            {_tokens?.map((token: any) => {

              return (
                <div className="flex justify-between">
                  <div className="flex gap-[10px]">
                    <img
                      src={token?.logo ? token?.logo : solana}
                      alt="imgs"
                      className="w-[42px] h-[42px] rounded-full bg-cover"
                    />
                    <p className="text-[#fff] text-[16px] font-extrabold flex flex-col gap-[3px]">
                      {token.name}
                      <span className="font-semibold text-[#6E7186] text-[10px]">
                        {token.amount} {token?.symbol ? token?.symbol : 'SOL'}
                      </span>
                    </p>
                  </div>
                  <div className="ml-1 mr-1 graphSec">
                    <img src={graphfirst} alt="imgs" />
                  </div>
                  <div className="ml-0 w-[fit-content] max-w-[90px] bg-transparent flex flex-col justify-center items-end">
                    <h4 className="text-[#fff] text-[14px] font-bold flex flex-col gap-[1px] break-all">
                      {token?.price ? token?.price : '0.00'}
                    </h4>
                    <span className="font-[800] text-[11px] text-[#198E2D]">
                        {token?.usd_24h_change
                          ? `${token?.usd_24h_change}`
                          : '$0.00'}
                      </span>
                  </div>
                </div>
              );
            })}
          </li>
        </ul>
      )}
    </div>
  );
};

export default Assets;
