import { SplashImg } from '../../assets';
import { NavigationBarTitle, PrimaryButton } from '../index';
export default function SecretKey() {
	const items = [
		'cup',
		'admit',
		'net',
		'debris',
		'look',
		'kiwi',
		'blog',
		'bag',
		'syrub',
		'many',
		'net',
		'initiate',
	];
	return (
		<div
			className="relative flex flex-col items-center justify-center max-w-[375px] w-full h-screen max-h-[600px] bg-no-repeat bg-cover bg-center rounded-xl"
			style={{ backgroundImage: `url(${SplashImg})` }}
		>
			<div className="w-[90%] m-auto flex flex-col h-[100%] max-h-[96%] overflow-auto">
				<div className="" style={{ paddingTop: '15px' }}>
					<NavigationBarTitle
						title="By Secret Key Phrase"
						callback={() => {
						}}
					/>
				</div>
				<div className='flex-1 mt-5 pt-[20px]' style={{ paddingTop: '24px', margin: '0 7px' }}>
					<p className="font-medium text-[20px] text-[#fff] text-center">Enter Secret Recovery Phrase to access your wallet</p>
					<div className="border-[rgba(255,255,255,0.6)] justify-between rounded-[10px] border p-4 space-y-4  flex flex-wrap gap-y-4 gap-x-1" style={{ padding: "38px 29px", margin: "37px 0 23px 0" }}>
						{items.map((item, index) => (
							<div key={index} className="flex items-center gap-2 gap-x-2">
								<label className="text-white w-[21px] text-center">{index + 1}.</label>
								<input
									className="p-2 border rounded-[3px] w-[85px] h-[23px] text-center text-[#fff] outline-[0] text-[12px]"
									placeholder={item}
								/>
							</div>
						))}
					</div>
				</div>

				<div>
					<PrimaryButton
						title={'Confirm'}
					/>
				</div>
			</div >
		</div >

	);
}
