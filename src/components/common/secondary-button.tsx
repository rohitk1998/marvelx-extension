interface SecondaryButtonProps {
    title: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({ title, onClick }) => {
    return (
        <button
            className="w-full h-[54px] font-[600] text-white border-1 border-[#FFFFFF80]
            ] bg-transparent rounded-xl cursor-pointer text-[14px] transition-all duration-300 hover:bg-[#1142C7] hover:border-[#1142C7] hover:text-white"
            style={{ marginBottom: "10px" }}
            onClick={onClick}
        >
            {title}
        </button>
    );
};
