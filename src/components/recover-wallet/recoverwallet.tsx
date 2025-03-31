import React, { useState } from 'react';
import { AddWalletIcon, SplashImg } from '../../assets';
import { PrimaryButton, NavigationBarTitle } from '../index';
import { useNavigate } from 'react-router-dom';
import { ROUTES, RECOVER_WALLET_OPTIONS } from '../../constants/index';

const RecoverWallet: React.FC = () => {
  const navigate = useNavigate();
  const [path, setPath] = useState('');

  return (
    <div
      className="flex flex-col items-center justify-center w-full max-w-[375px] h-screen max-h-[600px] bg-no-repeat bg-cover bg-center rounded-[20px]"
      style={{ backgroundImage: `url(${SplashImg})` }}
    >
      <div className="w-[90%] flex flex-col gap-5">
        <NavigationBarTitle
          title="Your Keys, Your Crypto"
          callback={() => navigate(ROUTES.ADD_WALLET)}
          titleClass="w-full text-[16px] font-[600] text-center text-white"
        />
        <div className="relative flex justify-center">
          <img src={AddWalletIcon} alt="" />
        </div>
        <div className="flex flex-col w-full gap-4">
          {RECOVER_WALLET_OPTIONS.map((option) => (
            <div
              key={option.id}
              className={`flex flex-row items-start gap-2 cursor-pointer ${
                option.path === path ? 'text-blue-600' : 'text-white'
              }`}
              onClick={() => {
                setPath(option.path);
              }}
            >
              <div className="flex items-center justify-center p-1 rounded-full bg-transparent w-[35px] h-[35px]">
                <img src={option.icon} className='w-[24px] h-[24px]' alt="" />
              </div>
              <div className="">
                <h3 className="text-[16px] font-medium">
                  {option.title}
                </h3>
                {option.description && (
                  <p className="text-[11px] font-[400] tex-[#BDBDBD]">
                    {option.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
       <div className='w-[full] mt-[60px]'>
       <PrimaryButton title={'Confirm'} onClick={() => path === '/recover-secret-phrase' ? navigate(path) : console.log("not clicked") } />
       </div>
      </div>
    </div>
  );
};

export default RecoverWallet;
