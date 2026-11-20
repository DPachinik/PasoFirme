import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { useParams, useSearchParams } from 'react-router-dom';

export function InputSearch(){

    const [searchParams, setSearchParams] = useSearchParams();
    const {route} = useParams();
    const [input, setInput] =useState<string>('');


    function handleSearch(){
        if(input.trim()==='') return;

        searchParams.set('busqueda', input.trim());
        setSearchParams(searchParams)
        setInput('');
    }

    let placeholder=''
    switch(route){
        case 'clásicos':
        placeholder ='oxford, baco, blucher...'
        break;
        case 'accesorios':
        placeholder ='bolsos, medias, mochila...'
        break;
        case 'sport':
        placeholder ='adidas, nike, olympikus...'
        break;

    }



    return(

        <div className=' flex w-full sm:max-w-2xl  items-center justify-center gap-2  my-4 bg-white pl-2 lg:pr-2  shadow rounded'>
            <input
                className='w-full text-sm  h-8  outline-none text-[#082F36] ' 
                type='text' 
                placeholder={placeholder}
                value={input}
                onChange={(e)=>setInput(e.target.value)}
                onKeyDown={(e) => {
                    if(e.key === 'Enter'){
                        handleSearch();
                    }
                }}
            />

            <button 
                className='flex bg-primary lg:bg-white  h-8 w-10 lg:h-auto lg:w-auto  items-center justify-center rounded-r'
                onClick={()=>{handleSearch()}}
            >
                <MagnifyingGlassIcon   size={24} className='cursor-pointer text-white lg:text-[#2A4D4E]  lg:bg-white' />
            </button>        
        </div>
    )

}