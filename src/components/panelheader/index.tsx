import { signOut } from "firebase/auth"
import { auth } from "../../services/firebaseConnection"
import { Link } from "react-router-dom";
import { IoBagCheckSharp, IoHomeOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineAddBox } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";


export function DashboardHeader(){

    async function handleLogout(){
        await signOut(auth);
    }

    const linktStyle = "flex items-center gap-2  pl-4 py-4 hover:border-r-2 border-slate-400 text-primary hover:bg-[#3D4035]/10 transition-all text-amber-50"

    return(
        <div className="w-full flex flex-col items-center justify-start h-full  border-r border-[#5A6148]  text-primary font-medium gap-4  mb-4 bg-[#5A6148]/10"> 
            
            <div className="flex flex-col flex-1 justify-center items-center bg-white h-40 w-40 rounded-full mt-4 border border-[#5A6148]">
                <IoBagCheckSharp size={42} color='black' className='flex '/>
                <Link className="font-bold text-2xl " to='/'>
                    <span className='bg-primary bg-clip-text text-transparent select-none'>PASO</span>
                    <span className='bg-secondary bg-clip-text text-transparent select-none'>FIRME</span>
                </Link>
                
            </div>
            
            <div className="flex flex-col flex-2 mt-4 w-full  ">
                <Link to='/' className={linktStyle}>
                    <IoHomeOutline />
                    Inicio
                </Link>

                <Link to='/dashboard' className={linktStyle}>
                    <FaRegEdit />
                    Administrar Productos
                </Link>

                <Link to='/dashboard/new' className={linktStyle}>
                    <MdOutlineAddBox />
                    Registrar producto
                </Link>
            </div>    

            <div className="w-full flex  ">
                <button 
                onClick={handleLogout}
                className="flex w-fit hover:cursor-pointer mb-4 pl-4 rounded-sm text-sm items-center gap-2 h-11 text-amber-700"
                > 
                    <TbLogout2 size={22} />
                    Cerrar Sesión
                </button>
            </div>

            
        </div>
    )
}