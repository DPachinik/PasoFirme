import { useContext } from "react"
import { ProductsContext } from "../../../../features/products/context/ProductsContext"
import { FaArrowLeftLong } from "react-icons/fa6"

export function ButtonProducts(){
    const {clearSearch} = useContext(ProductsContext)

    return(
        <div className='w-44  mb-4 flex  items-center justify-center   bg-[#C00000] rounded'>
            <button 
            className='bg-[#E86343]/70 text-white text-base h-9 w-full  rounded font-medium cursor-pointer flex items-center justify-center gap-4 z-20'
            onClick={clearSearch}
            >
                <FaArrowLeftLong />
                COLECCIÓN

            </button>
        </div>
    )
}