import { useContext } from "react"
import { ProductsContext } from "../../../../features/products/context/ProductsContext"

export function ButtonMore(){

    const {empty,isFiltered,getMoreProducts} = useContext(ProductsContext)
    return(
        <div className='w-44  flex justify-center bg-[#C00000] rounded '>
            <button
            onClick={getMoreProducts}
            className='bg-[#E86343]/70 text-white text-base h-9 w-full  rounded font-medium cursor-pointer'
            style={empty || isFiltered ? {display:'none'} : {}}
            >
                VER MAS
            </button>
        </div>
    )
}