import toast from 'react-hot-toast';
import editIcon from '../../assets/icons/edit-small.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { Profile, SplashImg } from '../../assets/index';
import { useEffect, useState } from 'react';
import { updateProfile } from '../../helpers/common/api.helper';
import { NavigationBarTitle } from '../common/navigationbartitle';
import { PrimaryButton } from '../common/primary-button';

function getInitials(name: string) {
  if (!name || typeof name !== 'string') return ''; // Return empty string if no data

  const words = name.trim().split(/\s+/); // Split by spaces and remove extra spaces

  if (words.length > 1) {
    return words[0][0] + words[1][0]; // First letter of the first two words
  }

  return words[0][0]; // First letter of a single word
}

const SetWalletDetails: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [accountName, setAccountName] = useState('');

  const location = useLocation();

  const password: any = localStorage.getItem('password') ?? '';
  const account: any = localStorage.getItem(password) ?? '{}';
  const parsedAccount = JSON.parse(account) || {};
  const defaultAccountName = Object.keys(parsedAccount)[0] || '';
  const defaultAccount = parsedAccount;

  console.log('defaultAccount', defaultAccount);

  useEffect(() => {
    setAccountName(defaultAccountName);
  }, [defaultAccountName]);

  const closeTab = () => {
    let text = 'Congratulations! you have successfully created wallet. Pin your marvelX extension'
    if(location?.state?.isRcovered){
      text = 'Congratulations! you have successfully recovered wallet. Pin your marvelX extension'
    }
    toast.success(text);
    setTimeout(() => {
      localStorage.setItem('marvel-wallet-exist', 'true');
      navigate('/#/wallet-board');
      chrome.tabs.getCurrent(function (tab: any) {
        chrome.tabs.remove(tab?.id);
      });
    }, 3000);
  };

  const handleWalletDetails = async () => {
    if(accountName !== '' || username !== ''){
      const newObj: any = renameKey(
        parsedAccount,
        defaultAccountName,
        accountName
      );
      console.log('newObj', newObj);
      const result = await updateProfile(
        defaultAccount[defaultAccountName]?.publicKey,
        username
      );
      console.log('result', result);
      if (result?.data) {
        closeTab();
        localStorage.setItem(password, JSON.stringify(newObj));
      }
    }
  };

  const renameKey = (
    obj: Record<string, any>,
    oldKey: string,
    newKey: string
  ) => {
    if (!obj[oldKey]) return obj;
    let newKeyVal = newKey ?? defaultAccountName;
    console.log("new  key",newKeyVal)
    const newObj = { ...obj, [newKeyVal]: obj[oldKey] };
    console.log(newObj,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    if(newKeyVal !== defaultAccountName){
      delete newObj[oldKey];
    }
    
    return newObj;
  };

  return (
    <div
      className="relative flex flex-col items-center  w-full max-w-[375px] bg-no-repeat bg-cover bg-center rounded-[20px] pt-[26px] pr-[23px] pb-[19px] pl-[20px] h-[626px]"
      style={{ backgroundImage: `url(${SplashImg})` }}
    >
      <div className="w-full">
        <NavigationBarTitle
          title="Create Wallet Name"
          callback={() => navigate('/add-wallet')}
        />
      </div>
      <div
        className="relative flex flex-col items-center justify-center mt-[20px]"
        style={{ padding: '22px 0 28px 0' }}
      >
        <div
          className="w-[148px] h-[148px] rounded-full bg-cover bg-no-repeat flex items-center justify-center"
          style={{ backgroundImage: `url(${Profile})` }}
        >
          <h1 className="text-[42px] font-[800] text-white">{accountName ? getInitials(accountName).toUpperCase() : ''}</h1>
        </div>
        <span className="absolute right-0 bg-[#3A3C48] rounded-full w-[38px] h-[38px] flex justify-center items-center left-[59%] bottom-[15%] border-3 border-[#0C0E1E]">
          <img src={editIcon} alt="imgs" className="w-[18px] h-[18px] " />
        </span>
      </div>
      <div className="w-[329px] h-[52px] mx-auto mt-[2px] border border-[#6B6D76] outline-0 rounded-[10px] flex items-center justify-between pr-4">
        <input
          type="text"
          placeholder="Account name"
          className="space-x-1 text-white focus:outline-none"
          style={{
            padding: '12px',
            margin: '0px',
            paddingRight: '40px',
          }}
          value={accountName}
          onChange={(e) => {
            setAccountName(e.target.value);
          }}
        />
      </div>
      <div className="w-[329px] h-[52px] mx-auto mt-[20px] border border-[#6B6D76] outline-0 rounded-[10px] flex items-center justify-between pr-4">
        <input
          type="text"
          placeholder="Account username"
          className="space-x-1 text-white focus:outline-none"
          style={{
            padding: '12px',
            margin: '0px',
            paddingRight: '40px',
          }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="w-[329px] mx-auto mt-[130px]">
        <PrimaryButton title="Continue" onClick={() => handleWalletDetails()} />
      </div>
    </div>
  );
};

export default SetWalletDetails;
