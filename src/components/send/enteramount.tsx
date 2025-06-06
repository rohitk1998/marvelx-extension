import { useEffect, useState } from 'react';
import { BgSecureWallet, EditSmall } from '../../assets/index';
import { PrimaryButton } from '../common/primary-button';
import { DotFormatAddress } from '../../helpers/common/dotformataddress';
import { validateSolanaAddress } from '../../helpers/solana/transaction';
import { ValidationError } from '../common/errortext';
import { NavigationBarTitle } from '../common/navigationbartitle';

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
  selectedTokenUsdPrice: string;
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
  active,
  selectedTokenUsdPrice,
}) => {
  const [inputdisabled, setInputDisabled] = useState(true);
  const [error, setError] = useState('');
  const [fundserror, setFundsError] = useState('');

  const handleConfirmAddress = () => {
    if (receiveraddress) {
      const isValid = validateSolanaAddress(receiveraddress);
      if (!isValid) {
        setError('Invalid Solana Address');
      } else {
        setError('');
        handleBalanceCheck();
      }
    }
  };

  const handleBalanceCheck = () => {
    if (Number(amount) > 0) {
      const balance = Number(token.amount);
      if (Number(amount) <= balance) {
        setActive(3);
      } else {
        setFundsError('Insufficient balance');
      }
    }
  };

  useEffect(() => {
    setError('');
    setAmount('0');
    setUsdAmount(0);
  }, []);

  const handleUsdAmount = (_amount: any) => {
    let amount = _amount ?? 0;
    let usdPrice =
      Number(selectedTokenUsdPrice) > 0
        ? Number(selectedTokenUsdPrice)
        : 126.03;
    let usdamount = Number(amount) * Number(usdPrice);
    setUsdAmount(usdamount);
  };

  return (
    <div
      className="flex flex-col text-white bg-gray-900 max-w-[360px] mx-auto"
      style={{ height: '600px', backgroundImage: `url(${BgSecureWallet})` }}
    >
      <div
        className="flex flex-col flex-1 w-full max-w-md mx-auto"
        style={{ padding: '16px 16px 0' }}
      >
        <NavigationBarTitle
          title={'Enter amount'}
          callback={() => {
            setActive(active - 1);
          }}
          titleClass="w-full text-[16px] font-[600] text-center text-white"
        />
        <div
          className="flex items-center bg-[#4B50661A] border border-[#222326] mt-[32px] rounded-lg"
          style={{ padding: '12px', marginBottom: '32px' }}
        >
          <div className="flex items-center flex-grow text-sm text-gray-400">
            <span>Send to:</span>
            <input
              type="text"
              value={
                inputdisabled
                  ? DotFormatAddress(receiveraddress)
                  : receiveraddress
              }
              onChange={(e) => setReceiverAddress(e.target.value)}
              className="text-sm text-[#fff] font-medium bg-transparent border-none outline-none"
              style={{ marginLeft: '4px', width: 'calc(100% - 60px)' }}
              disabled={inputdisabled}
            />
          </div>
          <button
            className="text-gray-400 cursor-pointer"
            onClick={() => setInputDisabled(!inputdisabled)}
          >
            <img src={EditSmall} alt="" className="w-[20px] h-[20px]" />
          </button>
        </div>
        <div className="pl-[16px]">
          <ValidationError error={error} />
        </div>
        <div
          className="flex flex-col justify-center flex-1 text-center"
          style={{ marginBottom: '32px' }}
        >
          <div className="flex items-center justify-center">
            <input
              type="text"
              value={amount}
              onFocus={() => setAmount('')}
              maxLength={7}
              onChange={(e) => {
                setAmount(e.target.value);
                handleUsdAmount(e.target.value);
              }}
              className="text-5xl font-bold text-center bg-transparent border-none outline-none"
              style={{
                width: amount.length ? `${amount.length}ch` : '1ch',
                minWidth: '50px',
              }}
            />
            <p className="text-[48px] font-[700] text-white ml-0 mt-1">
              {token.symbol}
            </p>
          </div>
          <div className="text-white">~${usdamount ? usdamount : '0.00'}</div>
          <div className="pb-[10px] w-[100%] text-center bg-red">
          <ValidationError error={fundserror} />
        </div>
        </div>
      </div>
      <div style={{ marginTop: 'auto' }}>
        <div
          className="border-t border-gray-800"
          style={{ paddingTop: '10px', marginBottom: '14px' }}
        >
          <div className="text-center text-[#6B6D76] text-[15px]">
            Available balance{' '}
            <span className="text-[#fff] font-[500]">
              ~ {token.amount} {token.symbol}
            </span>
          </div>
        </div>

        <div className="pb-[10px] pl-[20px] pr-[20px]">
          <PrimaryButton title="Next" onClick={handleConfirmAddress} />
        </div>
      </div>
    </div>
  );
};

export default EnterAmount;
