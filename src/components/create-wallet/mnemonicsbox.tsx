import React, { useState } from 'react';
import { EyeFilled, CopySmall, EyeSlash, MnemonicsBoxBlur } from '../../assets';
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
    <div className="p-[9px]">
      <div
        className={`relative flex flex-col items-center justify-center h-[316px] max-w-md  rounded-xl bg-cover overflow-hidden`}
        style={{
          marginInline: 'auto',
          backgroundImage: isBlur ? `url(${MnemonicsBoxBlur})` : '',
        }}
      >
        {isBlur && (
          <div className="flex flex-col items-center justify-center">
            <button onClick={() => (setBlur ? setBlur(!isBlur) : () => {})} className='cursor-pointer'>
              <img src={EyeFilled} alt="" className="" />
            </button>
            <p className="mt-4 text-[10px] font-[400] text-white">
              Make sure nobody is looking
            </p>
          </div>
        )}
        {!isBlur && (
          <div>
            <div className="border-[rgba(255,255,255,0.6)] justify-evenly rounded-[10px] border flex flex-wrap pt-[23px] pb-[19px]">
              {mnemonicsArr?.map((item, index) => (
                <div key={item} className="flex items-center pb-[18px]">
                  <label className="text-white w-[21px] text-center text-[14px] font-[500]">
                    {index + 1}.
                  </label>
                  <input
                    className="p-0 border-[rgba(255,255,255,0.6)] border-1 rounded-[3px] w-[85px] h-[21px] text-center text-white outline-[0] text-[14px] font-[500]"
                    value={item}
                  />
                </div>
              ))}

              <div
                className="flex items-center justify-between mt-4 text-white"
                style={{ marginTop: '15px' }}
              >
                <button
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => (setBlur ? setBlur(!isBlur) : () => {})}
                >
                  <img src={EyeSlash} alt="" className="" />
                  <span className="text-[14px] font-[500]">
                    Hide seek phrase
                  </span>
                </button>
                <button
                  className="flex items-center gap-2 cursor-pointer"
                  style={{ marginLeft: '10px' }}
                  onClick={() => {
                    copyToClipBoard();
                  }}
                >
                  <img src={CopySmall} alt="" className="" />
                  <span className="text-[14px] font-[500]">{copytext}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MnemonicsBox;
