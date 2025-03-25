import { useEffect, useState } from 'react';
import TwoFaQrCode from './qrcodescan';
import Verify2FA from './verify2fa';
import AuthenticatorSuccessScreen from './auth2fasuccess';
import useUserProfile from '../../hooks/useprofile';
import { generate2FA } from '../../helpers/common/api.helper';

interface StepType {
  id: number;
  value: number;
  Component: React.FC<{
    active: number;
    setActive: Function;
    success: boolean;
    setSuccess: Function;
    error: string;
    setError: Function;
    setSelectedMenu: Function;
    qrCode:any;
    address:string;
  }>;
}

interface Auth2FAProps {
  setSelectedMenu: Function;
}

const Auth2FAComponents: StepType[] = [
  {
    id: 0,
    value: 1,
    Component: TwoFaQrCode,
  },
  {
    id: 1,
    value: 2,
    Component: Verify2FA,
  },
  {
    id: 2,
    value: 3,
    Component: AuthenticatorSuccessScreen,
  },
];

const Auth2FA: React.FC<Auth2FAProps> = ({ setSelectedMenu }) => {
  const { setWalletAddress, user } = useUserProfile();

  const [steps] = useState<StepType[]>(Auth2FAComponents);
  const [active, setActive] = useState(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [profile, setProfile]: any = useState(null);
  const [qrCode, setQrCode]: any = useState(null);
  const [walletaddress,setAddress]=useState('');

  useEffect(() => {
    setActive(0);
    setSuccess(false);
    setError('');
    setAddress('')
    fetch2FaData();
    if (user) {
      setProfile(user);
    }
    return () => {
      setActive(0);
      setSuccess(false);
      setError('');
    };
  }, [user]);

  const fetch2FaData = async () => {
    let password: any = localStorage.getItem('password');
    let accounts: any = localStorage.getItem(password);
    if (!accounts) return;
    let defaults: any = JSON.parse(accounts);
    const firstAccountKey = Object.keys(defaults)[0];
    const defaultAccount = defaults[firstAccountKey];
    setWalletAddress(defaultAccount?.publicKey);
    setAddress(defaultAccount?.publicKey);
    const result = await generate2FA();
    console.log('result',result);
    setQrCode(result);
  };

  console.log('USER :',profile);

  console.log('QR CODE :',qrCode , active)

  return (
    <div>
      {steps.map((step) => {
        const { Component, id } = step;
        return (
          <>
            {active === id && (
              <Component
                active={active}
                setActive={setActive}
                success={success}
                setSuccess={setSuccess}
                error={error}
                setError={setError}
                setSelectedMenu={setSelectedMenu}
                qrCode={qrCode}
                address={walletaddress}
              />
            )}
          </>
        );
      })}
    </div>
  );
};

export default Auth2FA;
