
interface ErrorProps{
    error:string;
}


const ValidationError:React.FC<ErrorProps> = ({error})=>{
    return(
        <p className='text-red-800 text-[13px] font-[100]' style={{marginTop:"5px"}}>{error}</p>
    )
}

export {
    ValidationError
}