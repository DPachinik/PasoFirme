import { BaseballCapIcon, SneakerIcon, SneakerMoveIcon } from "@phosphor-icons/react";
import { HiFire } from "react-icons/hi";
import { NavLink } from "react-router-dom";


export function Category(){



    return(
        <section className="flex mt-8 justify-between">
            <NavLink 
            to='/popular' 
            className={({ isActive }) =>
            `flex items-center px-4 py-2 rounded-xl gap-2 hover:cursor-pointer ${
                isActive ? "bg-active text-white" : "bg-defuse text-gray "
            }`}
            >
                
                <div className="bg-fondo rounded-full p-1" >
                    <HiFire size={22} className="text-olive" />
                </div>

                <p className="font-Poppins ">Popular</p>
            </NavLink >

            <div className="flex gap-2">
                <NavLink 
                to='/clásicos' 
                className={({ isActive }) =>
                `flex items-center px-2 py-2 rounded-xl gap-2 hover:cursor-pointer ${
                    isActive ? "bg-active text-white" : "bg-defuse text-gray"
                }`}
                >
                    <SneakerIcon size={30} />
                </NavLink> 

                <NavLink 
                to='/accesorios'
                className={({ isActive }) =>
                `flex items-center px-2 py-2 rounded-xl gap-2 hover:cursor-pointer ${
                    isActive ? "bg-active text-white" : "bg-defuse text-gray"
                }`}
                >
                    <BaseballCapIcon  size={30}  />
                </NavLink> 

                <NavLink 
                to='/deportivos'  
                className={({ isActive }) =>
                `flex items-center px-2 py-2 rounded-xl gap-2 hover:cursor-pointer ${
                    isActive ? "bg-active text-white" : "bg-defuse text-gray"
                }`}
                >
                    <SneakerMoveIcon size={30}  />
                </NavLink>                
                
            </div>
        </section>
    )
}