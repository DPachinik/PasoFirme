import { useState, useContext} from "react";
import { IoSearch } from "react-icons/io5";
import { ProductsContext } from "../../features/products/context/ProductsContext";


export function InputSearch(){

    const {searchProducts} =useContext(ProductsContext)
    
    const [input, setInput] =useState<string>('');


    function handleSearch(){
        if(input==='') return;
        searchProducts(input);
        setInput('');
    }


    return(

        <div className='flex w-full items-center justify-center gap-2  px-4 my-4'>
            <input
                className='w-full max-w-xl pl-2  h-8 border-b border-slate-400 outline-none text-white ' 
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
                <IoSearch  size={28} className='cursor-pointer text-[#2A4D4E] hover:text-[#C14426]' />
            </button>        
        </div>
    )

}