import React from 'react';

interface MnemonicsInputBoxProps {
  mnemonics: string;
  setMnemonics:Function;
}

const MnemonicsInputBox: React.FC<MnemonicsInputBoxProps> = ({
  mnemonics,
  setMnemonics
}) => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  function seedAdjust() {
    const inp = document.querySelectorAll(".input-mnemonic");
    let str = "";
    inp.forEach((item:any )=> {
      str += item.value.trim();
      str += " "
    })
    str = str.trim()
    let strArr = str.split(" ")
    inp.forEach((item:any, idx) => {
      if (idx < strArr.length)
        item.value = strArr[idx];
      else
        item.value = ""
    })
    setMnemonics(str);
  }
  console.log(mnemonics);

  return (
    <div
      className={`relative flex flex-col items-center justify-center w-[90%] h-[286px] max-w-md rounded-xl`}
      style={{marginInline:"auto"}}
    >
      <div
            className="border-[rgba(255,255,255,0.6)] justify-between rounded-[10px] border p-4 space-y-4  flex flex-wrap gap-y-4 gap-x-1"
            style={{ padding: '30px 29px', margin: '0px 0 0px 0' }}
          >
            {arr.map((item, index) => (
              <div key={item} className="flex items-center gap-2 gap-x-2">
                <label className="text-white w-[21px] text-center">
                  {index + 1}.
                </label>
                <input
                  className="p-2 border rounded-[3px] w-[85px] h-[23px] text-center text-[#fff] outline-[0] text-[12px] input-mnemonic"
                  onChange={seedAdjust}
                />
              </div>
            ))}                    

        </div>
    </div>
  );
};

export default MnemonicsInputBox;
