import React, { useEffect, useState } from 'react';
import { SplashImg } from '../../assets';
import { PrimaryButton, NavigationBarTitle } from '../index';
import Stepper from '../create-wallet/stepper';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { useAppContext } from '../../context/useappcontext';
import { ValidationError } from '../common/errortext';

interface StepType {
  id: number;
  value: number;
  Component: React.FC<{
    steps: StepType[];
    active: number;
    done: number[];
    setDone: Function;
    setActive: Function;
  }>;
}

interface CreatePasswordProps {
  steps: StepType[];
  active: number;
  done: Array<number>;
  setDone: Function;
  setActive: Function;
}

const CreatePassword: React.FC<CreatePasswordProps> = ({
  steps,
  active,
  done,
  setDone,
  setActive,
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
    if(password.length === 0){
      setError('Password is required');
    }
    else if (password.toString().length < 8) {
      setError('Your password must be at least 8 characters long');
    } else if (password !== confirmpassword) {
      setError('Passwords do not match.');
    } else if (!checked) {
      return;
    } else {
      setError('');
      setActive(1);
      setDone((prev: number[]) => [...prev, 0]);
    }
  }

  useEffect(() => {
    const input:any = document.getElementById("password");
    if (input) {
      setTimeout(() => {
        input.value = ""; // Clear the autofilled value
      }, 100); // Delay to allow autofill to take effect
    }
  }, []);

  return (
    <div
      className="relative flex flex-col items-center  w-full max-w-[375px] bg-no-repeat bg-cover bg-center rounded-[20px] pt-[26px] pr-[23px] pb-[19px] pl-[20px]"
      style={{ backgroundImage: `url(${SplashImg})` }}
    >
      <div className="w-full">
        <NavigationBarTitle
          title="Add a wallet"
          callback={() => navigate(ROUTES.ADD_WALLET)}
        />
      </div>
      <div className="w-full overflow-auto pt-[32px]">
        <Stepper steps={steps} active={active} done={done} />
        <h2 className="text-[20px] font-medium pb-[5px]  text-center text-white ">
          Create password
        </h2>
        <p className="text-[14px] font-[400] text-start text-white">
          This password will unlock your MarvelX wallet only on this device.
          MarvelX cannot recover this password.
        </p>
        <div className="mt-8 mb-4">
          <div className="flex flex-row justify-between w-full">
            <p className="block mb-1 text-[13px] text-white font-normal">
              New password (8 character min)
            </p>
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="text-[12px] text-white font-bold cursor-pointer"
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
                passAdjust(e);
              }}
              id="password"
              autoComplete='new-password'
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
              confirmpassAdjust(e);
            }}
             autoComplete='new-password'
            id='password'
            type={showPassword ? 'text' : 'password'}
            className="w-full h-[46px] px-4 py-2 text-white bg-transparent border border-white rounded-lg focus:outline-none focus:ring-0"
          />

          <div style={{ marginTop: '5px' }}>
            {error && <ValidationError error={error} />}
          </div>
        </div>

        <div className="flex items-start gap-1 mt-8 mb-6 space-x-2 text-sm text-white">
          <input
            onChange={() => {
              setChecked(!checked);
            }}
            type="checkbox"
            // className="flex items-center justify-center w-6 h-4 bg-transparent border border-white-600 appearance-none rounded-[3px] checked:bg-[#1142C7] checked:border-transparent focus:ring-0 after:content-['✔'] after:text-white"
            className="flex items-center justify-center w-6 h-4 bg-transparent border border-white-600 appearance-none rounded-[3px] checked:bg-[#1142C7] checked:border-transparent focus:ring-0 after:content-['✔'] after:text-white after:text-[12px] cursor-pointer after:font-bold after:flex after:items-center after:justify-center checked:after:opacity-100 after:opacity-0"
          />

          <p className="text-[12px] text-white font-normal">
            I understand that MarvelX cannot recover this password for me.{' '}
            <span className="text-[14px] text-white cursor-pointer font-medium">
              Learn more
            </span>
          </p>
        </div>
        <div className="pt-[12px]">
          <PrimaryButton onClick={savePasswordAndProceed} title={'Proceed'} />
        </div>
      </div>
    </div>
  );
};

export default CreatePassword;
