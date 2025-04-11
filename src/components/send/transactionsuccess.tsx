import { useNavigate } from 'react-router-dom';
import { SecondaryButton } from '../common/secondary-button';
import { PrimaryButton } from '../common/primary-button';
import { GreenTickImg, BgSecureWallet } from '../../assets';
import { DotFormatAddress } from '../../helpers/common/dotformataddress';

interface TransactionSuccessProps {
  token: any;
  amount: string;
  receiveraddress: string;
  success: boolean;
  error: string;
  setActive: Function;
  hash: string;
}

const TransactionSuccess: React.FC<TransactionSuccessProps> = ({
  receiveraddress,
  amount,
  token,
  setActive,
  hash,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col w-full items-center justify-center h-screen text-white min-h-[600px] bg-gray-900 max-h-[600px] max-w-[360px] mx-auto p-3"
      style={{ backgroundImage: `url(${BgSecureWallet})` }}
    >
      <div className="flex flex-col min-h-[600px] items-center justify-start">
        <h2
          className="mb-4 text-[16px] gray-400 text-white font-[600] mt-[15px]"
        >
          Summary
        </h2>
        <div
          className="flex items-center justify-center mt-[40px]"
        >
          <img src={GreenTickImg} className="w-[144px] h-[132px]" alt={''} />
        </div>
        <h1 className="text-[32px] font-[700] text-center">
          Your transaction has been processed
        </h1>
        <p
          className="mb-1 text-[14px] text-center text-[#9D9EA4] font-[400] mt-[20px]"
          
          
        >
          {amount} {token.symbol} has been transferred to the{' '}
          {DotFormatAddress(receiveraddress)} wallet address.
        </p>
        <div className="w-[329px] border-none bg-transparent mx-auto flex flex-col text-center mt-[10px]">
        <p className='text-[14px] font-[500]'>View on blockchain </p>
        <button
         className="w-[60%] text-center text-[#9D9EA4] border-none bg-transparent mx-auto text-[12px] hover:border-none hover:text-[#b2b3b9] break-all"
          onClick={() =>
            window.open(
              `https://explorer.solana.com/tx/${hash}?cluster=${
                localStorage.getItem('network') === 'mainnet-beta'
                  ? 'mainnet'
                  : 'devnet'
              }`,
              '_blank'
            )
          }
        >
        {DotFormatAddress(hash)}
        </button>
        </div>
        <div
          className="flex items-center justify-around gap-4 w-[100%] mt-[90px]"
        >
          <SecondaryButton title="Send again" onClick={() => setActive(0)} />

          <PrimaryButton title="Done" onClick={() => navigate('/')} />
        </div>
      </div>
    </div>
  );
};

export default TransactionSuccess;
