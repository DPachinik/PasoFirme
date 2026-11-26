import { useContext } from "react"
import { ProductsContext } from "../../../../features/products/context/ProductsContext"
import { CaretRightIcon } from "@phosphor-icons/react"

export function ButtonMore({path}:{path:string} ){

    const {empty,isFiltered,getMoreProducts} = useContext(ProductsContext)
    return(
        <div className='w-full ml-2 mt-4 mb-4 flex justify-start  items-center'>
        
            <button
            onClick={()=>getMoreProducts(path)}
            className='  bg-active   font-Poppins cursor-pointer flex items-center gap-2 text-white rounded-md px-2 py-1   transition all duration-200'
            style={empty || isFiltered ? {display:'none'} : {}}
            >
                ver más
                <CaretRightIcon size={18}  />
            </button>


        </div>
    )
}