
interface ErrorProps{
    error:string;
}


const ValidationError:React.FC<ErrorProps> = ({error})=>{
    return(
        <p className='text-[#F66868] text-[14px] font-[500]' style={{marginTop:"5px"}}>{error}</p>
    )
}

export {
    ValidationError
}