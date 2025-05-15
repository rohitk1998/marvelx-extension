import { Link } from 'react-router-dom';
import {
    // SendIcon,
    ReceiveIcon,
    SwapIcon,
    BuyIcon,
  } from '../../assets';

  const links = [
    // { icon: SendIcon, label: 'Send',to:'/send' },
    { icon: ReceiveIcon, label: 'Receive',to:'/receive' },
    { icon: SwapIcon, label: 'Swap',to:'/' },
    { icon: BuyIcon, label: 'Buy',to:'/' },
  ]


const ActionMenu:React.FC = ()=> {
    return(
      <div className='flex justify-between pt-[10px] mx-auto w-[329px]'>
      {links.map((link) => (
        <Link key={link.label} to={link.to} className='bg-[#4B50661A] rounded-[18px] border border-[#222326] text-[#9CA9B9] text-[12px] w-[77px] h-[77px] flex flex-col justify-center items-center gap-[3px] hover:border-[#4b4a54] transition-all duration-300 ease-in-out'>
          <img src={link.icon} alt="icon" className='w-[38px] h-[38px]' />
          {link.label}
        </Link>
      ))}
    </div>
    )
}

export default ActionMenu;


