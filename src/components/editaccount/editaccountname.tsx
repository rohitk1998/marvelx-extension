import React, { useEffect, useState } from 'react';
import { PrimaryButton } from '../index';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '../dashboardLayout/index';
import toast from 'react-hot-toast';
import { ValidationError } from '../common/errortext';

interface EditAccountNameProps {}

const EditAccountName: React.FC<EditAccountNameProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [accountname, setAccountName] = useState('');
  const [error, setError] = useState('');
  const password: any = localStorage.getItem('password') ?? '';
  const account: any = localStorage.getItem(password) ?? '{}';
  const parsedAccount = JSON.parse(account) || {};
  const defaultAccountName = Object.keys(parsedAccount)[0] || '';

  useEffect(() => {
    if (defaultAccountName) {
      setAccountName(defaultAccountName);
    }
  }, [defaultAccountName]);

  const renameKey = (
    obj: Record<string, any>,
    oldKey: string,
    newKey: string
  ) => {
    if (!obj[oldKey]) return obj;

    const newObj = { ...obj, [newKey]: obj[oldKey] };
    delete newObj[oldKey];

    return newObj;
  };

  const handleEditAccountName = () => {
    if (accountname !== '') {
      setError('');
      const newObj: any = renameKey(
        parsedAccount,
        defaultAccountName,
        accountname
      );
      console.log('newObj', newObj);
      toast.success('Successfully updated account name');
      setTimeout(() => {
        localStorage.setItem(password, JSON.stringify(newObj));
        navigate('/edit-account');
      }, 2000);
    } else {
      setError('Account name is required');
    }
  };

  return (
    <DashboardLayout
      title="Edit account name"
      backCallback={() => navigate('/edit-account',{
        state : location?.state
      })}
      navigationBarTitleClass="w-full text-[16px] font-[600] text-center text-white"
    >
      <div className="w-[329px] mx-auto mt-[35px] border border-gray-800 rounded-[10px] h-[52px]">
        <input
          value={accountname}
          placeholder='Account name'
          onChange={(e) => setAccountName(e.target.value)}
          type="text"
          className="w-full h-[46px] px-4 py-2 text-white bg-transparent border border-transparent rounded-lg focus:outline-none focus:ring-0"
        />
        <div className="w-full mx-auto mt-[2px]">
          <ValidationError error={error} />
        </div>
      </div>
      <div className="w-[329px] mx-auto mt-[390px]">
        <PrimaryButton onClick={handleEditAccountName} title={'Save Changes'} />
      </div>
    </DashboardLayout>
  );
};

export default EditAccountName;
