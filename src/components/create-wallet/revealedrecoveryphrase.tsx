import { useState } from 'react';
import { BgRecoveryPhrase } from '../../assets';
import { PrimaryButton, NavigationBarTitle } from '../index';
import MnemonicsBox from './mnemonicsbox';
import Stepper from './stepper';

interface StepType {
  id: number;
  value: number;
  Component: React.FC<{
    steps: StepType[];
    active: number;
    done: number[];
    setDone: Function;
    setActive: Function;
  }>;
}

interface RevealedRecoveryPhrase {
  steps: StepType[];
  active: number;
  done: Array<number>;
  setDone: Function;
  setActive: Function;
  setSubActive: Function;
}

const RevealedRecoveryPhrase: React.FC<RevealedRecoveryPhrase> = ({
  steps,
  active,
  done,
  setDone,
  setActive,
  setSubActive,
}) => {
  console.log(steps, active, done, setDone, setActive, setSubActive);
  const [isBlur, setBlur] = useState(true);

  return (
    <div
      className="relative flex flex-col items-center w-full max-w-[375px] overflow-auto bg-no-repeat bg-cover bg-center rounded-[20px] pt-[26px] pr-[18px] pb-[19px] pl-[20px]"
      style={{ backgroundImage: `url(${BgRecoveryPhrase})` }}
    >
      <NavigationBarTitle
        title="Add a wallet"
        callback={() => {
          setSubActive(0);
        }}
      />
      <div className="w-full overflow-auto pt-[32px]">
        <Stepper steps={steps} active={active} done={done} />
        <div className="text-center">
          <h2 className="text-[20px] font-medium text-white letter-space-2">
            Write down your Secret <br /> Recovery Phrase
          </h2>
          <p
            className="text-[14px] text-start text-white"
            style={{ marginTop: '10px' }}
          >
            Write down the 12-word Secret Recovery Phrase and save it in a place
            you trust and only you can access.
          </p>
        </div>
        <div className="w-full max-w-md text-left">
          <h3 className="mb-2 pt-[12px] text-[14px] font-semibold text-white">
            Tips:
          </h3>
          <ul className="text-[12px] text-white font-[400] list-disc list-inside">
            <li style={{ marginLeft: '10px', lineHeight: '20px' }}>
              Write down and store in multiple secret places
            </li>
            <li style={{ marginLeft: '10px', lineHeight: '20px' }}>
              Store in a safe deposit box
            </li>
          </ul>
        </div>
        <div className="pb-[10px]">
          <MnemonicsBox isBlur={isBlur} setBlur={setBlur} />
        </div>

        <PrimaryButton
          onClick={() => {
            if (isBlur) {
              setBlur(false);
            } else {
              setActive(2);
              setDone((prev: number[]) => [...prev, 1]);
            }
          }}
          title={isBlur ? 'Reveal Secret Recovery Phrase' : 'Proceed'}
        />
      </div>
    </div>
  );
};

export default RevealedRecoveryPhrase;
