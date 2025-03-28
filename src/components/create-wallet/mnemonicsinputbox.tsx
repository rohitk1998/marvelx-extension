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
    <div className="p-[9px]">
      <div
        className={`relative flex flex-col items-center justify-center h-[351px] max-w-md  rounded-xl bg-cover overflow-hidden`}
        style={{
          marginInline: 'auto',
        }}
      >
        <div>
          <div className="border-[rgba(255,255,255,0.6)] justify-evenly rounded-[10px] border flex flex-wrap pt-[23px] pb-[19px]">
            {arr.map((item, index) => (
              <div key={item} className="flex items-center pb-[18px]">
                <label className="text-white w-[21px] text-center text-[14px] font-[500]">
                  {index + 1}.
                </label>
                <input
                  className="p-0 border-[rgba(255,255,255,0.6)] border-1 rounded-[3px] w-[85px] h-[21px] text-center text-white outline-[0] text-[14px] font-[500] input-mnemonic"
                  onChange={seedAdjust}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MnemonicsInputBox;
