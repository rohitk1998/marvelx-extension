import React,{useEffect} from 'react';
import { SplashImg,logoIcon, marvelXIcon } from '../../assets';
import { useNavigate } from 'react-router-dom';

const Splash: React.FC = () => {

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/add-wallet');
    }, 3000);
  }, []);
  
  return (
    <div
      className="flex flex-col items-center justify-center w-full max-w-[375px] h-screen min-h-[600px] max-h-[600px] bg-no-repeat bg-cover bg-center rounded-[20px]"
      style={{ backgroundImage: `url(${SplashImg})` }}
    >
      <div className="flex flex-row items-center justify-center gap-1">
        <div className="flex items-center justify-center">
          <img
            src={logoIcon}
            alt="Primary Logo"
            className="object-contain w-auto"
            style={{ height: '54px', width: '83px' }}
          />
        </div>
        <div className="flex items-center justify-center">
          <img
            src={marvelXIcon}
            alt="MarvelX Logo"
            className="object-contain w-auto h-[80px]"
            style={{ height: '54px', width: '157px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Splash;
