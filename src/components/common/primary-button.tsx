

interface PrimaryButtonProps {
    title: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    isDisabled?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ title, onClick, isDisabled = false }) => {
    return (
        <button disabled={isDisabled} className={`w-[100%] h-[54px] font-[600] text-white bg-[#1142C7] rounded-xl cursor-pointer text-[14px] ${isDisabled ? 'bg-[#1142C7]' : 'bg-[#1142C7]'}`} style={{ marginBottom: "10px" }} onClick={onClick}>
            {title}
        </button>
    )
}