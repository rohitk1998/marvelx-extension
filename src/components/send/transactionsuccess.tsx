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
  setActive:Function;
}

const TransactionSuccess: React.FC<TransactionSuccessProps> = ({receiveraddress,amount,token,setActive}) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col w-full items-center justify-center h-screen text-white min-h-[600px] bg-gray-900 max-h-[600px] max-w-[375px]"
      style={{ backgroundImage: `url(${BgSecureWallet})`,padding:"20px" }}
    >
      <div className="flex flex-col w-[90%] min-h-[600px] items-center justify-between">
        <h2
          className="mb-4 text-[16px] gray-400 text-white font-[600]"
          style={{ marginTop: '15px' }}
        >
          Summary
        </h2>
        <div
          className="flex items-center justify-center"
          style={{ marginTop: '40px' }}
        >
          <img src={GreenTickImg} className='w-[144px] h-[132px]' alt={''} />
        </div>
        <h1
          className="mb-2 text-[32px] font-[700] text-center"
          style={{ marginBottom: '10px' }}
        >
          Your transaction has been processed
        </h1>
        <p
          className="mb-6 text-[14px] text-center text-[#9D9EA4]"
          style={{ marginBottom: '20px' }}
        >
          {amount} {token.symbol} has been transferred to the {DotFormatAddress(receiveraddress)} wallet address.
        </p>
        <div className="flex items-center justify-around gap-4 w-[100%]" style={{marginBottom:"10px"}}>
          <SecondaryButton
            title="Send again"
            onClick={() => setActive(0)}
          />

          <PrimaryButton title="Done" onClick={() => navigate('/')} />
        </div>
      </div>
    </div>
  );
};

export default TransactionSuccess;
