import { CrossIcon } from "../../assets/SvgIcon";

interface CommonDrawerProps {
	content: React.ReactNode;  // Accept JSX content
	isOpen: boolean;
	closeDrawer: () => void;
}

const CommonDrawer: React.FC<CommonDrawerProps> = ({ content, isOpen, closeDrawer }) => {
	if (!isOpen) return null;  // Don't render if not open

	return (
		<div
			id="drawer"
			className="absolute top-0 left-1/2 transform -translate-x-1/2 max-h-[600px] h-full  bg-[#232532bf] bg-opacity-50 flex justify-center items-center w-[100%]"
		>
			<div className="relative bg-[#000]  overflow-y-auto max-w-[362px] w-full rounded-tl-[20px] rounded-tr-[20px] rounded-bl-none rounded-br-none" style={{ marginTop: 'auto' }}>
				{/* Close Button */}
				<button
					onClick={closeDrawer}
					className="absolute cursor-pointer top-3 right-4"
				>
					<CrossIcon />
				</button>
				{/* Drawer Content */}
				<div className="drawer-content" style={{ padding: '20px 15px 15px' }}>
					{content}
				</div>
			</div>
		</div>
	);
};

export default CommonDrawer;
