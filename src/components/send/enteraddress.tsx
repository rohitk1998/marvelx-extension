import { useEffect, useState } from 'react';
import { PrimaryButton } from '../common/primary-button';
import { validateSolanaAddress } from '../../helpers/solana/transaction';
import { ValidationError } from '../common/errortext';
import { BgSecureWallet } from '../../assets';

interface EnterAddressProps {
  active: number;
  setActive: Function;
  token: any;
  setReceiverAddress:Function;
  receiveraddress:string;
}

const EnterAddress: React.FC<EnterAddressProps> = ({
  setActive,
  token,
  setReceiverAddress,
  receiveraddress
}) => {
  const [error,setError] = useState('');

  const handleConfirmAddress = ()=>{
    if(receiveraddress){
      const isValid = validateSolanaAddress(receiveraddress);
      if(!isValid){
        setError('Invalid Solana Address');
      }
      else{
        setError('');
        setActive(2);
      }
    }
  }

  useEffect(()=>{
    setError('')
  },[])

  return (
    <div
      className="h-screen text-white min-h-[600px] bg-no-repeat max-w-[375px]"
      style={{ backgroundImage: `url(${BgSecureWallet})`, padding: '1rem' }}
    >
      <div className="flex items-center" style={{ marginBottom: '1.5rem' }}>
        <button style={{ marginRight: '1rem' }} onClick={() => setActive(0)}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
        </button>
        <h1
          className="flex-1 text-xl font-medium text-center"
          style={{ marginRight: '1.5rem' }}
        >
          {token?.symbol}
        </h1>
      </div>
      <div className="relative" style={{ marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="Send to: username or address"
          className="w-full text-gray-100 bg-[#4B50661A] border border-[#222326] rounded-xl focus:outline-none"
          style={{
            paddingTop: '0.75rem',
            paddingBottom: '0.75rem',
            paddingLeft: '1rem',
            paddingRight: '1rem',
          }}
          value={receiveraddress}
          onChange={(e) => {
            setReceiverAddress(e.target.value);
          }}
        />
       <ValidationError error={error} />
      </div>
      <div className='fixed left-0 right-0 w-[90%] bottom-4' style={{margin:"auto"}}>
        <PrimaryButton title="Confirm" onClick={() => handleConfirmAddress()} />
      </div>
    </div>
  );
};

export default EnterAddress;
