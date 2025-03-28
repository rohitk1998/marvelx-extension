import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import DashboardLayout from '../dashboardLayout/index';
import { copysmallNew } from '../../assets';

const RecoveryPhraseDisplay: React.FC = () => {
  const [arr, setArr] = useState([]);
  const [copytext, setCopyText] = useState('Copy to clipboard');

  const navigate = useNavigate();

  useEffect(() => {
    const phrase: any = localStorage.getItem('secretphrase');
    if (phrase) {
      setArr(phrase.split(' '));
    }
  }, []);

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(arr.join(''));
    setCopyText('Copied');
    setTimeout(() => {
      setCopyText('Copy to clipboard');
    }, 5000);
  };

  return (
    <DashboardLayout
      title="Your Recovery Phrase"
      backCallback={() => navigate(ROUTES.EDIT_ACCOUNT)}
      navigationBarTitleClass="w-full text-[16px] font-semibold text-center text-white"
      graybuttonWithoutBorder={true}
      graywithoutBorderCallback={() => navigate(ROUTES.EDIT_ACCOUNT)}
      grayWithoutBorderTitle="Done"
      graybuttonWithoutBorderClass="w-[326px] h-[54px] mx-auto mb-[18px]"
    >
      <div className="text-red-300 bg-red-900 bg-opacity-50 rounded-xl w-[324px] h-[84px] mx-auto px-4 py-3 mb-4 mt-10">
        <p className="text-[14px] font-medium">
          Do not share your Recovery Phrase. Anyone with your recovery phrase
          can have access to your account.
        </p>
      </div>
      <div className="border border-[rgba(255,255,255,0.6)] rounded-[10px] flex flex-wrap gap-y-4 gap-x-5 w-[310px] h-[314px] mx-auto mt-1.5 p-[30px_29px]">
        {arr.map((item, index) => (
          <div key={item} className="flex items-center gap-1">
            <label className="text-white w-[21px] text-center">
              {index + 1}.
            </label>
            <input
              className="p-2 border rounded-[3px] w-[85px] h-[23px] text-center text-white outline-none text-[12px]"
              placeholder={item}
            />
          </div>
        ))}
        <div className="w-[70%] mx-auto flex justify-center text-white gap-2 mt-1 cursor-pointer" onClick={() => copyToClipBoard()}>
          <button
            className="w-[24px] h-[24px] rounded-[6px] bg-[#3A3C48] p-1"
          >
            <img src={copysmallNew} alt="" />
          </button>
          <p>{copytext}</p>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default RecoveryPhraseDisplay;
