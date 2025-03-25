import {
  NavigationBarImg,
  MenuIcon1,
  MenuIcon2,
  MenuIcon3,
  MenuIcon4,
  MenuButtonIcon,
} from '../../assets';

const WalletNavigationBar = () => {
  return (
    <div className="relative w-[100%] bg-gray-900 h-[100px]">
      <img
        src={NavigationBarImg}
        alt="Background with notch"
        className="fixed w-[100%] bottom-0 left-0 right-0 pt-2 pb-6 bg-gray-900"
      />

      <div className="fixed bottom-[27px] w-16 h-16 -translate-x-1/2 bg-blue-900 rounded-full left-1/2 flex justify-center items-center">
        <img src={MenuButtonIcon} alt="Background with notch" className="" />
      </div>
      <img
        src={MenuIcon1}
        className="fixed bottom-[22px] w-[24px] h-[24px] left-[35px]"
      />
      <img
        src={MenuIcon2}
        className="fixed bottom-[22px] w-[24px] h-[24px] left-[105px]"
      />
      <img
        src={MenuIcon4}
        className="fixed bottom-[22px] w-[24px] h-[24px] right-[105px]"
      />
       <img
        src={MenuIcon3}
        className="fixed bottom-[22px] w-[24px] h-[24px] right-[35px]"
      />
    </div>
  );
};

export default WalletNavigationBar;
