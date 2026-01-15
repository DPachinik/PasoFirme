import { MdOutlineDesignServices } from "react-icons/md";
import { Card } from "../card";
import { RxComponentBoolean } from "react-icons/rx";
import { LiaShoePrintsSolid } from "react-icons/lia";
import { BsLightningCharge } from "react-icons/bs";


export function Aside(){
    return(
       <aside className=" grid grid-cols-2   gap-4 ">

            <section className="bg-linear-0 to-black/90 via-[#8B4513] from-[#8B4513] min-h-[120px] p-1 ">
                <Card  title="Diseño" description="100% originales y exclusivos" >
                    <MdOutlineDesignServices size={40} color="white" />
                </Card>
            </section>
            <section className="bg-linear-0 to-black via-[#3D4035] from-[#3D4035] min-h-[120px] p-1">
                <Card  title="Material" description="Cuero 100% nacional ">
                    <RxComponentBoolean size={40} color="white" />
                </Card>
            </section>
            <section className="bg-linear-0 to-black via-[#3D4035] from-[#3D4035] min-h-[120px] p-1">
                <Card  title="Comodidad" description="Máximo confort para el día a día">
                    <LiaShoePrintsSolid size={40} color="white" />
                </Card>
            </section>
            <section className="bg-linear-0 to-black/90 via-[#8B4513] from-[#8B4513]  min-h-[120px] p-1">
                <Card  title="Durabilidad" description="Hechos para acompañarte por años">
                    <BsLightningCharge size={40} color="white" />
                </Card>
            </section>

           
       </aside> 
    )
}