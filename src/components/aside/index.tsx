import { MdOutlineDesignServices } from "react-icons/md";
import { Card } from "../card";
import { RxComponentBoolean } from "react-icons/rx";
import { LiaShoePrintsSolid } from "react-icons/lia";
import { BsLightningCharge } from "react-icons/bs";



export function Aside(){

    const style="shadow shadow-[#2A4D4E] border border-[#2A4D4E] rounded pt-2 px-1 max-h-35  "
    const color ='#C14426'
    return(
       <aside className=" grid grid-cols-2 md:grid-cols-4 px-2 gap-4 w-full max-w-7xl md:mx-auto">

            <section className={style}>
                <Card  title="Diseño" description="100% originales y exclusivos" >
                    <MdOutlineDesignServices size={30} color={color} />
                </Card>
            </section>
            <section className={style}>
                <Card  title="Material" description="Cuero 100% nacional ">
                    <RxComponentBoolean size={30} color={color}/>
                </Card>
            </section>
            <section className={style}>
                <Card  title="Comodidad" description="Máximo confort para el día a día">
                    <LiaShoePrintsSolid size={30} color={color} className="" />
                </Card>
            </section>
            <section className={style}>
                <Card  title="Durabilidad" description="Hechos para acompañarte por años">
                    <BsLightningCharge size={30} color={color} />
                </Card>
            </section>
            <div>

            </div>

           
       </aside> 
    )
}