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
                className={`flex items-center justify-center w-[28px] h-[28px] text-[12px] font-[600] text-white border rounded-full ${
                  active === index ? 'border-[#1142C7]' : active !== index  && !done.includes(val.id) ? 'border-gray-300' : 'border-[#1142C7]'
                } ${
                  done.includes(val.id) ? 'bg-[#1142C7]' : ''
                }`}
              >
                {val.value}
              </div>
              {/* <p className="ml-2 text-xs text-white">Create password</p> */}
            </div>
            {steps.length - 1 !== index && (
              <div className="w-[51px] h-[1px] bg-gray-600"></div>
            )}
          </>
        );
      })}
    </div>
  );
};

export default Stepper;
