import { useEffect, useState } from 'react';
import ValidatePassword from './enterpass';
import RecoveryPhraseWarningScreen from './confirmscreen';
import RecoveryPhraseDisplay from './showrecovery';

interface StepType {
  id: number;
  value: number;
  Component: React.FC<{
    active: number;
    setActive: Function;
    success: boolean;
    setSuccess: Function;
    error: string;
    setError: Function;
  }>;
}

const ShowRecoveryProps: StepType[] = [
  {
    id: 0,
    value: 1,
    Component: ValidatePassword,
  },
  {
    id: 1,
    value: 2,
    Component: RecoveryPhraseWarningScreen,
  },
  {
    id: 2,
    value: 3,
    Component: RecoveryPhraseDisplay,
  }
];

const RecoveryPhrase: React.FC = () => {
  const [steps] = useState<StepType[]>(ShowRecoveryProps);
  const [active, setActive] = useState(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
      setActive(0);
      setSuccess(false);
      setError('');
    return () => {
      console.log('component unmounted');
      setActive(0);
      setSuccess(false);
      setError('');
    };
  }, []);

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
                success={success}
                setSuccess={setSuccess}
                error={error}
                setError={setError}
              />
            )}
          </>
        );
      })}
    </div>
  );
};

export default RecoveryPhrase;
