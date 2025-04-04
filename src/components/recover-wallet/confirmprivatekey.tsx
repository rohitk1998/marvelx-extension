import { useState } from 'react';
import { BgSecureWallet, BlueDangerIcon } from '../../assets';
import { PrimaryButton, NavigationBarTitle } from '../index';
import { useAppContext } from '../../context/useappcontext';
import { useNavigate } from 'react-router-dom';
import { recoverByPrivateKey } from '../../helpers/common/api.helper';

interface ConfirmPhraseProps {
  active: number;
  setActive: Function;
}

const ConfirmPrivateKey: React.FC<ConfirmPhraseProps> = ({
  setActive,
}) => {
  const { password } = useAppContext();
  const [error, setError] = useState('');
  const [key, setKey] = useState('');
  const [loading,setLoading]=useState(false);

  const navigate = useNavigate();

  const recoverWallet = async () => {
    try {
      const response : any = await recoverByPrivateKey(key,password);
      if(response?.response?.data?.status === 400){
        setLoading(false);
        setError(response?.response?.data?.message)
      }
     if (response?.data?.status === 200) {
      setLoading(false);
      setError('');
      setAccount(
        password,
        response?.data?.data?.privateKey,
        response?.data?.data?.publicKey,
        response?.data?.data?.privateKeyArr
      );
     }
    } catch (error) {
      setLoading(false);
      console.error('Error in recover by private key:', error);
    }
  };

  const handleWalletRecovery = async () => {
    await recoverWallet();
  };

  function setAccount(
    password: string,
    privatekey: string,
    publickey: string,
    privatekeyarr: Array<any>
  ) {
    localStorage.clear();
    let accountList;
    try {
      accountList = JSON.parse(localStorage.getItem(password) ?? '{}');
      if (typeof accountList !== 'object' || accountList === null) {
        accountList = {};
      }
    } catch {
      accountList = {};
    }

    const accountKeys = Object.keys(accountList);
    const accountExists = Object.values(accountList).some(
      (account: any) => account.key === privatekey
    );

    if (!accountExists) {
      const newAccountKey = `account${accountKeys.length + 1}`;
      accountList[newAccountKey] = {
        walletName: '',
        key: privatekey,
        publicKey: publickey,
      };
      localStorage.setItem(password, JSON.stringify(accountList));
    } else {
      console.log('Account already added');
    }

    localStorage.setItem('privatekey', JSON.stringify(privatekeyarr));
    localStorage.setItem('password', password);
    localStorage.setItem('network','devnet');
    navigate('/wallet-account',{ 
      state : { isRcovered : true }
    });
  }

  const handlePrivateKey = () => {
    if (key === '') {
      setError('Please enter private key');
    }
    else{
      setLoading(true);
      setError('');
      setTimeout(()=> handleWalletRecovery(), 2000);
    }
  };
  
  return (
    <div
      className="relative flex flex-col items-center w-[375px] max-w-[375px] overflow-auto bg-no-repeat bg-cover bg-center rounded-[20px] pt-[26px] pr-[18px] pb-[19px] pl-[20px]"
      style={{ backgroundImage: `url(${BgSecureWallet})` }}
    >
      <NavigationBarTitle
        title="By Private Key"
        callback={() => {
          setActive(0);
        }}
        titleClass="w-full text-[16px] font-[600] text-center text-white"
      />
      <div className="w-full overflow-auto pt-[22px]">
        <div className="text-center w-[310px] mx-auto rounded-[10px]">
          <h2 className="text-[20px] font-[500] text-white">
          Enter Secret Private Key to access your wallet
          </h2>
        </div>

        <div className='mt-[35px] w-[310px] h-[214px] mx-auto rounded-[10px] border border-gray-700'>
         <textarea className={`w-[100%] h-[214px] ${error ? 'border-[#F66868]' : 'border-transparent'} border rounded-[10px] break-words resize-none ${error ? 'text-[#F66868]':'text-white'} text-[16px] font-[500] p-4 outline-none`}  
         value={key}
         onChange={(e:any)=> setKey(e.target.value)}
         />
         <div className='w-full mx-auto text-start mt-[4px]'>
         <p className='text-[#F66868] text-[14px] font-[500]'>{error}</p>
         </div>
        </div>
        <div className='w-[100%] mx-auto mt-[50px] flex flex-row items-center justify-center gap-x-1'>
          <img src={BlueDangerIcon} alt=''  className='w-[24px] h-[24px]'/>
          <p className='text-[13px] font-[700] text-[#1142C7]'>Supports on Solana network</p>
        </div>
        <div className='w-full mt-[20px]'>
        <PrimaryButton
          onClick={() => handlePrivateKey()}
          title={'Confirm'}
          isLoading={loading}
        />
        </div>
      </div>
    </div>
  );
};

export default ConfirmPrivateKey;
