import { useContext } from "react"
import { ProductsContext } from "../../../../features/products/context/ProductsContext"

export function ButtonMore(){

    const {empty,isFiltered,getMoreProducts} = useContext(ProductsContext)
    return(
        <div className='w-full flex justify-center'>
            <button
            onClick={getMoreProducts}
            className='bg-linear-to-t to-[#C14426] via-[#E86343] from-[#C14426] text-white text-lg h-9 px-4 my-12 w-full max-w-3xs rounded-sm font-medium cursor-pointer'
            style={empty || isFiltered ? {display:'none'} : {}}
            >
                Ver más
            </button>
        </div>
    )
}