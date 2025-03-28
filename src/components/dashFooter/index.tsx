import { Link } from 'react-router-dom'
import { FooterDiscover, FooterElement, FooterReceipt, FooterSwapIcon, Wallet } from '../../assets/SvgIcon.tsx'
import footerbg from "../../assets/footerbg.png"

function DashFooter() {
	return (
		<div className="bg-cover bg-no-repeat px-[40px] h-[68px]" style={{ backgroundImage: `url(${footerbg})`, backgroundSize: '100% 100%' }}
		>
			<div className="relative flex items-center justify-between">
				<Link to="#"> <Wallet /></Link>
				<Link to="#"> <FooterElement /> </Link>
				<Link to="#" className="bg-[#1142C7] flex justify-center items-center w-[61px] h-[61px] rounded-full relative top-[-18px]"> <FooterSwapIcon /></Link>
				<Link to="#"> <FooterReceipt /></Link>
				<Link to="#"> <FooterDiscover /> </Link>
			</div>
		</div>
	)
}

export default DashFooter
