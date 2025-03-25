interface SecondaryButtonProps {
    title: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({ title, onClick }) => {
    return (
        <button className="w-[100%] h-[54px] font-[600] text-white bg-red border rounded-xl cursor-pointer text-[14px]" style={{ marginBottom: "10px" }} onClick={onClick}>
            {title}
        </button>
    )
}