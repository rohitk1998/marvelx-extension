import React, { useEffect, useState } from 'react';
import { ValidationError } from '../common/errortext';

type MnemonicsInputBoxProps = {
  mnemonic: string[];
    setMnemonics: Function;
    error:string;
};

const MnemonicsInputBox: React.FC<MnemonicsInputBoxProps> = ({
  mnemonic,
  setMnemonics,
  error
}) => {
  console.log('secretphrase:', mnemonic);

  if (mnemonic?.length !== 12) {
    throw new Error('Mnemonic must be exactly 12 words long');
  }

  const emptyIndexes = [4,7,10];
  const [inputs, setInputs] = useState<{ [key: number]: string }>({});

  const handleChange = (index: number, value: string) => {
    setInputs((prev) => ({ ...prev, [index]: value }));
    console.log('secretphrase: Object.keys(inputs)?.length :',Object.keys(inputs)?.length)
  };

  useEffect(() => {
    console.log("secretphrase: Object.keys(inputs)?.length:", Object.keys(inputs)?.length);
  
    if (Object.keys(inputs).length === 3) {
      const userMnemonic = mnemonic.map((word, index) =>
        emptyIndexes.includes(index) ? inputs[index] || "" : word
      );
      setMnemonics(userMnemonic);
    }
  }, [inputs]); 

  return (
    <div className="p-[9px]">
      <div
        className={`relative flex flex-col items-center justify-center h-[351px] max-w-md  rounded-xl bg-cover overflow-hidden`}
        style={{
          marginInline: 'auto',
        }}
      >
        <div className="border-[rgba(255,255,255,0.6)] justify-evenly rounded-[10px] border flex flex-wrap pt-[23px] pb-[19px]">
          {mnemonic?.map((word, index) => (
            <div key={word} className="flex items-center pb-[18px]">
              <label className="text-white w-[21px] text-center text-[14px] font-[500]">
                {index + 1}.
              </label>
              <input
                key={word}
                type="text"
                className={`p-0 border-${
                  [4, 7, 10].includes(index)
                    ? '[#1142C7]'
                    : '[rgba(255,255,255,0.6)]'
                } border-1 rounded-[3px] w-[85px] h-[21px] text-center text-white outline-[0] text-[14px] font-[500] input-mnemonic`}
                value={
                  emptyIndexes?.includes(index) ? inputs[index] || '' : word
                }
                onChange={(e) => handleChange(index, e.target.value)}
                disabled={!emptyIndexes?.includes(index)}
                placeholder={
                  emptyIndexes?.includes(index) ? `` : ''
                }
              />
            </div>
          ))}
        </div>
        <div className='mt-[8px] items-start justify-start flex w-[100%] h-[15px]'>
        <ValidationError error={error} />
        </div>
      </div>
    </div>
  );
};

export default MnemonicsInputBox;
