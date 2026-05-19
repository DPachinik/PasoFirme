import { useContext } from "react"
import { ProductsContext } from "../../../../features/products/context/ProductsContext"

export function ButtonProducts(){
    const {loadInitialProducts} = useContext(ProductsContext)

    return(
        <button 
        className='h-9 bg-linear-to-t to-[#E86343] via-[#E86343] from-[#C14426] text-white text-lg px-4 my-4 w-full max-w-3xs rounded-sm font-medium  cursor-pointer'
        onClick={loadInitialProducts}
        >Ver todos
        </button>
    )
}