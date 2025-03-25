import React from 'react';
import { BgSecureWallet } from '../../assets';
import { PrimaryButton, SecondaryButton, NavigationBarTitle } from '../index';
import Stepper from '../create-wallet/stepper';

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

interface SecureWalletMainProps {
  steps: StepType[];
  active: number;
  done: Array<number>;
  setDone: Function;
  setActive: Function;
  setSubActive: Function;
}

const SecureWalletMain: React.FC<SecureWalletMainProps> = ({
  steps,
  active,
  done,
  setDone,
  setActive,
  setSubActive,
}) => {

  const handleNavigateToOnBorading = () => {
    console.log('Navigated');
  };

  const handleNext = () => {
    setSubActive(1);
    console.log('Next');
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full max-w-[375px] h-screen max-h-[600px] bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${BgSecureWallet})` }}
    >
      <div className="w-[90%] flex flex-col gap-4">
        <NavigationBarTitle
          title="Add a wallet"
          callback={() => {
            setActive(0);
            setDone([]);
          }}
        />
        <Stepper steps={steps} active={active} done={done} />
        <h2 className="text-[20px] font-[500] text-white text-center">
          Secure wallet
        </h2>
        <p className="text-white text-[14px] font-[500]">
          It is advisable to secure your seed phrase because it is the
          <strong> "master key"</strong> to your wallet. Never give it out.{' '}
          <span className="text-white cursor-pointer text-[14px] font-[600]">
            Learn more
          </span>
        </p>
        <div className="text-left">
          <h3 className="text-[14px] font-[600] text-white ml-4">
            How do I save my Secret Recovery Phrase?
          </h3>
          <ul className="ml-4 text-gray-400 font-[200] list-disc">
            <li style={{ marginLeft: '14px', lineHeight: '20px',color:"white" }}>
              Write down and store in multiple secret places
            </li>
            <li style={{ marginLeft: '14px', lineHeight: '20px',color:"white" }}>
              Store in a safe deposit box
            </li>
          </ul>
        </div>
        <div
          className="bg-[#2A2E4F] rounded-xl h-[89px] w-full"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px',
          }}
        >
          <p
            className="text-[14px] text-white font-[600] text-start"
            style={{ lineHeight: '22px' }}
          >
            If someone asks for your recovery phrase, they are likely trying to
            scam you and steal your funds
          </p>
        </div>
        <SecondaryButton
          onClick={handleNavigateToOnBorading}
          title={'Remind me later (not recommended)'}
        />
        <PrimaryButton
          onClick={handleNext}
          title={'Secure my wallet (recommended)'}
        />
      </div>
    </div>
  );
};

export default SecureWalletMain;
