import solana from '../../assets/solana.svg';
import graphfirst from '../../assets/graphfirst.png';
import Spinner from '../common/spinner';

interface AssetsProps {
  tokens: Array<any>;
  loading: boolean;
}
const Assets: React.FC<AssetsProps> = ({ tokens, loading }) => {
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
        <div className='w-[329px] mx-auto items-center mt-[50px]'>
          <Spinner loading={loading} />
        </div>
      ) : (
        <ul>
          <li className="flex flex-col gap-[25px]">
            {tokens.map((token: any) => {
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
                  <div className="graphSec">
                    <img src={graphfirst} alt="imgs" />
                  </div>
                  <div className="listingData_rightData">
                    <h4 className="text-[#fff] text-[16px] font-extrabold flex flex-col gap-[3px]">
                      ${token?.price ? Number(token?.price).toFixed(2) : '0.00'}
                      <span className="font-semibold text-[10px] text-[#198E2D]">
                        { token?.usd_24h_change ? `$${token?.usd_24h_change}` : '$0.00' }
                      </span>
                    </h4>
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
