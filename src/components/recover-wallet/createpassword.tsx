import React, { useEffect, useState } from 'react';
import { SplashImg } from '../../assets';
import { PrimaryButton, NavigationBarTitle } from '../index';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { useAppContext } from '../../context/useappcontext';
import { ValidationError } from '../common/errortext';

interface RecoverWalletCreatePasswordProps {
  setActive: Function;
}

const RecoverWalletCreatePassword: React.FC<RecoverWalletCreatePasswordProps> = ({
  setActive

}) => {
  const navigate = useNavigate();
  const { password, setPassword, confirmpassword, setConfirmPassword } =
    useAppContext();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [checked, setChecked] = useState(false);

  function passAdjust(e: any) {
    setPassword(e.target.value);
  }

  function confirmpassAdjust(e: any) {
    setConfirmPassword(e.target.value);
  }

  useEffect(() => {
    setConfirmPassword('');
    setPassword('');
  }, []);

  function savePasswordAndProceed() {
    if (password !== confirmpassword) {
      setError('Passwords do not match.');
    } 
    else if(!checked){
     return;
    }
    else {
      setError('')
      setActive(1);
      console.log(error);
    }
  }

  return (
    <div
      className="flex flex-col items-center justify-center w-full max-w-[375px] h-screen max-h-[580px] bg-no-repeat bg-cover bg-center rounded-xl"
      style={{ backgroundImage: `url(${SplashImg})` }}
    >
      <div className="w-[90%] flex flex-col gap-8">
        <NavigationBarTitle
          title="Recover your wallet"
          callback={() => navigate(ROUTES.ADD_WALLET)}
        />

        {/* Title & Description */}
        <h2 className="text-[20px] font-[400]  text-center text-white ">
          Create password
        </h2>
        <p className="mb-4 text-[14px] font-[400] text-start text-white">
          This password will unlock your MarvelX wallet only on this device.
          MarvelX cannot recover this password.
        </p>

        {/* Password Inputs */}
        <div className="mt-8 mb-4">
          <div className="flex flex-row justify-between w-full">
            <p className="block mb-1 text-[13px] text-white font-[100]">
              New password (8 character min)
            </p>
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="text-[12px] text-white"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className="relative">
            <input
              value={password}
              onChange={(e) => {
                if (confirmpassword === e.target.value) {
                  setError('');
                }
                passAdjust(e)}}
              type={showPassword ? 'text' : 'password'}
              className="w-full h-[46px] px-4 py-2 text-white bg-transparent border border-white rounded-lg focus:outline-none focus:ring-0"
            />
          </div>
        </div>

        <div className="mt-8 mb-4">
          <p className="block mb-1 text-[13px] text-white font-[100]">
            Confirm password
          </p>
          <input
            value={confirmpassword}
            onChange={(e) => {
              if (password === e.target.value) {
                setError('');
              }
              confirmpassAdjust(e)}}
              type={showPassword ? 'text' : 'password'}
            className="w-full h-[46px] px-4 py-2 text-white bg-transparent border border-white rounded-lg focus:outline-none focus:ring-0"
          />
           <div style={{ marginTop: '5px' }}>
            {error && <ValidationError error={error} />}
          </div>
        </div>
          
        <div className="flex items-start gap-4 mt-8 mb-6 space-x-2 text-sm text-white">
          <input
            onChange={()=>setChecked(!checked)}
            type="checkbox"
            className="flex items-center justify-center w-6 h-4 bg-transparent border border-white-600 appearance-none rounded-[3px] checked:bg-[#1142C7] checked:border-transparent focus:ring-0 after:content-['✔'] after:text-white after:text-[12px] after:font-bold after:flex after:items-center after:justify-center checked:after:opacity-100 after:opacity-0"
          />

          <p className="text-[13px] text-white font-[100]">
            I understand that MarvelX cannot recover this password for me.{' '}
            <span className="text-[14px] text-white cursor-pointer font-[500]">
              Learn more
            </span>
          </p>
        </div>
        <PrimaryButton onClick={savePasswordAndProceed} title={'Proceed'} />
      </div>
    </div>
  );
};

export default RecoverWalletCreatePassword;
