import DashboardLayout from '../dashboardLayout/index';
import solIcon from '../../assets/icons/summaysol.svg';
import { DotFormatAddress } from '../../helpers/common/dotformataddress';
import { useEffect, useState } from 'react';
import { PrimaryButton } from '../common/primary-button';
import CommonDrawer from '../commonDrawer';
import { useNavigate } from 'react-router-dom';
import useUserProfile from '../../hooks/useprofile';
import { convertExponentialToDecimal } from '../../helpers/common/exponentialvalue';

interface TokenSummaryProps {
  active: number;
  setActive: Function;
  setToken: Function;
  token: any;
  amount: string;
  setAmount: Function;
  usdamount: string;
  setUsdAmount: Function;
  setReceiverAddress: Function;
  receiveraddress: string;
  success: boolean;
  setSuccess: Function;
  error: string;
  setError: Function;
}

const TokenSummary: React.FC<TokenSummaryProps> = ({
  token,
  usdamount,
  receiveraddress,
  amount,
  active,
  setActive,
}) => {
  const { setWalletAddress, user,loading } = useUserProfile();
  const [profile, setProfile]: any = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const navigate = useNavigate();

  const data = [
    {
      label: 'Asset',
      value: token.name,
      subText: 'text-white opacity-60 font-normal',
    },
    {
      label: 'From',
      value: DotFormatAddress(token.associatedTokenAddress),
      subText: 'text-end',
    },
    {
      label: 'To',
      value: DotFormatAddress(receiveraddress),
      subText: 'text-end',
    },
    {
      label: 'Network fee',
      value: '0.000005 SOL',
      subText: 'text-end',
    },
    {
      label: 'Max Total',
      value: `$${convertExponentialToDecimal(Number(usdamount))}`,
      subText: 'text-end',
    },
  ];

  useEffect(() => {
    if(!user){
      fetch2FaData();
    }
    if (user) {
      setProfile(user);
    }
  }, [user]);

  const fetch2FaData = async () => {
    let password: any = localStorage.getItem('password');
    let accounts: any = localStorage.getItem(password);
    if (!accounts) return;
    let defaults: any = JSON.parse(accounts);
    const firstAccountKey = Object.keys(defaults)[0];
    const defaultAccount = defaults[firstAccountKey];
    setWalletAddress(defaultAccount?.publicKey);
  };

  console.log('user in token summary', profile);

  const drawerContent = (
    <div className="flex flex-col">
      <span className={`text-[12px] text-[#CECED1] font-normal text-center`}>
        First time transaction?
      </span>
      <h3
        className="text-xl font-semibold text-center mb-4 text-[#fff]"
        style={{ padding: '6px 0 20px 0	' }}
      >
        {!profile?.google2FaStatus && profile?.transactionPin === ''
          ? `Enable 2-FA`
          : !profile?.google2FaStatus && profile?.transactionPin !== ''
          ? `Enable 2-FA`
          : profile?.google2FaStatus &&
            profile?.transactionPin === '' &&
            `Set transaction PIN`}
      </h3>
      <span className={`text-[12px] text-[#CECED1] font-normal text-center`}>
        {!profile?.google2FaStatus && profile?.transactionPin === ''
          ? `Two factor authenticator (2-FA) is required before sending funds. Set up
        2-FA now to safely continue`
          : !profile?.google2FaStatus && profile?.transactionPin !== ''
          ? `Two factor authenticator (2-FA) is required before sending funds. Set up
        2-FA now to safely continue`
          : profile?.google2FaStatus &&
            profile?.transactionPin === '' &&
            `Transaction PIN is a unique 4-digit PIN set by you make your transactions secure. It can be changed later.`}
      </span>
      <div style={{ paddingTop: '30px' }}>
        <PrimaryButton
          title={
            !profile?.google2FaStatus && profile?.transactionPin === ''
              ? 'Setup 2-FA'
              : !profile?.google2FaStatus && profile?.transactionPin !== ''
              ? 'Setup 2-FA'
              : profile?.google2FaStatus &&
                profile?.transactionPin === '' &&
                'Set Transaction PIN'
          }
          onClick={() => {
            navigate('/two-factor-verification', {
              state: {
                active,
                token,
                usdamount,
                receiveraddress,
                amount,
                toCompleteStep:
                  !profile?.google2FaStatus && profile?.transactionPin === ''
                    ? '2fa'
                    : !profile?.google2FaStatus &&
                      profile?.transactionPin !== ''
                    ? '2fa'
                    : profile?.google2FaStatus &&
                      profile?.transactionPin === '' &&
                      'transaction_pin',
                redirectPath: '/send',
              },
            });
          }}
        />
      </div>
    </div>
  );

  return (
    <DashboardLayout
      title="Summary"
      showButton={!isDrawerOpen}
      btntitle="Next"
      onClick={() => {
        console.log(profile?.google2FaStatus, profile?.transactionPin);
        if (!profile?.google2FaStatus || profile?.transactionPin === '') {
          openDrawer();
        } else {
          setActive(4);
        }
      }}
      isPrimaryDisabled={loading}
      backCallback={() => setActive(active - 1)}
      navigationBarTitleClass="w-full text-[16px] font-[600] text-center text-white"
    >
      <div
        className="flex flex-col items-center justify-center"
        style={{ padding: '52px 0 13px 0' }}
      >
        <img src={token?.logo ? token?.logo : solIcon} alt="imgs" className="w-[73px] h-[73px] rounded-full" />
        <h2
          className="text-[48px] font-extrabold text-[#fff]"
          style={{ paddingTop: '10px' }}
        >
          {convertExponentialToDecimal(Number(amount))} {token?.symbol ? token?.symbol : 'SOL'}
        </h2>
        <p className="text-[15px] font-normal text-[#fff]">
          ~${convertExponentialToDecimal(Number(usdamount))}
        </p>
      </div>
      <div className="pl-[20px] pr-[20px]">
        <div className="flex flex-col gap-[12px]">
          {data.map((item) => (
            <p
              key={item.label}
              className="flex justify-between text-[12px] text-[#fff] w-full"
            >
              <span
                className={`${item.subText} text-[12px] text-white opacity-60 font-normal`}
              >
                {item.label}
              </span>
              {item.value}
            </p>
          ))}
        </div>
      </div>

      <CommonDrawer
        content={drawerContent}
        isOpen={isDrawerOpen}
        closeDrawer={closeDrawer}
      />
    </DashboardLayout>
  );
};

export default TokenSummary;
