import { useContext } from "react"
import { ProductsContext } from "../../../../features/products/context/ProductsContext"
import { CaretRightIcon } from "@phosphor-icons/react"

export function ButtonMore({path}:{path:string} ){

    const {empty,isFiltered,getMoreProducts} = useContext(ProductsContext)
    return(
        <div className='w-full ml-4 mb-4 flex justify-start  items-center'>
        
            <button
            onClick={()=>getMoreProducts(path)}
            className=' text-base text-primary font-bebas  cursor-pointer flex items-center gap-2 border rounded px-2 bg-[#ffff] hover:bg-[#082F36] hover:text-white transition all duration-200'
            style={empty || isFiltered ? {display:'none'} : {}}
            >
                ver más
                <CaretRightIcon size={18} />
            </button>


        </div>
    )
}