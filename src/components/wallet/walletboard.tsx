import { useEffect } from 'react';
import BalanceBoard from './balanceboard';
import ActionsMenu from './actions';
import useTokenBalance from '../../hooks/usetokensandbalances';
import Assets from './assets';
import DashboardLayout from "../dashboardLayout/index";

const WalletBoard: React.FC = () => {
  const { usdbal,setAddress,tokens } = useTokenBalance();

  useEffect(() => {
    setWalletInLocal();
  }, []);

  const setWalletInLocal = async () => {
    let password: any = localStorage.getItem('password');
    let accounts: any = localStorage.getItem(password);
    let defaults: any = JSON.parse(accounts);
    setAddress(defaults[0]?.publicKey);
  };

  return (
    <DashboardLayout showSearchCoin={true} showFooter={true} title="">
        <BalanceBoard usdBalance={usdbal} />
        <ActionsMenu />
        <Assets tokens={tokens} />
      </DashboardLayout>
  );

};

export default WalletBoard;