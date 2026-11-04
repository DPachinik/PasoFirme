import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useSearchParams } from 'react-router-dom';

export function InputSearch(){

    const [searchParams, setSearchParams] = useSearchParams();
    const [input, setInput] =useState<string>('');


    function handleSearch(){
        if(input.trim()==='') return;

        searchParams.set('busqueda', input.trim());
        setSearchParams(searchParams)
        setInput('');
    }


    return(

        <div className='flex w-full max-w-2xl  items-center justify-center gap-2  my-4 bg-white px-2 rounded '>
            <input
                className='w-full   h-8  outline-none text-[#082F36] ' 
                type='text' 
                placeholder='Buscar'
                value={input}
                onChange={(e)=>setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />

            <button 
                className=''
                onClick={handleSearch}
            >
                <IoSearch  size={24} className='cursor-pointer text-[#2A4D4E] hover:text-[#C14426]' />
            </button>        
        </div>
    )

}