import React, { useEffect, useState } from 'react';
import { BgSecureWallet } from '../../assets';
import { NavigationBarTitle } from '../common/navigationbartitle';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';

const RecoveryPhraseDisplay: React.FC = () => {
 const [arr,setArr]=useState([]);

  const navigate = useNavigate();


  useEffect(()=> {
    const phrase:any = localStorage.getItem('secretphrase');
    if(phrase){
    setArr(phrase.split(' '));
    }
  },[])

  return (
    <div
      className="flex flex-col h-screen text-white bg-no-repeat"
      style={{
        backgroundImage: `url(${BgSecureWallet})`,
        padding: '1rem',
        height: '600px',
        width: '375px',
        maxWidth: '375px',
        margin: '0px',
      }}
    >
      <NavigationBarTitle
        title="Show Recovery Phrase"
        callback={() => navigate(ROUTES.EDIT_ACCOUNT)}
      />

      <div
        className="text-red-300 bg-red-900 bg-opacity-50 rounded-xl"
        style={{
          paddingLeft: '16px',
          paddingRight: '16px',
          paddingTop: '12px',
          paddingBottom: '12px',
          marginBottom: '16px',
          marginTop:"40px"
        }}
      >
        <p className="text-sm">
          Do not share your Recovery Phrase. Anyone with your recovery phrase
          can have access to your account.
        </p>
      </div>
      {/* <div
        className="grid grid-cols-3 gap-3 border border-white rounded-2xl"
        style={{
           padding:"20px",
           marginTop:"40px"
        }}
      >
        {arr?.map((phrase, index) => (
          <div
            key={index}
            className="flex items-center justify-center bg-gray-800 rounded-lg"
            style={{
              padding: '12px',
              margin: '0px',
            }}
          >
            <span className="text-sm">
              {index + 1}. {phrase}
            </span>
          </div>
        ))}
      </div> */}
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
                  className="p-2 border rounded-[3px] w-[85px] h-[23px] text-center text-[#fff] outline-[0] text-[12px]"
                  placeholder={item}
                />
              </div>
            ))}
          </div>
    </div>
  );
};

export default RecoveryPhraseDisplay;
