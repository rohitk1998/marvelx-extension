
interface NavigationBarTitleProps {
  callback?: Function;
  title: string;
  titleClass?: string
}

export const NavigationBarTitle: React.FC<NavigationBarTitleProps> = ({ callback, title, titleClass }) => {
  return (
    <div className="relative flex items-center w-full">
      <button className="absolute text-white cursor-pointer" onClick={() => callback && callback()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </button>
      <h3 className={titleClass ? titleClass : "w-full text-[24px] font-[700] text-center text-white"}>{title}</h3>
    </div>
  );
};