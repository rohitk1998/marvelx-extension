import React from "react";

interface InfoCardProps{
    heading: string;
    description: string;
    img: string; 
}
  
const InfoCard:React.FC<InfoCardProps>  = ({img,heading,description}) => {
  return (
    <div className="flex flex-row items-center max-w-lg gap-2" style={{marginBottom:"10px",marginTop:"10px"}}>
      <img
        src={img}
        alt="Crypto Wallet"
        className="w-8 h-8"
      />
      
      <div className="flex flex-col items-start">
        <h2 className="mb-2 text-[14px] font-normal text-white">
         {heading}
        </h2>
        <p className="text-[10px] text-white">
          {description}
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
