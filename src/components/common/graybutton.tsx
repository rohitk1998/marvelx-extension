

interface GrayButtonProps {
	title: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	isDisabled?: boolean;
}

export const GrayButton: React.FC<GrayButtonProps> = ({ title, onClick, isDisabled = false }) => {
	return (
		<button disabled={isDisabled} className={`w-[100%] h-[54px] font-normal text-white bg-[#3A3C48] rounded-xl cursor-pointer text-[16px] ${isDisabled ? 'bg-[3A3C48]' : 'bg-[#3A3C48]'}`} style={{ marginBottom: "10px" }} onClick={onClick}>
			{title}
		</button>
	)
}