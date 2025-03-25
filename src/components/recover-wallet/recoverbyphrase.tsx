import React, { useState } from 'react';
import RecoverWalletCreatePassword from './createpassword';
import RecoverWalletComfirmPhrase from './cofirmphrase';

interface StepType {
  id: number;
  value: number;
  Component: React.FC<{
    active: number;
    setActive: Function;
  }>;
}

const recoverWalletSteps: StepType[] = [
  {
    id: 0,
    value: 1,
    Component: RecoverWalletCreatePassword,
  },
  {
    id: 1,
    value: 2,
    Component: RecoverWalletComfirmPhrase,
  }
];

const RecoveWalletByPhrase: React.FC = () => {
  const [steps] = useState<StepType[]>(recoverWalletSteps);
  const [active, setActive] = useState(0);

  return (
    <div>
      {steps.map((step) => {
        const { Component, id } = step;
        return (
          <>
            {active === id && (
              <Component
                active={active}
                setActive={setActive}
              />
            )}
          </>
        );
      })}
    </div>
  );
};

export default RecoveWalletByPhrase;
