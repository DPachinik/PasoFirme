import { LiaCartArrowDownSolid } from "react-icons/lia";
import { InputSearch } from "../InputSearch/InputSearch";
import { Category } from "../category";

export function Header(){
    return(
        <header className="sticky top-0 w-full  z-50 bg-fondo pb-4 px-3.5">

            <div className="flex justify-between items-center min-h-[42px] py-3.5 font-Poppins">
                <div className="flex flex-col gap-px">
                    <span className="text-[18px] text-olive font-semibold  leading-3.5 ">
                    Hola, David! 👋
                    </span>

                    <h1 className="text-[20px] font-semibold leading-5 text-basic">
                    Bienvenido a PasoFirme!
                    </h1>
                </div>

                <button
                    type="button"
                    aria-label="Open shopping cart"
                    className="w-10 h-10 flex items-center justify-center text-[#95982E]"
                >
                    <LiaCartArrowDownSolid  size={32} strokeWidth={0} />
                </button>

            </div>

            <div className=' w-full  flex  items-center justify-center mx-auto gap-8  z-50  mt-6 lg:hidden'>              
                    <InputSearch />
            </div>

            <div>
                <Category />
            </div>

        </header>
    )
}