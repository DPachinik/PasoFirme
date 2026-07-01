import type { ReactNode } from "react";

interface CarProps{
    title:string;
    description:string;
    children: ReactNode;
}


export function Card ({title, description, children}:CarProps){
    return(
            
        <div className=" w-full h-full flex flex-col items-center bg-[#082F36]/60  py-4 rounded ">

            <div className="flex flex-col items-center">
                {children}
                <h2 className="text-white text-lg md:text-xl font-medium  ">{title}</h2>
            </div>

            <p className=" text-center md:text-base  text-white text-xs ">{description}</p>
            
        </div>


    )
}