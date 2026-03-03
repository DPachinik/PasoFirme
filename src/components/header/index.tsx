import { Aside } from '../../components/aside';
import  zapato  from '/zapato.png'
import { IoIosArrowForward, IoIosStar } from 'react-icons/io';
import { MdDiscount } from 'react-icons/md';


export function Header(){
    return(
        <header className='flex flex-col justify-center    mx-auto gap-4 mt-4 '>
                    
            <div className=' relative flex flex-col border-y border-[#2A4D4E] shadow-[0_-8px_10px_-10px_rgba(255,255,255,0.3)] '>

                <div className=' flex   w-full h-[200px] md:h-[300px] '>

                    <div className="absolute  inset-0 bg-linear-to-tr from-white/10 to-[#2A4D4E]/50 backdrop-blur"></div> 

                    <div className='   w-full flex flex-col mt-2 sm:pl-10  pl-2 z-20'>

                        <div className='  w-full  flex  flex-col  z-30 '>
                                    
                                    <div className='w-full flex items-center md:mt-4 gap-3 '>

                                        <p className=' text-white font-bold text-2xl sm:text-3xl md:text-4xl  '>Elegancia en cada paso  </p>
                                    </div>

                                    <p className='text-xs md:text-lg font- text-white  '>Calzado masculino en cuero premium 100% nacional</p>
                        </div>

                        <div className='relative flex   w-fit  sm:flex-row  sm:justify-start sm:items-center sm:gap-4 mt-4 border border-[#E86343]  px-4 py-1 gap-2'>
                            
                            <p className='text-2xl md:text-4xl font-semibold text-white  pl-1 '>Hasta  </p>
                            <p className='text-secondary text-2xl md:text-4xl text-center  md:text-start font-bold'>40% OFF </p>
                            <MdDiscount  color='#E86343' className='absolute -right-4 top-0  text-xl md:text-2xl'/>
                        </div>

                        <div className='w-fit flex flex-col items-start  md:flex-row md:items-center  gap-2 mt-4 md:mt-12  '>

                            <a 
                            href='#productos'
                            className='flex  items-center justify-center gap-2 p-1 px-4 w-fit bg-linear-to-t to-[#E86343] via-[#E86343] from-[#C14426] font-medium rounded shadow text-nowrap text-white text-sm '>
                                Ver colección 
                                <IoIosArrowForward className='text-sm md:text-lg' />
                            </a>

                            <div className='flex gap-2 items-center text-white text-sm md:text-lg '>
                                <span className='font-semibold '>+5.000 </span>

                                <p className='text-sm text-nowrap'>clientes satisfechos</p>

                                <div className='flex items-center'>
                                    <IoIosStar size={18} color='#FFCE1B' />
                                    <IoIosStar size={18} color='#FFCE1B' />
                                    <IoIosStar size={18} color='#FFCE1B' />
                                    <IoIosStar size={18} color='#FFCE1B' />
                                    <IoIosStar size={18} color='#FFCE1B' />
                                </div>
                            </div>

                        </div>
                        

                        

                    </div>
                            

            
                    <div className='absolute  right-0 flex w-full   justify-end '>
                            <img src={zapato} className=' w-3xs md:w-sm lg:w-lg' /> 
                    </div>
                                                        
                </div>
                

            </div>
            <Aside />                     
        </header>
    )
}