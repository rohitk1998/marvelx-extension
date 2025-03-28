import { useEffect, useState } from 'react';
import { PrimaryButton } from '../common/primary-button';
import { validateSolanaAddress } from '../../helpers/solana/transaction';
import { ValidationError } from '../common/errortext';
import { BgSecureWallet } from '../../assets';
import { NavigationBarTitle } from '../common/navigationbartitle';

interface EnterAddressProps {
  active: number;
  setActive: Function;
  token: any;
  setReceiverAddress: Function;
  receiveraddress: string;
}

const EnterAddress: React.FC<EnterAddressProps> = ({
  setActive,
  active,
  token,
  setReceiverAddress,
  receiveraddress,
}) => {
  const [error, setError] = useState('');

  const handleConfirmAddress = () => {
    if (receiveraddress) {
      const isValid = validateSolanaAddress(receiveraddress);
      if (!isValid) {
        setError('Invalid Solana Address');
      } else {
        setError('');
        setActive(2);
      }
    }
    else{
      setError('Please enter a valid Solana Address');
    }
  };

  useEffect(() => {
    setError('');
    setReceiverAddress('')
  }, []);

  return (
    <div
      className="flex flex-col h-screen text-white bg-no-repeat"
      style={{
        backgroundImage: `url(${BgSecureWallet})`,
        padding: "1rem",
        paddingBottom: '7px',
        height: '600px',
        maxWidth: '360px',
        margin: '0px auto',
        backgroundSize: '100% 100%'

      }}
    >
      <NavigationBarTitle
        title={token?.symbol}
        callback={() => {
          setActive(active -1);
        }}
          titleClass="w-full text-[16px] font-[600] text-center text-white"
      />
      {/* Send To Input */}
      <div className="w-[100%]" style={{ marginTop: '1.5rem' }}>
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

      {/* Confirm Button */}
      <div
        className="mt-auto"
        style={{
          marginTop: "auto"
        }}
      >
        <PrimaryButton title="Confirm" onClick={() => handleConfirmAddress()} />
      </div>
    </div>
  );
};

export default EnterAddress;
