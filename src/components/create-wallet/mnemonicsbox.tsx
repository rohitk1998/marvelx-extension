import React, { useState } from 'react';
import { EyeFilled, CopySmall, EyeSlash } from '../../assets';
import { useAppContext } from '../../context/useappcontext';

interface MnemonicsBoxProps {
  isBlur: boolean;
  setBlur?: Function;
}

const MnemonicsBox: React.FC<MnemonicsBoxProps> = ({ isBlur, setBlur }) => {
  const { secretphrase, mnemonicsArr } = useAppContext();


  const [copytext, setCopyText] = useState('Copy To Clipboard');

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(secretphrase);
    setCopyText('Copied!');
    setTimeout(() => {
      setCopyText('Copy To Clipboard');
    }, 5000);
  };
  
  return (
    <div
      className={`relative flex flex-col items-center justify-center w-[90%] h-[351px] max-w-md ${
        isBlur ? 'bg-white/5 backdrop-blur-md' : ''
      } rounded-xl`}
      style={{ marginInline: 'auto' }}
    >
      {isBlur && (
        <div className="flex flex-col items-center justify-center">
          <img src={EyeFilled} alt="" className="" />
          <p className="mt-4 text-sm text-white">Make sure nobody is looking</p>
        </div>
      )}
      {!isBlur && (
        <div>
          <div
            className="border-[rgba(255,255,255,0.6)] justify-between rounded-[10px] border p-4 space-y-4  flex flex-wrap gap-y-4 gap-x-1"
            style={{ padding: '30px 29px', margin: '0px 0 0px 0' }}
          >
            {mnemonicsArr.map((item, index) => (
              <div key={item} className="flex items-center gap-2 gap-x-2">
                <label className="text-white w-[21px] text-center">
                  {index + 1}.
                </label>
                <input
                  className="p-2 border rounded-[3px] w-[85px] h-[23px] text-center text-[#fff] outline-[0] text-[12px]"
                  placeholder={item}
                />
              </div>
            ))}

            <div
              className="flex items-center justify-between mt-4 text-white"
              style={{ marginTop: '30px' }}
            >
              <button
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => (setBlur ? setBlur(!isBlur) : () => {})}
              >
                <img src={EyeSlash} alt="" className="" />
                <span>Hide seek phrase</span>
              </button>
              <button
                className="flex items-center gap-2 cursor-pointer"
                style={{marginLeft:'10px'}}
                onClick={() => {
                  copyToClipBoard();
                }}
              >
                <img src={CopySmall} alt="" className="" />
                <span>{copytext}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MnemonicsBox;
