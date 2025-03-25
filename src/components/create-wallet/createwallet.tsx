import React, { useState } from 'react';
import CreatePassword from './createpassword';
import SecureWallet from './securewallet';
import ConfirmPhrase from './confirmphrase';

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

const createWalletSteps: StepType[] = [
  {
    id: 0,
    value: 1,
    Component: CreatePassword,
  },
  {
    id: 1,
    value: 2,
    Component: SecureWallet,
  },
  {
    id: 2,
    value: 3,
    Component: ConfirmPhrase,
  },
];

const CreateWallet: React.FC = () => {
  const [steps] = useState<StepType[]>(createWalletSteps);
  const [active, setActive] = useState(0);
  const [done, setDone] = useState<number[]>([]);

  return (
    <div>
      {steps.map((step) => {
        const { Component, id } = step;
        return (
          <>
            {active === id && (
              <Component
                steps={steps}
                active={active}
                done={done}
                setActive={setActive}
                setDone={setDone}
              />
            )}
          </>
        );
      })}
    </div>
  );
};

export default CreateWallet;
