import { InputSearch } from "../InputSearch/InputSearch";
import { Category } from "../category";

export function Header(){
    return(
        <header className="sticky top-0 w-full  z-50 bg-fondo pb-4 pt-4 px-3.5 ">

            <div className="flex justify-between  min-h-[42px] pb-3.5 font-Poppins  items-baseline ">
                <div className="flex flex-col gap-px">
                    <span className="text-[16px] text-olive font-semibold  leading-3.5 ">
                    Hola, Bienvenido a
                    </span>
                    <span className="text-[20px] font-semibold text-title">Nuestra Tienda! 👋</span>

                </div>
                <div className="relative flex flex-col items-center scale-90">
                    <img 
                    src="/public/logotipo.png" 
                    alt="tenis verde, logotipo"
                    className="h-10 -rotate-3"
                    />
                    <p className="absolute top-8 font-Montserrat text-title font-semibold text-lg">
                        <span className="text-xl text-title">P</span>aso<span className="text-xl text-title">F</span>irme
                    </p>
                </div>


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