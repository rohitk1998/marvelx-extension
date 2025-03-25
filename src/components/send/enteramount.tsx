import { useEffect, useState } from 'react';
import { BgSecureWallet, EditSmall } from '../../assets/index';
import { PrimaryButton } from '../common/primary-button';
import { DotFormatAddress } from '../../helpers/common/dotformataddress';
import { validateSolanaAddress } from '../../helpers/solana/transaction';
import { ValidationError } from '../common/errortext';

interface EnterAmountProps {
  active: number;
  setActive: Function;
  token: any;
  amount: string;
  setAmount: Function;
  usdamount: string;
  setUsdAmount: Function;
  receiveraddress: string;
  setReceiverAddress: Function;
}
const EnterAmount: React.FC<EnterAmountProps> = ({
  setActive,
  token,
  amount,
  setAmount,
  receiveraddress,
  setReceiverAddress,
  setUsdAmount,
  usdamount,
}) => {
  const [inputdisabled, setInputDisabled] = useState(true);
  const [error, setError] = useState('');
  const [fundserror, setFundsError] = useState('');
  console.log('error', error);

  const handleConfirmAddress = ()=>{
    if(receiveraddress){
      const isValid = validateSolanaAddress(receiveraddress);
      if(!isValid){
        setError('Invalid Solana Address');
      }
      else{
       setError('');
       handleBalanceCheck();
      }
    }
  }

  const handleBalanceCheck = ()=> {
    if(Number(amount) > 0){
      const balance = Number(token.amount);
      if(Number(amount) <= balance){
        setActive(3);
      }
      else{
        setFundsError('Insufficient balance');
      }
    }
  }
  
  useEffect(() => {
    setError('');
  }, []);

  const handleUsdAmount = (_amount: any) => {
    let amount = _amount ?? 0;
    let usdamount = Number(amount) * 130.1;
    setUsdAmount(usdamount);
  };

  return (
     <div className="flex flex-col text-white bg-gray-900 max-w-[375px]" style={{ height: '600px',backgroundImage: `url(${BgSecureWallet})` }}>
      <div className="flex flex-col flex-1 w-full max-w-md mx-auto" style={{ padding: '16px 16px' }}>
  
        <div className="relative flex items-center" style={{ marginBottom: '24px' }}>
          <button className="absolute left-0 text-white" style={{ padding: '4px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div className="w-full text-xl font-medium text-center">Enter amount</div>
        </div>

        <div className="flex items-center bg-[#4B50661A] border border-[#222326] rounded-lg" style={{ padding: '12px', marginBottom: '32px' }}>
          <div className="flex items-center flex-grow text-sm text-gray-400">
            <span>Send to:</span>
            <input 
              type="text" 
              value={DotFormatAddress(receiveraddress)} 
              onChange={(e) => setReceiverAddress(e.target.value)}
              className="text-sm text-gray-400 bg-transparent border-none outline-none"
              style={{ marginLeft: '4px', width: 'calc(100% - 60px)' }}
              disabled={inputdisabled}
            />
          </div>
          <button className="text-gray-400 cursor-pointer" onClick={()=> setInputDisabled(false)}>
            <img src={EditSmall} alt='' className='w-[20px] h-[20px]' />
          </button>
        </div>
        <ValidationError error={error} />
        
        <div className="flex flex-col justify-center flex-1 text-center" style={{ marginBottom: '32px' }}>
          <div className="flex items-center justify-center">
            <input
              type="text"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value)
                handleUsdAmount(e.target.value)
              }}
              className="w-full text-5xl font-bold text-center bg-transparent border-none outline-none"
              style={{ marginBottom: '4px' }}
            />
            <p className='text-[48px] text-white'>
              {token.symbol}
            </p>
          </div>
          <div className="text-white">${usdamount}</div>
        </div>

        <div style={{ marginTop: 'auto' }}>
          <ValidationError error={fundserror} />
          <div className="border-t border-gray-800" style={{ paddingTop: '16px', marginBottom: '16px' }}>
            <div className="text-center text-gray-400">Available balance ~ {token.amount} {token.symbol}</div>
          </div>

          <PrimaryButton title='Next' onClick={handleConfirmAddress} />
        </div>
      </div>
    </div>
  );
};

export default EnterAmount;
