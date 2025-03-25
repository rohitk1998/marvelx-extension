
interface NavigationBarTitleProps{
  callback:Function;
  title:string;
}

export const NavigationBarTitle : React.FC<NavigationBarTitleProps> = ({callback,title}) => {
  return (
    <div className="relative flex items-center w-full" style={{paddingTop:"20px"}}>
      <button className="absolute text-white cursor-pointer left-4" onClick={()=> callback()}>
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
      <h1 className="w-full text-xl font-normal text-center text-white">{title}</h1>
    </div>
  );
};