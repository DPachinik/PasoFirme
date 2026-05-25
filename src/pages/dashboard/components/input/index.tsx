 import type {RegisterOptions, UseFormRegister} from 'react-hook-form'

interface InputProps{
    type: 'text' | 'number' | 'email' | 'password' | 'color'
    name:string;
    placeholder?:string;
    register:UseFormRegister<any>;
    error?:string;
    rules?:RegisterOptions;
}


export function Input({type, name, placeholder, register,rules, error}:InputProps){

    const baseStyles = 'w-full max-w-3xl text-xs  rounded-sm outline-none  h-7 pl-2 bg-white text-[#0B2D2E] '

    const typeStyles = 'h-6 w-10  rounded-full cursor-pointer border-none'
    return(
        <div className='w-full'>
            <input
                className={` ${type === 'color'? typeStyles : baseStyles} ${error? 'border border-red-500':''} `} 
                type={type}
                placeholder={ type !== 'color'? placeholder: undefined}
                {...register(name,rules)}
                id={name}
            />
            {error && <p className='text-red-600  text-sm  mt-1 pl-2'>{error}</p>}
        </div>

    )
}