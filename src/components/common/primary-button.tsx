import Spinner from "./spinner";

interface PrimaryButtonProps {
    title: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    isDisabled?: boolean;
    isLoading?:boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ title, onClick, isDisabled = false,isLoading = false }) => {
    return (
        <button
            disabled={isDisabled}
            className={`w-full h-[54px] font-[600] text-white bg-[#1142C7] rounded-xl cursor-pointer text-[14px] transition-opacity duration-200 ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'}`}
            style={{ marginBottom: "10px" }}
            onClick={onClick}
        >
            {!isLoading ? title : <Spinner loading={isLoading} />}
        </button>
    );
};
