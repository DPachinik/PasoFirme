import { Link } from "react-router-dom";
import { PiInstagramLogo } from "react-icons/pi";
import { FaFacebookF } from "react-icons/fa";
import logo from '../../../public/logo.png'

export default function Footer(){
    return(
        <section className=" bg-black  flex ">
            <div className="relative h-full bg-[#082F36]/60 w-full flex flex-col p-4 md:px-12">
                <div className="flex flex-col md:flex-row">
                    <div className="flex flex-col ">
                        <Link className=" relative flex font-bold text-2xl text-crema mt-4" to='/'>

                            <div className='w-12 text-wrap font-bold  leading-none '>
                                <p className='  select-none hover:tracking-widest duration-300'>Paso</p>
                                <p className='  select-none hover:tracking-widest duration-300 pl-6'>Firme</p>
                            </div>
                            
                            <img 
                            src={logo} 
                            className='absolute left-11 w-10 bg-transparent'
                            loading='lazy'
                            decoding='async'
                            alt='logotipo'
                            />
                        </Link>  
                        <div className="mt-4 space-y-2 text-crema text-sm  w-full hidden md:flex md:flex-col">
                            <p>Calzados que combinan diseño,</p>
                            <p>comodidad y rendimiento.</p>
                            <p>Hechos para acompañarte siempre.</p>
                        </div>  

                    </div>

                    <div className="flex flex-col  items-center flex-1 mt-8 space-y-4 text-white">
                        <h2 className="mb-6 font-medium">TIENDA</h2>
                        <Link to='/' className="hover:text-[#E86343]">Clásicos</Link>
                        <Link to='/accesorios' className="hover:text-[#E86343]">Accesorios</Link>
                        <Link to='/sport' className="hover:text-[#E86343]">Sport</Link>
                    </div>
                </div>


                <div className="flex flex-col md:flex-row justify-between items-center mt-8 md:mx-8 gap-4">
                    <div className="flex gap-4 items-center text-gray-400">
                       <Link to=''>
                        <PiInstagramLogo size={34} className="hover:text-[#E86343] hover:scale-105 transition-all duration-300"/>
                       </Link>
                       
                       <Link to=''>
                        <FaFacebookF size={26} className="hover:text-[#E86343] hover:scale-105 transition-all duration-300"/>
                       </Link>

                    </div>

                    <p className="text-gray-400 text-center">Todos los derechos reservados @PasoFirme 2026</p>
                </div>

            </div>
           
        </section>
    )
}