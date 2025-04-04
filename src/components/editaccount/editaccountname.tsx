import React, { useEffect, useState } from 'react';
import { PrimaryButton } from '../index';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '../dashboardLayout/index';
import toast from 'react-hot-toast';
import { ValidationError } from '../common/errortext';
import { updateProfile } from '../../helpers/common/api.helper';
import useUserProfile from '../../hooks/useprofile';

interface EditAccountNameProps {}

const EditAccountName: React.FC<EditAccountNameProps> = () => {
  const { user ,setWalletAddress }:any = useUserProfile();
  const navigate = useNavigate();
  const location = useLocation();
  const [accountname, setAccountName] = useState('');
  const [error] = useState('');
  const [username, setUsername] = useState('');
  const [loading,setLoading]=useState(false);

  const password: any = localStorage.getItem('password') ?? '';
  const account: any = localStorage.getItem(password) ?? '{}';
  const parsedAccount = JSON.parse(account) || {};
  const defaultAccountName = Object.keys(parsedAccount)[0] || '';
  const defaultAccount = parsedAccount;

  useEffect(() => {
    if (defaultAccountName) {
      setWalletAddress(defaultAccount[defaultAccountName]?.publicKey)
      setAccountName(defaultAccountName);
    }
    if(user){
      setUsername(user?.username)
    }
  }, [defaultAccountName , user]);

  const handleWalletDetails = async () => {
    if(accountname !== '' || username !== ''){
      setLoading(true)
      const newObj: any = renameKey(
        parsedAccount,
        defaultAccountName,
        accountname
      );
      const result = await updateProfile(
        defaultAccount[defaultAccountName]?.publicKey,
        username
      );
      if (result?.data) {
        localStorage.setItem(password, JSON.stringify(newObj));
        toast.success('Successfully updated account name');
        setTimeout(() => {
          setLoading(false)
          navigate('/edit-account',{
            state : location?.state
          });
        }, 2000);
      }
      else{
        setLoading(false);
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
    const newObj = { ...obj, [newKeyVal]: obj[oldKey] };
    if(newKeyVal !== defaultAccountName){
      delete newObj[oldKey];
    }
    
    return newObj;
  };
  

  return (
    <DashboardLayout
      title="Edit account name"
      backCallback={() => navigate('/edit-account',{
        state : location?.state
      })}
      navigationBarTitleClass="w-full text-[16px] font-[600] text-center text-white"
    >
      <div className="w-[329px] h-[52px] mx-auto mt-[40px] border border-[#6B6D76] outline-0 rounded-[10px] flex items-center justify-between pr-4">
        <input
          value={accountname}
          placeholder='Account name'
          onChange={(e) => setAccountName(e.target.value)}
          style={{
            padding: '12px',
            margin: '0px',
            paddingRight: '40px',
          }}
          type="text"
           className="space-x-1 text-white focus:outline-none"
        />
        <div className="w-full mx-auto mt-[2px]">
          <ValidationError error={error} />
        </div>
      </div>
      <div className="w-[329px] h-[52px] mx-auto mt-[10px] border border-[#6B6D76] outline-0 rounded-[10px] flex items-center justify-between pr-4">
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
      <div className="w-[329px] mx-auto mt-[318px]">
        <PrimaryButton onClick={()=> {
          if(!loading){
            handleWalletDetails();
          }
        }} title={'Save Changes'} />
      </div>
    </DashboardLayout>
  );
};

export default EditAccountName;
