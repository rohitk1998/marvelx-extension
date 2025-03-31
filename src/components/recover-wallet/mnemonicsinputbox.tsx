import React from 'react';

interface MnemonicsInputBoxProps {
  mnemonics: string;
  setMnemonics: Function;
}

const MnemonicsInputBox: React.FC<MnemonicsInputBoxProps> = ({
  mnemonics,
  setMnemonics,
}) => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  function seedAdjust() {
    const inp = document.querySelectorAll('.input-mnemonic');
    let str = '';
    inp.forEach((item: any) => {
      str += item.value.trim();
      str += ' ';
    });
    str = str.trim();
    let strArr = str.split(' ');
    inp.forEach((item: any, idx) => {
      if (idx < strArr.length) item.value = strArr[idx];
      else item.value = '';
    });
    setMnemonics(str);
  }
  console.log(mnemonics);

  return (
    <div className="border border-[rgba(255,255,255,0.6)] rounded-[10px] flex flex-wrap gap-y-4 gap-x-5 w-[310px] h-[286px] mx-auto mt-1.5 p-[30px_29px]">
      {arr?.map((item, index) => (
        <div key={item} className="flex items-center gap-1">
          <label className="text-white w-[21px] text-center">
            {index + 1}.
          </label>
          <input
            className="p-2 border rounded-[3px] w-[85px] h-[23px] text-center text-white outline-none text-[12px] input-mnemonic"
            onChange={seedAdjust}
          />
        </div>
      ))}
    </div>
  );
};

export default MnemonicsInputBox;
