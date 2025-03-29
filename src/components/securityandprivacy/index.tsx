import { useNavigate } from 'react-router-dom';
import DashLayout from '../dashboardLayout';
import { AddressBook } from '../../assets/index';
import arrowright from '../../assets/icons/arrow-right.svg';

const data2 = [
  {
    label: 'Two Factor Authenticator',
    icon: AddressBook,
    nextarrow: arrowright,
  },
];

const SecurityAndPrivacy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <DashLayout
      title="Security and Privacy"
      backCallback={() => navigate('/settings')}
      navigationBarTitleClass="w-full text-[16px] font-[600] text-center text-white"
    >
      <div className="flex flex-col bg-[#4B506633] rounded-[10px] border border-[#3739417D] w-[325px] h-[57px] mx-auto mt-[30px]">
        {data2.map((item, index) => (
          <button
            key={index}
            className="flex justify-between w-full border-b border-[#3A3C48] last:border-b-0 items-center text-[16px] font-medium cursor-pointer p-[10px_20px] "
            style={{ padding: '14px 16px' }}
            onClick={() => navigate('/two-factor-verification')}
          >
            <span className="text-[16px] text-[#fff] font-medium flex gap-[7px] items-center">
              {/* {item.icon && (
                  <img
                    src={item.icon}
                    alt="icon"
                    className="w-[24px] h-[24px]"
                  />
                )} */}
              {item.label}
            </span>
            {item.nextarrow && (
              <img
                src={item.nextarrow}
                alt="arrow"
                className="w-[22px] h-[22px]"
              />
            )}
          </button>
        ))}
      </div>
    </DashLayout>
  );
};

export default SecurityAndPrivacy;
