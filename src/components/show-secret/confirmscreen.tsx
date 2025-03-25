import React, { useState } from 'react';
import { BgSecureWallet, KeySquare } from '../../assets';
import { NavigationBarTitle } from '../common/navigationbartitle';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../common/primary-button';

interface PasswordProps {
  setActive: Function;
}

const RecoveryPhraseWarningScreen: React.FC<PasswordProps> = ({
  setActive,
}) => {
  const [isChecked, setIsChecked] = useState(false);
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
        callback={() => setActive(0)}
      />
      <div
        className="flex flex-col items-center px-4"
        style={{
          paddingTop: '0px',
          paddingBottom: '16px',
          marginBottom: '16px',
        }}
      >
        <div
          className="p-4 mb-6"
          style={{
            marginTop: '24px',
          }}
        >
          <img src={KeySquare} alt="" />
        </div>
      </div>

      <div
        className="mb-6 text-start text-white text-[13px] font-[400]"
        style={{ marginTop: '20px' }}
      >
        <p className="text-base text-white">
          Do not share your Recovery Phrase. Anyone with your recovery phrase
          can have access to your account.
        </p>

        <p className="text-base text-white">
          If you lose your recovery phrase, your funds may be lost.
        </p>
      </div>

      <div
        className="flex items-start gap-4 mt-8 mb-6 space-x-2 text-sm text-white"
        style={{ marginTop: '140px' }}
      >
        <input
          onChange={() => {
            setIsChecked(!isChecked);
          }}
          type="checkbox"
          className="flex items-center justify-center w-6 h-4 bg-transparent border border-white-600 appearance-none rounded-[3px] checked:bg-[#1142C7] checked:border-transparent focus:ring-0 after:content-['✔'] after:text-white after:text-[12px] after:font-bold after:flex after:items-center after:justify-center checked:after:opacity-100 after:opacity-0"
        />

        <p className="text-[14px] text-white font-[400]">
          I will not share my Recovery Phrase with anyone, website, or third
          party.
        </p>
      </div>

      <div
        style={{
          marginTop: '10px',
        }}
      >
        <PrimaryButton title="Continue" onClick={() => setActive(1)} />
      </div>
    </div>
  );
};

export default RecoveryPhraseWarningScreen;
