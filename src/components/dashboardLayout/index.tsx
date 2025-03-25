import React from 'react';
import bgsecure from '../../assets/Dashboard.png';
import CustomDropdown from '../common/CustomDropdown';
import DashFooter from '../dashFooter/index';
import firsttimeprofile from '../../assets/icons/firsttimepro.svg';
import { NavigationBarTitle, PrimaryButton, SecondaryButton } from '../index';
import firsttimeprofiles from '../../assets/icons/firsttimeprofile.svg';
import settings from '../../assets/icons/setting.svg';
import addwallet from '../../assets/icons/add-square.svg';
import { SearchIcon } from '../../assets/SvgIcon';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { GrayButton } from '../common/graybutton';
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
}

const DashLayout = ({
  children,
  title,
  showSearchCoin = false,
  showFooter = false,
  showButton = false,
  showDoubleBtn = false,
  graybutton=false,
  onClick = () => {},
  transbtn = '',
  btntitle = '',
  backCallback,
}: DashLayoutProps) => {
  const navigate = useNavigate();
  const dropdownItems = [
    {
      label: 'First time',
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
    <div className="flex justify-center w-full m-auto h-screen min-h-[600px] max-w-[375px]">
      <div
        className="flex flex-col max-h-[600px] h-screen w-full bg-no-repeat bg-cover mx-auto"
        style={{
          backgroundImage: `url(${bgsecure})`,
          backgroundSize: '100% 100%',
        }}
      >
        {showSearchCoin && (
          <div
            className="flex gap-[10px] justify-between"
            style={{ padding: '23px 15px 12px 15px' }}
          >
            <div className="flex gap-[7px] max-w-[300px] w-full">
              <img src={firsttimeprofile} alt="imgs" />
              <p className="text-[10px] font-normal text-[#A5A5A5] flex flex-col">
                @JamesScott
                <div className="flex items-center justify-center">
                  <CustomDropdown label="First time" items={dropdownItems} />
                </div>
              </p>
            </div>
            <SearchIcon />
          </div>
        )}

        {!showSearchCoin && (
          <div style={{ padding: '23px 15px 12px 15px' }}>
            <NavigationBarTitle title={title} callback={backCallback} />
          </div>
        )}
        <div
          className="flex-1 overflow-auto"
          style={{ padding: '10px 16px 10px' }}
        >
          {children}
        </div>
        {showFooter && <DashFooter />}
        {showButton && (
          <div style={{ padding: '10px 15px 5px' }}>
            <PrimaryButton title={btntitle} onClick={onClick} />
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
