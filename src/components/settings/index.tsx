import DashboardLayout from '../dashboardLayout/index';
import arrowright from '../../assets/icons/arrow-right.svg';
import { SearchIcon } from '../../assets/SvgIcon';
import {
  EmptyWallet,
  LockIcon,
  ActiveNextwork,
  PreferenceIcon,
  ExportIcon,
  AboutMarve,
  ExpFeature,
  HelpSupport,
  DeveloperSetting,
  Connectedapp,
  AddressBook,
} from '../../assets/index';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';

const Settings = () => {
  const navigate = useNavigate();
  const data = [
    {
      label: 'Manage account',
      icon: EmptyWallet,
      nextarrow: arrowright,
    },
    {
      label: 'Preferences',
      icon: PreferenceIcon,
      nextarrow: arrowright,
    },
    {
      label: 'Security and Privacy',
      icon: LockIcon,
      nextarrow: arrowright,
    },
    {
      label: 'Active networks',
      icon: ActiveNextwork,
      nextarrow: arrowright,
    },
  ];

  const data2 = [
    {
      label: 'Address book',
      icon: AddressBook,
      nextarrow: arrowright,
    },
    {
      label: 'Connected apps',
      icon: Connectedapp,
      nextarrow: arrowright,
    },
  ];

  const data3 = [
    {
      label: 'Developer settings',
      icon: DeveloperSetting,
      nextarrow: arrowright,
    },
    {
      label: 'Experimental features',
      icon: ExpFeature,
      nextarrow: arrowright,
    },
  ];
  const data4 = [
    {
      label: 'Help and support',
      icon: HelpSupport,
      nextarrow: arrowright,
    },
    {
      label: 'About MarvelX',
      icon: AboutMarve,
      nextarrow: ExportIcon,
    },
  ];
  return (
    <DashboardLayout
      title="Settings"
      graybutton={true}
      btntitle="Lock Wallet"
      backCallback={() => navigate('/')}
      navigationBarTitleClass="w-full text-[16px] font-[600] text-center text-white"
    >
      <div className="flex items-center justify-center pb-[12px] pl-[17px] pr-[17px]">
        <div className="relative w-full max-w-md  mt-[20px]">
          {/* Search Icon */}
          <div className="absolute inset-y-0 left-[15px] flex items-center pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-lg text-[#fff] border border-[#383B3277] bg-[#4B506633] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            style={{ padding: '10px 20px 10px 45px' }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-[12px] pr-[17px] pb-[17px] pl-[17px]">
        <div className="flex flex-col bg-[#4B506633] rounded-[10px] border border-[#3739417D]">
          {data.map((item, index) => (
            <button
              key={index}
              className="flex justify-between w-full border-b border-[#3A3C48] last:border-b-0 items-center text-[16px] font-medium cursor-pointer p-[10px_20px] "
              style={{ padding: '14px 16px' }}
              onClick={()=> {
                 if(item.label === 'Security and Privacy'){
                  navigate(ROUTES.SECURITYANDPRIVACY)
                 }
              }}
            >
              <span className="text-[16px] text-[#fff] font-medium flex gap-[7px] items-center">
                {item.icon && (
                  <img
                    src={item.icon}
                    alt="icon"
                    className="w-[24px] h-[24px]"
                  />
                )}
                {item.label}
              </span>
              {item.nextarrow && (
                <img
                  src={item.nextarrow}
                  alt="arrow"
                  className="w-[22px] h-[22px]"
                />
              )}
            </button>
          ))}
        </div>

        {/* Second Data List */}
        <div className="flex flex-col bg-[#4B506633] rounded-[10px] border border-[#3739417D]">
          {data2.map((item, index) => (
            <p
              key={index}
              className="flex justify-between w-full border-b border-[#3A3C48] last:border-b-0 items-center text-[16px] font-medium cursor-pointer p-[10px_20px] "
              style={{ padding: '14px 16px' }}
            >
              <span className="text-[16px] text-[#fff] font-medium flex gap-[7px] items-center">
                {item.icon && (
                  <img
                    src={item.icon}
                    alt="icon"
                    className="w-[24px] h-[24px]"
                  />
                )}
                {item.label}
              </span>
              {item.nextarrow && (
                <img
                  src={item.nextarrow}
                  alt="arrow"
                  className="w-[22px] h-[22px]"
                />
              )}
            </p>
          ))}
        </div>
        <div className="flex flex-col bg-[#4B506633] rounded-[10px] border border-[#3739417D]">
          {data3.map((item, index) => (
            <button
              key={index}
              className="flex justify-between w-full border-b border-[#3A3C48] last:border-b-0 items-center text-[16px] font-medium cursor-pointer p-[10px_20px] "
              style={{ padding: '14px 16px' }}
              onClick={()=> {
                if(item.label === 'Developer settings'){
                 navigate('/developer-settings')
                }
             }}
            >
              <span className="text-[16px] text-[#fff] font-medium flex gap-[7px] items-center">
                {item.icon && (
                  <img
                    src={item.icon}
                    alt="icon"
                    className="w-[24px] h-[24px]"
                  />
                )}
                {item.label}
              </span>
              {item.nextarrow && (
                <img
                  src={item.nextarrow}
                  alt="arrow"
                  className="w-[22px] h-[22px]"
                />
              )}
            </button>
          ))}
        </div>
        <div className="flex flex-col bg-[#4B506633] rounded-[10px] border border-[#3739417D]">
          {data4.map((item, index) => (
            <p
              key={index}
              className="flex justify-between w-full border-b border-[#3A3C48] last:border-b-0 items-center text-[16px] font-medium cursor-pointer p-[10px_20px] "
              style={{ padding: '14px 16px' }}
            >
              <span className="text-[16px] text-[#fff] font-medium flex gap-[7px] items-center">
                {item.icon && (
                  <img
                    src={item.icon}
                    alt="icon"
                    className="w-[24px] h-[24px]"
                  />
                )}
                {item.label}
              </span>
              {item.nextarrow && (
                <img
                  src={item.nextarrow}
                  alt="arrow"
                  className="w-[22px] h-[22px]"
                />
              )}
            </p>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
