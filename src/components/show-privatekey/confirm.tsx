import React, { useState } from 'react';
import {
  EllipseRedImg,
  LockGrayIcon,
  RedEyeSlashIcon,
  RedKeyIcon,
  RedSafeIcon,
} from '../../assets';
import DashboardLayout from '../dashboardLayout/index';

interface PasswordProps {
  setActive: Function;
}

const Instructions = [
  {
    id: 0,
    img: RedKeyIcon,
    text: 'Your Private Key is like a login and password combined in one that provides access to this account',
  },
  {
    id: 1,
    img: RedEyeSlashIcon,
    text: 'Anyone with this Private Key will have full access to your funds in this account.',
  },
  {
    id: 2,
    img: RedSafeIcon,
    text: 'Do not share your Private Key with anyone, website, 3rd party or application',
  },
];

const PrivateKeyWarningScreen: React.FC<PasswordProps> = ({
  setActive,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <DashboardLayout
      title=""
      backCallback={() => setActive(0)}
      graybuttonWithoutBorder={!isChecked}
      grayWithoutBorderTitle='Continue'
      graybuttonWithoutBorderClass='w-[329px] mx-auto mb-[8px]'
      graywithoutBorderCallback={()=>{}}
      showButton={isChecked}
      onClick={()=> setActive(2)}
      btntitle="Continue"
    >
      <div
        className="w-[55px] h-[55px] rounded-full items-center justify-center flex mt-[10px] mx-auto"
        style={{ backgroundImage: `url(${EllipseRedImg})` }}
      >
        <img src={LockGrayIcon} alt="" />
      </div>

      <div className="text-center w-[317px] h-[54px] mx-auto mt-[10px]">
        <p className="text-base text-white text-[24px] font-[800]">
        Keep your Private key Secret
        </p>
      </div>

      <div className='w-[317px] mx-auto mt-[45px]'>
        {Instructions.map((item) => (
          <div className="flex flex-row items-start max-w-lg gap-[15px] mt-[25px] mx-auto w-[317px] h-[60px]">
            <img src={item.img} alt="Crypto Wallet" className="w-8 h-8 mt-0.5" />

            <div className="">
              <p className="text-[14px] font-[500] text-white">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div  className="border-t border-[#3A3C48] mt-[10px]">

      </div>
      <div
        className="flex items-start gap-1 mt-[25px] mb-6 space-x-2 text-sm mx-auto w-[317px]"
      >
        <div
          onClick={() => {
            setIsChecked(!isChecked);
          }}
          className={`${isChecked ? 'cursor-pointer w-[20px] p-2 h-[20px] bg-[#1142C7] mt-[1px] rounded-[4px]': 'w-[20px] h-[20px] bg-[#3A3C48] p-2 mt-[1px] rounded-[4px] cursor-pointer'}`}
        ></div>

        <p className="text-[12px] text-white font-[500]">
        I will not share my Private Key with anyone, website, 3rd party or application
        </p>
      </div>
    </DashboardLayout>
  );
};

export default PrivateKeyWarningScreen;
