import React, { useState } from 'react';
import RecoverWalletCreatePassword from './createpassword';
import ConfirmPrivateKey from './confirmprivatekey';

interface StepType {
  id: number;
  value: number;
  Component: React.FC<{
    active: number;
    setActive: Function;
    byPrivateKey:boolean;
  }>;
}

const recoverByPhraseSteps: StepType[] = [
  {
    id: 0,
    value: 1,
    Component: RecoverWalletCreatePassword,
  },
  {
    id: 1,
    value: 2,
    Component: ConfirmPrivateKey,
  }
];

const RecoveWalletByPrivateKey: React.FC = () => {
  const [steps] = useState<StepType[]>(recoverByPhraseSteps);
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
                byPrivateKey={true}
              />
            )}
          </>
        );
      })}
    </div>
  );
};

export default RecoveWalletByPrivateKey;
