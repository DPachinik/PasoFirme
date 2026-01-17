 import type {RegisterOptions, UseFormRegister} from 'react-hook-form'

interface InputProps{
    type:string;
    name:string;
    placeholder:string;
    register:UseFormRegister<any>;
    error?:string;
    rules?:RegisterOptions;
}


export function Input({type, name, placeholder, register,rules, error}:InputProps){
    return(
        <div className='w-full mt-2'>
            <input
                className={`w-full max-w-2xl pl-2 rounded-sm h-8 border ${error? 'border-red-500':'border-[#3D4035]'} outline-none`} 
                type={type}
                placeholder={placeholder}
                {...register(name,rules)}
                id='name'
            />
            {error && <p className='text-red-600  text-sm  mt-1 pl-2'>{error}</p>}
        </div>

    )
}