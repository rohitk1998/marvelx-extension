interface StepType {
    id: number;
    value: number;
    Component: React.FC<{ steps: StepType[]; active: number; done: number[]; setDone: Function;
        setActive: Function;}>;
  }

interface StepperProps {
  steps: StepType[];
  active: number;
  done: Array<number>;
}

const Stepper: React.FC<StepperProps> = ({ steps, active, done }) => {

  return (
    <div className="flex items-center justify-center mb-6">
      {steps.map((val, index) => {
        return (
          <>
            <div className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 text-sm font-semibold text-white border rounded-full ${
                  active === index ? 'border-blue-500' : 'border-gray-300'
                } ${
                  done.includes(val.id) ? 'bg-blue-500' : ''
                }`}
              >
                {val.value}
              </div>
              {/* <p className="ml-2 text-xs text-white">Create password</p> */}
            </div>
            {steps.length - 1 !== index && (
              <div className="w-10 h-[2px] bg-gray-600 mx-2"></div>
            )}
          </>
        );
      })}
    </div>
  );
};

export default Stepper;
