import { useNavigate } from 'react-router-dom';
import DashLayout from '../dashboardLayout';
import arrowright from '../../assets/icons/arrow-right.svg';

function getInitials(name: string) {
  if (!name || typeof name !== 'string') return ''; // Return empty string if no data

  const words = name.trim().split(/\s+/); // Split by spaces and remove extra spaces

  if (words.length > 1) {
    return words[0][0] + words[1][0]; // First letter of the first two words
  }

  return words[0][0]; // First letter of a single word
}

const ManageAccountSetting: React.FC = () => {
  const navigate = useNavigate();

  const accounts: any = localStorage.getItem('account');
  const parsedAccount = JSON.parse(accounts) || {};
  const defaultAccountName = Object.keys(parsedAccount)[0] || '';

  const data2 = [
    {
      label: defaultAccountName,
      icon: '',
      nextarrow: arrowright,
    },
  ];

  return (
    <DashLayout
      title="Manage account"
      backCallback={() => navigate('/settings')}
      navigationBarTitleClass="w-full text-[16px] font-[600] text-center text-white"
    >
      <div className="flex flex-col bg-[#4B506633] rounded-[10px] border border-[#3739417D] w-[325px] h-[57px] mx-auto mt-[30px]">
        {data2.map((item) => (
          <button
            key={item.label}
            className="flex justify-between w-full border-b border-[#3A3C48] last:border-b-0 items-center text-[16px] font-medium cursor-pointer p-[10px_20px] "
            style={{ padding: '14px 16px' }}
            onClick={() => navigate('/edit-account',{ state : { path : '/manage-account' } })}
          >
            <span className="text-[16px] text-[#fff] font-medium flex gap-[7px] items-center">
              <div className="w-[32px] h-[32px] rounded-full bg-gray-600 items-center justify-center flex text-[16px] font-[800]">
                {getInitials(defaultAccountName).toUpperCase()}
              </div>
             <p className='ml-[5px] text-[16px] font-[800] '> {item.label}</p>
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

export default ManageAccountSetting;
