import solana from '../../assets/solana.svg';
import graphfirst from '../../assets/graphfirst.png';
interface AssetsProps {
  tokens: Array<any>;
}
const Assets: React.FC<AssetsProps> = ({ tokens }) => {
  return (
    <div className="">
      <h4
        className="text-[#fff] text-[16px] font-extrabold "
        style={{
          padding: '20px 0 22px 0',
        }}
      >
        My assets
      </h4>
      <ul>
        <li className="flex flex-col gap-[25px]">
          {tokens.map((token: any) => {
            return (
              <div className="flex justify-between">
                <div className="flex gap-[10px]">
                  <img src={solana} alt="imgs" />
                  <p className="text-[#fff] text-[16px] font-extrabold flex flex-col gap-[3px]">
                    {token.name}
                    <span className="font-semibold text-[#6E7186] text-[10px]">
                      {token.amount} SOL
                    </span>
                  </p>
                </div>
                <div className="graphSec">
                  <img src={graphfirst} alt="imgs" />
                </div>
                <div className="listingData_rightData">
                  <h4 className="text-[#fff] text-[16px] font-extrabold flex flex-col gap-[3px]">
                    223.03
                    <span className="font-semibold text-[10px] text-[#198E2D]">
                      + $345
                    </span>
                  </h4>
                </div>
              </div>
            );
          })}
        </li>
      </ul>
    </div>
  );
};

export default Assets;
