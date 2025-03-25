


const WalletBoardHeader:React.FC = ()=>{
   return(
    <div
    className="flex items-center justify-between"
    style={{ marginTop: '20px' }}
  >
    <div className="flex items-center space-x-2">
      <div className="flex items-center justify-center w-8 h-8 bg-purple-700 rounded-full">
        <span className="text-xs">JS</span>
      </div>
      <div>
        <p className="text-[10px] text-gray-400">@JamesScott</p>
        <div className="flex items-center">
          <p
            className="text-[14px] font-[400]"
            style={{ marginLeft: '2px' }}
          >
            First time
          </p>
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
    </div>
    <div className="flex items-center justify-center w-8 h-8 bg-transparent">
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </div>
  </div>
   )
}

export default WalletBoardHeader;