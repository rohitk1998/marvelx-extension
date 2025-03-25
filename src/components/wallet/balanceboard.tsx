
interface BalanceProps{
  usdBalance:number;
}

const BalanceBoard: React.FC<BalanceProps> = ({usdBalance}) => {
  

  return (
    <div className='dashboard'>
    <div className='bg-[#4B50661A] rounded-[18px] border border-[#222326]' style={{ padding: '23px 0px 30px 0' }}>
      <h2 className='text-[48px] font-extrabold text-[#fff] text-center'>${usdBalance.toFixed(2)}</h2>
      <p className='text-[#fff] flex gap-[7px] justify-center font-bold text-[16px]'>$0.00 <span className='bg-[#0BA0244D] text-[16px] rounded-[41px] text-[#54D56A] w-[62px] h-[25px] text-center'>
        +0.00%
      </span>
      </p>
    </div>
  </div >
  );
};

export default BalanceBoard;
