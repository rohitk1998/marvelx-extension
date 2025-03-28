import React from 'react';
import { SplashImg, AddWalletIcon } from '../../assets';
import InfoCard from './info';
import { ADD_WALLET_FEATURES, ROUTES } from '../../constants/index';
import { NavigationBarTitle, PrimaryButton, SecondaryButton } from '../index';
import { useNavigate } from 'react-router-dom';

const AddWallet: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative flex flex-col items-center w-full max-w-[375px] bg-no-repeat bg-cover bg-center rounded-[20px] pt-[26px] pr-[18px] pb-[19px] pl-[20px]"
      style={{ backgroundImage: `url(${SplashImg})` }}
    >
      <NavigationBarTitle
        title="Add a wallet"
        callback={() => {
        }} />
      <div className="w-full overflow-auto">
        <div className='flex justify-center pt-[5px]'>  <img src={AddWalletIcon} alt="" /></div>
        {ADD_WALLET_FEATURES.map((item) => {
          return (
            <InfoCard
              key={item.id}
              img={item.img}
              heading={item.heading}
              description={item.description}
            />
          );
        })}


        <div className='pt-[12px]'>
          <PrimaryButton
            title={'Create a new wallet'}
            onClick={() => navigate(ROUTES.CREATE_WALLET)}
          />
          <SecondaryButton
            title={'I already have a wallet'}
            onClick={() => navigate(ROUTES.RECOVER_WALLET)}
          />
        </div>
      </div>
    </div>
  );
};

export default AddWallet;
