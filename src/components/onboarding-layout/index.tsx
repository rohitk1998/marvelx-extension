import { LogoBlack,HelpIcon } from "../../assets";
const OnBoardingLayout = ({ children }: { children: any }) => {
  return (
    <div className="bg-[#9FA6CC] w-[100%] h-[100vh] flex flex-col items-start justify-center">
      <div className="w-[100%] mx-auto flex flex-row justify-between items-start px-8 h-[100px]" style={{padding:"30px"}}>
       <div style={{marginLeft:"40px"}}>
        <img src={LogoBlack} alt="" />
       </div>
       <div style={{marginRight:"40px"}} className="flex flex-row items-center justify-center gap-1">
        <img className="w-[30px] h-[30px]" src={HelpIcon} alt="" />
        <p className="text-black text-[14px] font-[600]">Help</p>
       </div>
      </div>
      <div className="w-[100%] h-[100vh] flex items-center justify-center">
      {children}
    </div>
    </div>
  );
};

export default OnBoardingLayout;
