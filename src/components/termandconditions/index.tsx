import { SplashImg } from '../../assets';

const TermAndConditions: React.FC = () => {
  return (
    <div
      className="flex flex-col items-center justify-start w-full max-w-[375px] min-h-[600px] max-h-[600px] overflow-scroll bg-no-repeat bg-cover bg-center rounded-[20px]"
      style={{ backgroundImage: `url(${SplashImg})` }}
    >
      <div className="flex-col items-center justify-start w-[90%] mx-auto mt-4">
        <div className="text-center font-[700] text-[16px] text-white">
          Terms and Conditions
        </div>
        <div>
          <p className="text-white font-[500]">
            MarvelX is the developer and owner of the MarvelX extension. By accessing or
            using the MarvelX Wallet (“Extension”), you agree to be bound by these
            Terms and Conditions, all applicable laws and regulations, and agree
            that you are responsible for compliance with any applicable local
            laws. If you do not agree with any part of these terms, you are
            prohibited from using the App or any of its features. The contents
            and functionalities of the MarvelX Wallet are protected by
            applicable copyright and trademark laws.
          </p>
          <div className="text-white ">
            <h6 className="text-center font-[700] text-[16px] text-white">
              Use License
            </h6>
            <p>
              These Terms permit you to use the MarvelX Wallet solely for
              personal, non-commercial purposes. You agree not to:
            </p>
            <span>● Modify or copy any part of the application’s content.</span>
            <span>
              ● Use the application or its features for commercial gain or
              public display.
            </span>
            <span>
              ● Attempt to reverse-engineer, decompile, or extract any part of
              the App's code or infrastructure.
            </span>
            <span>
              ● Remove or obscure any copyright, trademark, or other proprietary
              notices from the materials.
            </span>

            <p>
              This license shall automatically terminate if you violate any of
              these restrictions and may be terminated by MarvelX at any time.
              Upon termination, you must destroy any downloaded or stored
              materials related to the App.
            </p>
          </div>
          <div>
            <h6 className="text-center font-[700] text-[16px] text-white">
              Disclaimer
            </h6>
            <p className="text-white font-[500]">
              MarvelX provides the App and its services "as is" without any
              warranties, expressed or implied. This includes, without
              limitation, warranties of merchantability, fitness for a
              particular purpose, and non-infringement. MarvelX does not warrant
              the accuracy, reliability, or availability of the App or its
              integrated third-party services (such as token swaps or price
              alerts). All interactions are at your own risk.
            </p>
          </div>

          <div>
            <h6 className="text-center font-[700] text-[16px] text-white">
              Risk and Regulatory Compliance
            </h6>
            <p className="text-white font-[500]">
              MarvelX Wallet is a non-custodial decentralized wallet that allows
              users to create and manage wallets, send and receive
              cryptocurrencies. MarvelX does not hold or control users' private keys or
              funds.
            </p>
          </div>
          <div>
            <p className="text-white font-[500]">
              By using the MarvelX Wallet, you agree to release MarvelX from any
              and all liability related to your use of the App, including losses
              due to token swaps, regulatory violations, or market fluctuations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermAndConditions;
