import { HiOutlineTruck } from "react-icons/hi";
import { HiOutlineShieldCheck } from "react-icons/hi2";
import { RiCustomerService2Line } from "react-icons/ri";

export default function SubBanner(){
    return(
        <section className="mt-8  flex justify-around">
            <div className="flex flex-col md:flex-row   items-center justify-center text-center md:text-start w-30 sm:w-fit sm:gap-2">
                <HiOutlineTruck  className="text-primary text-[35px]" />
                <div className="text-primary">
                    <strong className="text-sm ">ENVÍOS RÁPIDOS</strong>
                    <p className="text-xs md:text-sm text-gray-500">Entregas a todo el país</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row   items-center justify-center text-center md:text-start w-30 sm:w-fit sm:gap-2">
                <HiOutlineShieldCheck  className="text-primary text-[35px]" />
                <div className="text-primary">
                    <strong className="text-sm">PAGOS SEGUROS</strong>
                    <p className="text-xs md:text-sm text-gray-500">Transferencias protegidas</p>
                </div>
            </div>
            <div  className="flex flex-col md:flex-row   items-center justify-center text-center md:text-start  w-30 sm:w-fit sm:gap-2">
                <RiCustomerService2Line   className="text-primary text-[35px]" />
                <div className="text-primary">
                    <strong className="text-sm">ATENCIÓN 24/7</strong>
                    <p className="text-xs md:text-sm text-gray-500">Soporte siempre disponible</p>
                </div>
            </div>
        </section>
    )
}