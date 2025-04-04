import { useEffect, useState } from "react";
import SelectToken from "./selecttoken";
import ReceiveSol from "../receivesol";

interface StepType {
  id: number;
  value: number;
  Component: React.FC<{
    active: number;
    setActive: Function;
    setToken:Function;
    token:any;
  }>;
}

const ReceiveSteps: StepType[] = [
  {
    id: 0,
    value: 1,
    Component: SelectToken,
  },
  {
    id: 1,
    value: 2,
    Component: ReceiveSol,
  }
];

const Receive : React.FC = () => {
  const [steps] = useState<StepType[]>(ReceiveSteps);
  const [active, setActive] = useState(0);
  const [selectedToken, setSelectedToken] = useState(null);

  useEffect(()=>{
    setActive(0);
    setSelectedToken(null);
     return(()=>{
      setActive(0);
      setSelectedToken(null);
     })
  },[])

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
                setToken={setSelectedToken}
                token={selectedToken}
              />
            )}
          </>
        );
      })}
    </div>
  );
};

export default Receive;


