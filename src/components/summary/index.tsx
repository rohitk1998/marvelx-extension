import { useState } from 'react';
import DashboardLayout from '../dashboardLayout/index';
import solIcon from '../../assets/icons/summaysol.svg';
import CommonDrawer from '../commonDrawer/index';
import { PrimaryButton } from '../index';

function Summary() {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const openDrawer = () => setIsDrawerOpen(true);
	const closeDrawer = () => setIsDrawerOpen(false);

	const data = [
		{
			label: 'Asset',
			value: 'Solana',
			subText: 'text-white opacity-60 font-normal',
		},
		{
			label: 'From',
			value: '8kYZyxeW3kFmucN7TLNT7fFKeDn...4yLWA',
			subText: 'text-end',
		},
		{
			label: 'To',
			value: '8kYZyxeW3kFmucN7TLNTn...4yLWA',
			subText: 'text-end',
		},
		{
			label: 'Network fee',
			value: '0.000032 SOL (~$0.5)',
			subText: 'text-end',
		},
		{
			label: 'Max Total',
			value: '$230.45',
			subText: 'text-end',
		},
	];

	const drawerContent = (
		<div className="flex flex-col">
			<span className={`text-[12px] text-[#CECED1] font-normal text-center`}>
				First time transaction?
			</span>
			<h3 className="text-xl font-semibold text-center mb-4 text-[#fff]" style={{ padding: '6px 0 20px 0	' }}>Enable 2-FA</h3>
			<span className={`text-[12px] text-[#CECED1] font-normal text-center`}>
				Two factor authenticator (2-FA) is required before sending funds. Set up 2-FA  now to safely continue
			</span>
			<div style={{ paddingTop: '30px' }}>
				<PrimaryButton title="Setup 2-FA" />
			</div>
		</div>
	);

	return (
		<div className='abc'>
			<DashboardLayout title="Summary" showButton={true} btntitle="Next" onClick={openDrawer}>
				<div className="flex flex-col items-center justify-center" style={{ padding: '52px 0 13px 0' }}>
					<img src={solIcon} alt="imgs" className="w-[73px] h-[73px]" />
					<h2 className="text-[48px] font-extrabold text-[#fff]" style={{ paddingTop: '10px' }}>
						2 SOL
					</h2>
					<p className="text-[15px] font-normal text-[#fff]">~$230.00</p>
				</div>
				<div className="flex flex-col gap-[12px]">
					{data.map((item, index) => (
						<p key={index} className="flex justify-between text-[12px] text-[#fff] w-full">
							<span className={`${item.subText} text-[12px] text-white opacity-60 font-normal`}>
								{item.label}
							</span>
							{item.value}
						</p>
					))}
				</div>
				<CommonDrawer
					content={drawerContent}
					isOpen={isDrawerOpen}
					closeDrawer={closeDrawer}
				/>

			</DashboardLayout>

		</div>
	);
}

export default Summary;
