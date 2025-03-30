import EnterAddress from './enteraddress';
import EnterAmount from './enteramount';
import SelectToken from './selecttoken';
import { useEffect, useState } from 'react';
import TransactionSuccess from './transactionsuccess';
import TokenSummary from './tokensummary';
import { useLocation } from 'react-router-dom';
import ValidatePin from './validatepin';
import ValidateTransaction2FA from './validate2FA';

interface StepType {
  id: number;
  value: number;
  Component: React.FC<{
    active: number;
    setActive: Function;
    setToken: Function;
    token: any;
    amount: string;
    setAmount: Function;
    usdamount: string;
    setUsdAmount: Function;
    setReceiverAddress: Function;
    receiveraddress: string;
    success: boolean;
    setSuccess: Function;
    error: string;
    setError: Function;
    setSelectedTokenUsdPrice:Function;
    selectedTokenUsdPrice:string;
  }>;
}

const SendProps: StepType[] = [
  {
    id: 0,
    value: 1,
    Component: SelectToken,
  },
  {
    id: 1,
    value: 2,
    Component: EnterAddress,
  },
  {
    id: 2,
    value: 3,
    Component: EnterAmount,
  },
  {
    id: 3,
    value: 4,
    Component: TokenSummary,
  },
  {
    id: 4,
    value: 5,
    Component: ValidatePin,
  },
  {
    id: 5,
    value: 6,
    Component: ValidateTransaction2FA,
  },
  {
    id: 6,
    value: 7,
    Component: TransactionSuccess,
  },
];

const Send: React.FC = () => {
  const [steps] = useState<StepType[]>(SendProps);
  const [active, setActive] = useState(0);
  const [selectedToken, setSelectedToken] = useState(null);
  const [selectedTokenUsdPrice, setSelectedTokenUsdPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [usdamount, setUsdAmount] = useState('');
  const [receiveraddress, setReceiverAddress] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      const { active, token, usdamount, receiveraddress, amount } = state;
      setActive(active);
      setSelectedToken(token);
      setAmount(amount);
      setUsdAmount(usdamount);
      setReceiverAddress(receiveraddress);
      setSuccess(false);
      setError('');
    } else {
      setActive(0);
      setSelectedToken(null);
      setAmount('');
      setUsdAmount('');
      setReceiverAddress('');
      setSuccess(false);
      setError('');
    }
    return () => {
      console.log('component unmounted');
      setActive(0);
      setSelectedToken(null);
      setAmount('');
      setUsdAmount('');
      setReceiverAddress('');
      setSuccess(false);
      setError('');
    };
  }, []);

  return (
    <div>
      {steps.map((step) => {
        const { Component, id } = step;
        return (
          <>
            {active === id && (
              <Component
                active={active}
                setActive={setActive}
                setToken={setSelectedToken}
                token={selectedToken}
                amount={amount}
                setAmount={setAmount}
                usdamount={usdamount}
                setUsdAmount={setUsdAmount}
                setReceiverAddress={setReceiverAddress}
                receiveraddress={receiveraddress}
                success={success}
                setSuccess={setSuccess}
                error={error}
                setError={setError}
                setSelectedTokenUsdPrice={setSelectedTokenUsdPrice}
                selectedTokenUsdPrice={selectedTokenUsdPrice}
              />
            )}
          </>
        );
      })}
    </div>
  );
};

export default Send;
