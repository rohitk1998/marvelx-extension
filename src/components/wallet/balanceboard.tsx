
interface BalanceProps {
  usdBalance: number|any;
}

const BalanceBoard: React.FC<BalanceProps> = ({ usdBalance }) => {
console.log('usdBalance',typeof usdBalance)

  return (
    <div className='bg-[#4B50661A] rounded-[18px] border-[0.5px] border-[#222326] w-[329px] h-[130px] flex flex-col items-center justify-center mx-auto'>
      <h2 className='text-[48px] font-[800] text-[#fff] text-center'>${usdBalance ? usdBalance?.toFixed(2) : '0.00'}</h2>
      <p className='text-[#fff] flex gap-[7px] justify-center font-bold text-[16px]'>$0.00 <span className='justify-center font-bold flex items-center bg-[#0BA0244D] text-[14px] rounded-[41px] text-[#54D56A] w-[62px] h-[25px] text-center'>
        +0.00%
      </span>
      </p>
    </div>
  );
};

export default BalanceBoard;
