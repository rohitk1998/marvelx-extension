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
      className="relative flex flex-col items-center justify-center w-full max-w-[375px] h-screen max-h-[600px] bg-no-repeat bg-cover bg-center rounded-xl"
      style={{ backgroundImage: `url(${SplashImg})` }}
    >
      <div className="w-[90%] flex flex-col">
        <NavigationBarTitle
          title="Add a wallet"
          callback={() => {
          }}
        />
        <div className="relative flex justify-center pt-8 my-6">
          <img src={AddWalletIcon} alt="" />
        </div>
        <div className="flex-grow px-6 mt-6">
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
        </div>

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
  );
};

export default AddWallet;
