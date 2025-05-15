import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import DashboardLayout from '../dashboardLayout/index';
import { copysmallNew } from '../../assets';
import { getKeyFromPrivateKeyArray } from '../../helpers/solana/wallet.helper';
import { getPrivateKeyLocalStorage } from '../../helpers/common/localstorage';

const PrivateKeyDisplay: React.FC = () => {
  const [key, setKey] = useState('');
  const [copytext, setCopyText] = useState('Copy');

  const navigate = useNavigate();
  const location = useLocation();

  const setWalletInLocal = async () => {
    let keyArr = getPrivateKeyLocalStorage();
    const privateKey: any = getKeyFromPrivateKeyArray(keyArr);
    setKey(privateKey);
  };

  useEffect(() => {
    setWalletInLocal();
  }, []);

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(key);
    setCopyText('Copied');
    setTimeout(() => {
      setCopyText('Copy');
    }, 5000);
  };

  return (
    <DashboardLayout
      title="Secret Private Key"
      backCallback={() =>
        navigate(ROUTES.EDIT_ACCOUNT, { state: location?.state })
      }
      navigationBarTitleClass="w-full text-[16px] font-semibold text-center text-white"
      graybuttonWithoutBorder={true}
      graywithoutBorderCallback={() =>
        navigate(ROUTES.EDIT_ACCOUNT, { state: location?.state })
      }
      grayWithoutBorderTitle="Done"
      graybuttonWithoutBorderClass="w-[326px] h-[54px] mx-auto mb-[18px]"
    >
      <div className="text-red-300 border border-[#F66868] rounded-xl w-[320px] h-[84px] mx-auto mt-[30px] items-center justify-center flex flex-col p-10">
        <h6 className="text-[16px] font-[500] text-[#F66868] text-center">
          Do not share your private Key!
        </h6>
        <p className="text-[11px] font-[400] text-[#F66868] text-center">
          They will have full access and control to your account
        </p>
      </div>
      <div className="bg-[#4B50661A] rounded-[10px] border-[0.5px] border-[#222326] w-[321px] h-[160px] flex flex-col items-center justify-center mx-auto mt-[65px] p-1">
        <div style={{ padding: '16px 16px' }} className="w-[100%] text-center">
          <p className="text-white text-[15px] font-[500] w-full break-words">
            {key}
          </p>
        </div>
        <div className="w-[100%] text-[#3A3C48] border mb-1"></div>
        <div
          className="w-[30%] flex justify-center text-white gap-2 mt-1 cursor-pointer"
          onClick={() => copyToClipBoard()}
        >
          <p>{copytext}</p>
          <div className="w-[24px] h-[24px] rounded-[6px] bg-[#3A3C48] p-1">
            <img src={copysmallNew} alt="" />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PrivateKeyDisplay;
