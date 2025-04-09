import { useEffect } from 'react';
import BalanceBoard from './balanceboard';
import ActionsMenu from './actions';
import useTokenBalance from '../../hooks/usetokensandbalances';
import Assets from './assets';
import DashboardLayout from '../dashboardLayout/index';

const WalletBoard: React.FC = () => {
  const { usdbal, setAddress, tokens, loading } = useTokenBalance();

  useEffect(() => {
    console.log('wallet dashboard render');
    setWalletInLocal();
  }, []);

  const setWalletInLocal = async () => {
    let password: any = localStorage.getItem('password');
    let accounts: any = localStorage.getItem(password);
    if (!accounts) return;
    let defaults: any = JSON.parse(accounts);
    const firstAccountKey = Object.keys(defaults)[0];
    const defaultAccount = defaults[firstAccountKey];
    setAddress(defaultAccount?.publicKey);
  };

  return (
    <DashboardLayout showSearchCoin={true} showFooter={true} title="">
      <BalanceBoard usdBalance={usdbal} />
      <ActionsMenu />
      <Assets tokens={tokens} loading={loading} />
    </DashboardLayout>
  );
};

export default WalletBoard;
