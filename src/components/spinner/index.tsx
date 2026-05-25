import { CgSpinnerTwo } from "react-icons/cg";

export function Spinner(){
    return(
        <div className='w-full h-full flex items-center justify-center animate-spin'>
            <CgSpinnerTwo size={40} color='white' />
        </div>
    )
}