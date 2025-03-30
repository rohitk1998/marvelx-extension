import React, { useState } from 'react';
import { EyeGrayIconOpen } from '../../assets';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import DashboardLayout from "../dashboardLayout/index";
import { ValidationError } from '../common/errortext';

interface PasswordProps{
  setActive: Function;
}

const ValidatePassword: React.FC<PasswordProps> = ({
  setActive
}) => {

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleConfirmPassword = ()=> {
    if(localStorage.getItem('password') === password){
      setError('')
      setActive(1);
    }
    else{
     setError('Password is incorrect')
    }
  }

  return (
    <DashboardLayout
    title="Show Recovery Phrase"
    backCallback={() => navigate(ROUTES.EDIT_ACCOUNT)}
    navigationBarTitleClass="w-full text-[16px] font-semibold text-center text-white"
    showButton={true}
    onClick={()=> handleConfirmPassword()}
    btntitle="Continue"
  >
      <div
        className="text-[#CECED1] text-[14px] font-[400] text-center mt-[200px] w-[282px] h-[44px] mx-auto"
      >
        <p>Please enter your password to unlock your Recovery Phrase</p>
      </div>
        <div className="w-[329px] h-[52px] mx-auto mt-[24px] border border-[#6B6D76] outline-0 rounded-[10px] flex items-center justify-between pr-4">
          <input
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Password"
            className="space-x-1 text-white focus:outline-none"
            style={{
              padding: '12px',
              margin: '0px',
              paddingRight: '40px',
            }}
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
          />
         <button onClick={()=> setPasswordVisible(!passwordVisible)}>
         <img src={EyeGrayIconOpen} alt='' className='w-[24px] h-[24px]' />
         </button>
        </div>
        <div className='w-[329px] mx-auto'>
          <ValidationError error={error} />
        </div>
    </DashboardLayout>
  );
};

export default ValidatePassword;
