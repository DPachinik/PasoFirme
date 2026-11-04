import { useSearchParams } from "react-router-dom";
import { CaretLeftIcon } from "@phosphor-icons/react";

export function ButtonProducts() {

    const [, setSearchParams] = useSearchParams();

    function handleClear() {
        setSearchParams(prev => {
            prev.delete('busqueda');
            return prev;
        });
    }

    return (
        <div className='w-full ml-4 mb-4 flex justify-start items-center'>
            <button
                className='text-base text-primary font-bebas cursor-pointer flex items-center gap-2 border rounded px-2 bg-[#ffff] hover:bg-[#082F36] hover:text-white transition all duration-200'
                onClick={handleClear}
            >
                <CaretLeftIcon size={16} />
                regresar
            </button>
        </div>
    );
}