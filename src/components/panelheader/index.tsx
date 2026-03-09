import { signOut } from "firebase/auth"
import { auth } from "../../services/firebaseConnection"
import { NavLink } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineAddBox } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import logo from '/logo.png'



export function DashboardHeader(){

    async function handleLogout(){
        await signOut(auth);
    }

    const linkStyle = 'flex items-center gap-2  pl-4 py-4 text-sm  text-white hover:bg-[#2A4D4E] transition-all '

    return(
        <div className="w-full flex flex-col items-center justify-start h-full border-b md:border-r border-[#2A4D4E]  text-primary font-medium gap-4 py-12  "> 
            
            <div className=" flex flex-col flex-1 justify-center items-center mt-4 ">
                <NavLink
                className="relative font-bold text-2xl lg:text-3xl"
                to='/'
                >
                    <img src={logo} className='w-20 absolute -top-14 right-5'/>
                    <span className='bg-clip-text text-white select-none'>Paso</span>
                    <span className='text-secondary bg-clip-text  select-none'>Firme</span>
                </NavLink>
                
            </div>
            
            <div className="flex flex-col flex-2 mt-4 w-full  ">
                <NavLink 
                to='/' 
                className={({isActive})=> isActive?` text-secondary ${linkStyle}`:linkStyle}>
                    <IoHomeOutline className="text-lg" />
                    Inicio
                </NavLink>

                <NavLink 
                to='/dashboard'
                end 
                className={({isActive})=> isActive?` text-secondary-rel ${linkStyle}`:linkStyle}>
                    <FaRegEdit className="text-lg" />
                    Administrar Productos
                </NavLink>

                <NavLink to='/dashboard/new' className={({isActive})=> isActive?` text-secondary-rel ${linkStyle}`:linkStyle}>
                    <MdOutlineAddBox className="text-lg" />
                    Registrar producto
                </NavLink>
            </div>    

            <div className="w-full flex  ">
                <button 
                onClick={handleLogout}
                className="flex w-fit hover:cursor-pointer mb-4 pl-4 rounded-sm text-sm items-center gap-2 h-11 text-white/50 hover:text-[#E86343]"
                > 
                    <TbLogout2 size={22} />
                    Cerrar Sesión
                </button>
            </div>

            
        </div>
    )
}