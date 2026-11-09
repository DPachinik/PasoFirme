import { HeadsetIcon, MoneyWavyIcon, TruckIcon } from "@phosphor-icons/react";


export default function SubBanner(){
    return(
        <section className="mt-8  flex justify-around font-bebas  text-[8px] lg:text-[12px]">
            <div className="flex flex-col md:flex-row   items-center justify-center text-center md:text-start  sm:w-fit sm:gap-2">
                <TruckIcon  className="text-primary text-[26px] sm:text-2xl md:text-3xl mb-2" />
                <div className="text-primary">
                    <strong>ENVÍOS RÁPIDOS</strong>
                    <p className=" text-gray-500">Entregas a todo el país</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row   items-center justify-center text-center md:text-start  sm:w-fit sm:gap-2">
                <MoneyWavyIcon  className="text-primary text-[26px] sm:text-2xl md:text-3xl mb-2" />
                <div className="text-primary">
                    <strong >PAGOS SEGUROS</strong>
                    <p className=" text-gray-500">Transferencias protegidas</p>
                </div>
            </div>
            <div  className="flex flex-col md:flex-row   items-center justify-center text-center md:text-start   sm:w-fit sm:gap-2">
                <HeadsetIcon    className="text-primary text-[26px] sm:text-2xl md:text-3xl mb-2" />
                <div className="text-primary">
                    <strong >ATENCIÓN 24/7</strong>
                    <p className=" text-gray-500">Soporte por WhatsApp</p>
                </div>
            </div>
        </section>
    )
}