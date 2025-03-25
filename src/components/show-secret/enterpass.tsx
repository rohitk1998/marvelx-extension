import React, { useState } from 'react';
import { BgSecureWallet, Shild } from '../../assets';
import { NavigationBarTitle } from '../common/navigationbartitle';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { PrimaryButton } from '../common/primary-button';

interface PasswordProps{
  setActive: Function;
}

const ValidatePassword: React.FC<PasswordProps> = ({
  setActive
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  return (
    <div
        className="flex flex-col h-screen text-white bg-no-repeat"
        style={{
          backgroundImage: `url(${BgSecureWallet})`,
          padding: '1rem',
          height: '600px',
          width: '375px',
          maxWidth: '375px',
          margin: '0px',
        }}
    >
      <NavigationBarTitle
        title="Show Recovery Phrase"
        callback={() => navigate(ROUTES.EDIT_ACCOUNT)}
      />
      <div
        className="flex justify-center mb-4"
        style={{
          marginTop: '50px',
        }}
      >
        <img src={Shild} alt="" />
      </div>

      <div
        className="text-white text-[16px] font-[500] text-center"
        style={{
          marginTop: '10px'
        }}
      >
        <p>Enter password to show recovery phrase for download or export</p>
      </div>

      <div
        className=""
        style={{
          paddingTop: '20px'
        }}
      >
        <div className="relative">
          <input
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Password"
            className="w-full text-white bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              padding: '12px',
              margin: '0px',
              paddingRight: '40px',
            }}
          />
          <button
            className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2"
            onClick={() => setPasswordVisible(!passwordVisible)}
            style={{
              margin: '0px',
              padding: '0px',
            }}
          >
            {passwordVisible ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.78zm4.357 4.357A4 4 0 0110 8a4 4 0 012.876 1.44l-4.734-4.734zm4.588 7.459l-4.991-4.99c-.362.628-.59 1.346-.59 2.121 0 2.21 1.79 4 4 4 .775 0 1.494-.228 2.121-.59z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div
        className="mt-auto"
        style={{
          marginTop: '200px'
        }}
      >
        <PrimaryButton title='Continue' onClick={()=> setActive(1)} />
      </div>
    </div>
  );
};

export default ValidatePassword;
