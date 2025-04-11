import React, { useEffect, useState } from 'react';
import CustomDropdown from '../common/CustomDropdown';
import DashFooter from '../dashFooter/index';
import firsttimeprofile from '../../assets/icons/firsttimepro.svg';
import { NavigationBarTitle, PrimaryButton, SecondaryButton } from '../index';
import firsttimeprofiles from '../../assets/icons/firsttimeprofile.svg';
import settings from '../../assets/icons/setting.svg';
import addwallet from '../../assets/icons/add-square.svg';
import { SearchIcon } from '../../assets/SvgIcon';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { GrayButton } from '../common/graybutton';
import useUserProfile from '../../hooks/useprofile';
import { BgSecureWallet } from '../../assets';

interface DashLayoutProps {
  children: React.ReactNode;
  title: string;
  showSearchCoin?: boolean;
  showFooter?: boolean;
  showButton?: boolean;
  btntitle?: string;
  showDoubleBtn?: boolean;
  transbtn?: string;
  onClick?: () => void;
  backCallback?: Function;
  graybutton?: boolean;
  navigationBarTitleClass?: string;
  graybuttonWithoutBorder?:boolean;
  graywithoutBorderCallback?:Function;
  grayWithoutBorderTitle?:string;
  graybuttonWithoutBorderClass?:string;
  isPrimaryDisabled?:boolean;
}

const DashLayout = ({
  children,
  title,
  showSearchCoin = false,
  showFooter = false,
  showButton = false,
  showDoubleBtn = false,
  graybutton = false,
  onClick = () => {},
  transbtn = '',
  btntitle = '',
  backCallback,
  navigationBarTitleClass,
  graybuttonWithoutBorder = false,
  graywithoutBorderCallback,
  grayWithoutBorderTitle,
  graybuttonWithoutBorderClass,
  isPrimaryDisabled = false
}: DashLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setWalletAddress }: any = useUserProfile();
  const [profile, setProfile]: any = useState(null);
  const [defaultAccount, setDefaultAccount] = useState('Account 1');

  useEffect(() => {
    if (location.pathname === '/wallet-board') {
      setWalletInLocal();
    }
    if (user !== null) {
      setProfile(user);
    }
  }, [user]);

  const setWalletInLocal = async () => {
    let password: any = localStorage.getItem('password');
    let accounts: any = localStorage.getItem(password);
    if (!accounts) return;
    let defaults: any = JSON.parse(accounts);
    const firstAccountKey = Object.keys(defaults)[0];
    console.log('firstAccountKey', firstAccountKey);
    setDefaultAccount(firstAccountKey);
    const defaultAccount = defaults[firstAccountKey];
    setWalletAddress(defaultAccount?.publicKey);
  };

  const dropdownItems = [
    {
      label: profile?.username,
      icon: <img src={firsttimeprofiles} alt="imgs" />,
      onClick: () => navigate(ROUTES.EDIT_ACCOUNT),
    },
    {
      label: 'Settings',
      icon: <img src={settings} alt="imgs" />,
      onClick: () => navigate('/settings'),
    },
    {
      label: 'Add / Connect wallet',
      icon: <img src={addwallet} alt="imgs" />,
      onClick: () => console.log('Wallet clicked'),
    },
  ];

  return (
    <div className="flex justify-center w-full m-auto h-screen min-h-[600px] max-w-[360px]">
      <div
        className="flex flex-col max-h-[600px] h-screen w-full bg-no-repeat bg-cover mx-auto"
        style={{
          backgroundImage: `url(${BgSecureWallet})`,
          backgroundSize: '100% 100%',
        }}
      >
        {showSearchCoin && (
          <div className="flex gap-[10px] justify-between pt-[23px] pr-[15px] pb-[20px] pl-[15px]">
            <div className="flex gap-[7px] max-w-[300px] w-full">
              <img src={firsttimeprofile} alt="imgs" />
              <p className="text-[10px] font-normal text-[#A5A5A5] flex flex-col">
                @{profile?.username}
                <div className="flex items-center justify-center">
                  <CustomDropdown
                    label={defaultAccount}
                    items={dropdownItems}
                  />
                </div>
              </p>
            </div>
            <SearchIcon />
          </div>
        )}

        {!showSearchCoin && (
          <div className="pt-[23px] pr-[17px} pl-[17px]">
            <NavigationBarTitle
              title={title}
              callback={backCallback}
              titleClass={navigationBarTitleClass}
            />
          </div>
        )}
        <div className="flex-1 mx-auto overflow-auto w-[100%]">{children}</div>
        {showFooter && <DashFooter />}
        {showButton && (
          <div style={{ padding: '10px 15px 8px' }}>
            <PrimaryButton title={btntitle} onClick={onClick} isDisabled={isPrimaryDisabled} />
          </div>
        )}

        {graybutton && (
          <div
            style={{ padding: '15px 15px 5px' }}
            onClick={onClick}
            className="border-t border-[#3A3C48]"
          >
            <GrayButton title={btntitle} />
          </div>
        )}

        {graybuttonWithoutBorder && (
          <div
          className={graybuttonWithoutBorderClass ?? ''}
            onClick={()=> graywithoutBorderCallback ? graywithoutBorderCallback() : null }
          >
            <GrayButton title={grayWithoutBorderTitle ?? ''} />
          </div>
        )}

        {showDoubleBtn && (
          <div className="flex gap-[16px]" style={{ padding: '10px 14px 5px' }}>
            <SecondaryButton title={transbtn} />
            <PrimaryButton title={btntitle} onClick={onClick} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashLayout;
