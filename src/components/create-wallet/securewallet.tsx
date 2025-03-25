import React, { useState } from 'react';
import SecureWalletMain from './securewalletmain';
import RevealRecoveryPhrase from './revealrecoveryphrase';
import RevealedRecoveryPhrase from './revealedrecoveryphrase';


const secureWalletSubSteps: SubStepType[] = [
  {
    id: 0,
    value: 1,
    Component: SecureWalletMain,
  },
  {
    id: 1,
    value: 2,
    Component: RevealRecoveryPhrase,
  },
  {
    id: 2,
    value: 3,
    Component: RevealedRecoveryPhrase,
  },
];

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

interface SubStepType {
  id: number;
  value: number;
  Component: React.FC<{
    steps: StepType[];
    active: number;
    done: number[];
    setDone: Function;
    setActive: Function;
    setSubActive:Function;
  }>;
}

interface SecureWalletProps {
  steps: StepType[];
  active: number;
  done: Array<number>;
  setDone: Function;
  setActive: Function;
}

const SecureWallet: React.FC<SecureWalletProps> = ({
  steps,
  active,
  done,
  setDone,
  setActive,
}) => {
  

  const [substeps] = useState<SubStepType[]>(secureWalletSubSteps);
  const [subactive,setSubActive]=useState(secureWalletSubSteps[0].id);

  return (
    <div>
    {substeps.map((substep : any) => {
      const { Component, id } = substep;
      return (
        <>
          {subactive === id && (
            <Component
            steps={steps}
            active={active}
            done={done}
            setActive={setActive}
            setDone={setDone}
            setSubActive={setSubActive}
            />
          )}
        </>
      );
    })}
  </div>
  );
};

export default SecureWallet;
