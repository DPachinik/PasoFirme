import { useContext } from "react"
import { ProductsContext } from "../../../../features/products/context/ProductsContext"
import { FaArrowLeftLong } from "react-icons/fa6"

export function ButtonProducts(){
    const {loadInitialProducts} = useContext(ProductsContext)

    return(
        <div className='w-44   flex  items-center justify-center   bg-[#C00000] rounded'>
            <button 
            className='bg-[#E86343]/70 text-white text-base h-9 w-full  rounded font-medium cursor-pointer flex items-center justify-center gap-4'
            onClick={loadInitialProducts}
            >
                <FaArrowLeftLong />
                COLECCIÓN

            </button>
        </div>
    )
}