import React from "react";

interface InfoCardProps {
  heading: string;
  description: string;
  img: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ img, heading, description }) => {
  return (
    <div className="flex flex-row items-center max-w-lg gap-[15px]">
      <img
        src={img}
        alt="Crypto Wallet"
        className="w-8 h-8"
      />

      <div className="flex flex-col items-start pb-[12px]">
        <h4 className="mb-1 text-[14px] font-bold text-white">
          {heading}
        </h4>
        <p className="text-[10px] text-white">
          {description}
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
