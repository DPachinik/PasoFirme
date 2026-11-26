import { MagnifyingGlassIcon, SparkleIcon } from "@phosphor-icons/react";
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
        placeholder ='Oxford, Baco, Blucher...'
        break;
        case 'accesorios':
        placeholder ='Bolsos, Medias, Mochilas...'
        break;
        case 'sport':
        placeholder ='Adidas, Nike, Puma...'
        break;

    }



    return(

        <div className='relative  flex w-full sm:max-w-2xl  items-center justify-center gap-2'>
            <div className="flex h-[42px] w-full sm:max-w-2xl  items-center justify-center rounded-md shadow shadow-[#A6A4A2]">
                <button 
                    className='absolute left-0 flex   h-8 w-10 lg:h-auto lg:w-auto  items-center justify-center rounded-r'
                    onClick={()=>{handleSearch()}}
                >
                    <SparkleIcon   size={18} className='text-olive' />

                </button>

                <input
                    className=' w-full text-sm  h-8  outline-none pl-10 font-Poppins' 
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
            </div>

            <button
            className="bg-active h-[42px] w-[42px] rounded-md flex items-center justify-center"
            onClick={()=>{handleSearch()}}
            >
                <MagnifyingGlassIcon  size={26} weight="bold" className="text-white"/>
            </button>

        </div>
    )

}