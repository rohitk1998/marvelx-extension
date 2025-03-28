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
  active
}) => {
  const [inputdisabled, setInputDisabled] = useState(true);
  const [error, setError] = useState('');
  const [fundserror, setFundsError] = useState('');
  console.log('error', error);

  const handleConfirmAddress = () => {
    if (receiveraddress) {
      const isValid = validateSolanaAddress(receiveraddress);
      if (!isValid) {
        setError('Invalid Solana Address');
      }
      else {
        setError('');
        handleBalanceCheck();
      }
    }
  }

  const handleBalanceCheck = () => {
    if (Number(amount) > 0) {
      const balance = Number(token.amount);
      if (Number(amount) <= balance) {
        setActive(3);
      }
      else {
        setFundsError('Insufficient balance');
      }
    }
  }

  useEffect(() => {
    setAmount('');
    setUsdAmount('');
    setError('');
  }, []);

  const handleUsdAmount = (_amount: any) => {
    let amount = _amount ?? 0;
    let usdamount = Number(amount) * 130.1;
    setUsdAmount(usdamount);
  };

  return (
    <div className="flex flex-col text-white bg-gray-900 max-w-[360px] mx-auto" style={{ height: '600px', backgroundImage: `url(${BgSecureWallet})` }}>
      <div className="flex flex-col flex-1 w-full max-w-md mx-auto" style={{ padding: '16px 16px 0' }}>

        <div className="relative flex items-center">
          <button className="absolute left-0 text-white" style={{ padding: '4px' }} onClick={()=> setActive(active - 1)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div className="w-full text-xl font-medium text-center">Enter amount</div>
        </div>

        <div className="flex items-center bg-[#4B50661A] border border-[#222326] mt-[32px] rounded-lg" style={{ padding: '12px', marginBottom: '32px' }}>
          <div className="flex items-center flex-grow text-sm text-gray-400">
            <span>Send to:</span>
            <input
              type="text"
              value={inputdisabled ? DotFormatAddress(receiveraddress): receiveraddress}
              onChange={(e) => setReceiverAddress(e.target.value)}
              className="text-sm text-[#fff] font-medium bg-transparent border-none outline-none"
              style={{ marginLeft: '4px', width: 'calc(100% - 60px)' }}
              disabled={inputdisabled}
            />
          </div>
          <button className="text-gray-400 cursor-pointer" onClick={() => setInputDisabled(!inputdisabled)}>
            <img src={EditSmall} alt='' className='w-[20px] h-[20px]' />
          </button>
        </div>
        <div className='pl-[16px]'>
          <ValidationError error={error} />
        </div>

        <div className="flex flex-col justify-center flex-1 text-center" style={{ marginBottom: '32px' }}>
          <div className="flex items-center justify-center">
            <input
              type="text"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                handleUsdAmount(e.target.value);
              }}
              placeholder='0'
              className="text-5xl font-bold text-center bg-transparent border-none outline-none"
              style={{ width: amount.length ? `${amount.length}ch` : '1ch', minWidth: '50px' }}
            />
            <p className='text-[48px] font-[700] text-white ml-0 mt-1'>
              {token.symbol}
            </p>
          </div>
          <div className="text-white">~${usdamount ? usdamount :  '0.00'}</div>
        </div>



      </div>
      <div style={{ marginTop: 'auto' }}>
        <div className='ml-[16px] pb-[10px]'><ValidationError error={fundserror} /></div>
        <div className="border-t border-gray-800" style={{ paddingTop: '10px', marginBottom: '14px' }}>
          <div className="text-center text-[#6B6D76] text-[15px]">Available balance <span className='text-[#fff] font-[500]'>~ {token.amount} {token.symbol}</span></div>
        </div>

        <div className='pb-[10px] pl-[20px] pr-[20px]'>
          <PrimaryButton title='Next' onClick={handleConfirmAddress} />
        </div>
      </div>
    </div>
  );
};

export default EnterAmount;