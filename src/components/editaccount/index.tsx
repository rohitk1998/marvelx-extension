import DashboardLayout from '../dashboardLayout/index';
import editIcon from '../../assets/icons/edit-small.png';
import { Profile } from '../../assets/index';
import arrowright from '../../assets/icons/arrow-right.svg';
import { useNavigate } from 'react-router-dom';

const EditAccount: React.FC = () => {
  const navigate = useNavigate();

  const data = [
    {
      label: 'Account name',
      value: 'Account 1',
      path: '/',
    },
    {
      label: 'Account addresses',
      value: '1',
      path: '/accounts',
    },
  ];

  const data2 = [
    {
      label: 'Show recovery phrase',
      value: '',
      path: '/recovery-phrase',
    },
    {
      label: 'Show private key',
      value: '',
      path: '/secret-key',
    },
  ];

  return (
    <DashboardLayout
      title="Edit account"
      backCallback={() => navigate('/')}
      navigationBarTitleClass="w-full text-[16px] font-[600] text-center text-white"
    >
      <div
        className="relative flex flex-col items-center justify-center"
        style={{ padding: '22px 0 28px 0' }}
      >
        <div
          className="w-[148px] h-[148px] rounded-full bg-cover bg-no-repeat flex items-center justify-center"
          style={{ backgroundImage: `url(${Profile})` }}
        >
          <h1 className="text-[42px] font-[800] text-white">A</h1>
          <h1 className="text-[42px] font-[800] text-white">1</h1>
        </div>
        <span className="absolute right-0 bg-[#3A3C48] rounded-full w-[38px] h-[38px] flex justify-center items-center left-[59%] bottom-[15%] border-3 border-[#0C0E1E]">
          <img src={editIcon} alt="imgs" className="w-[18px] h-[18px] " />
        </span>
      </div>
      <div className="flex flex-col gap-[20px] w-[325px] mx-auto">
        <div className="flex flex-col bg-[#4B506633] rounded-[10px] border border-[#3739417D]">
          {data?.map((item) => (
            <button
              key={item.value}
              className="flex justify-between text-xs text-[#fff] w-full border-b border-[#3A3C48] last:border-b-0 text-[16px] font-medium cursor-pointer"
              style={{ padding: '16px 20px' }}
              onClick={() => navigate(item.path)}
            >
              {item.label}
              <span
                className={`text-[16px] text-[#6B6D76] font-medium flex gap-[6px] `}
              >
                {item.value}
                <img src={arrowright} alt="imgs" />
              </span>
            </button>
          ))}
        </div>
        <div className="flex flex-col bg-[#4B506633] rounded-[10px] border border-[#3739417D]">
          {data2?.map((item) => (
            <button
              key={item.value}
              className="flex justify-between text-xs text-[#fff] w-full border-b border-[#3A3C48] last:border-b-0 text-[16px] font-medium cursor-pointer"
              style={{ padding: '16px 20px' }}
              onClick={() => navigate(item.path)}
            >
              {item.label}
              <span
                className={`text-[16px] text-[#6B6D76] font-medium flex gap-[6px]`}
              >
                {item.value}
                <img src={arrowright} alt="imgs" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditAccount;
