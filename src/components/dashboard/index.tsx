// import { SendIcon, ReceiveIcon, SwapIcon, BuyIcon } from '../../assets/SvgIcon'
import { Link } from "react-router-dom"
import solana from "../../assets/solana.svg"
import graphfirst from "../../assets/graphfirst.png"
import usdt from '../../assets/icons/usdt-color.png'
import DashboardLayout from '../dashboardLayout/index'
import {
	SendIcon,
	ReceiveIcon,
	SwapIcon,
	BuyIcon,
} from '../../assets';
function Dashboard() {
	const links = [
		{ to: "#", icon: SendIcon, label: "Send" },
		{ to: "#", icon: ReceiveIcon, label: "Receive" },
		{ to: "#", icon: SwapIcon, label: "Swap" },
		{ to: "#", icon: BuyIcon, label: "Buy" }
	];
	return (
		<DashboardLayout showSearchCoin={true} showFooter={true} title="">
			<div className='dashboard'>
				<div className='bg-[#4B50661A] rounded-[18px] border border-[#222326]' style={{ padding: '23px 0px 30px 0' }}>
					<h2 className='text-[48px] font-extrabold text-[#fff] text-center'>$10,746</h2>
					<p className='text-[#fff] flex gap-[7px] justify-center font-bold text-[16px]'>$345 <span className='bg-[#0BA0244D] text-[16px] rounded-[41px] text-[#54D56A] w-[62px] h-[25px] text-[14px] text-center'>
						+34%
					</span>
					</p>
				</div>
				<div className='flex justify-between' style={{ marginTop: '10px' }}>
					{links.map((link, index) => (
						<Link key={index} to={link.to} className='bg-[#4B50661A] rounded-[18px] border border-[#222326] text-[#9CA9B9] text-[12px] w-[77px] h-[77px] flex flex-col justify-center items-center gap-[3px]'>
							<img src={link.icon} alt="icon" className='w-[38px] h-[38px]' />
							{link.label}
						</Link>
					))}
				</div>
				<div className=''>
					<h4 className='text-[#fff] text-[16px] font-extrabold ' style={{
						padding: '20px 0 22px 0'
					}}>My assets</h4>
					<ul>
						<li className="flex flex-col gap-[25px]">
							<div className='flex justify-between'>
								<div className='flex gap-[10px]'>
									<img src={solana} alt="imgs" />
									<p className='text-[#fff] text-[16px] font-extrabold flex flex-col gap-[3px]'>Solana<span className='font-semibold text-[#6E7186] text-[10px]'>
										1.7 SOL</span></p>
								</div>
								<div className='graphSec'>
									<img src={graphfirst} alt="imgs" />
								</div>
								<div className='listingData_rightData'>
									<h4 className='text-[#fff] text-[16px] font-extrabold flex flex-col gap-[3px]'>223.03<span className='font-semibold text-[10px] text-[#198E2D]'>+ $345</span></h4>
								</div>
							</div>
							<div className='flex justify-between'>
								<div className='flex gap-[10px]'>
									<img src={usdt} alt="imgs" />
									<p className='text-[#fff] text-[16px] font-extrabold flex flex-col gap-[3px]'>USDT<span className='font-semibold text-[#6E7186] text-[10px]'>
										12.3 USDT</span></p>
								</div>
								<div className='graphSec'>
									<img src={graphfirst} alt="imgs" />
								</div>
								<div className='listingData_rightData'>
									<h4 className='text-[#fff] text-[16px] font-extrabold flex flex-col gap-[3px]'>12.3<span className='font-semibold text-[10px] text-[#198E2D]'>+ $0.01</span></h4>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div >
		</DashboardLayout>
	)
}

export default Dashboard