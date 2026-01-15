import type { ReactNode } from "react";

interface CarProps{
    title:string;
    description:string;
    children: ReactNode;
}


export function Card ({title, description, children}:CarProps){
    return(
            
        <div className=" w-full h-full flex flex-col items-center  p-2 border border-dashed border-white">
            {children}
            <h2 className="text-white text-lg md:text-xl font-semibold mt-2 mb-4">{title}</h2>
            <p className="text-white text-center md:text-base text-xs mb-2">{description}</p>
            
        </div>


    )
}