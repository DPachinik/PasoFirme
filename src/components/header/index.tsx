import { FaArrowRightLong } from 'react-icons/fa6';
import  zapato  from '/oxford.webp'


export function Header(){
    return(
        <header className='flex flex-col justify-center   gap-4  bg-black'>
                    
            <section className=' relative flex flex-col  bg-[#082F36]/60  '>

                <div className=' flex  justify-between w-full  h-[400px] sm:h-[300px] max-w-7xl mx-auto'>

                    <div className='  flex flex-col mt-4 sm:mt-0 sm:pl-10  pl-2 z-20'>

                        <div className='  flex  flex-col space-y-2 sm:space-y-4'>               
                                    <div className='w-full flex items-center md:mt-4 gap-3 '>
                                        <p className='w-full text-secondary font-medium text-sm '>NUEVA COLECCIÓN 2026 </p>
                                    </div>
                                    <div className='w-full font-semibold text-4xl lg:text-5xl'>
                                        <p className='sm:max-w-full text-white '>DISEÑADOS </p>
                                        <p className='sm:max-w-full text-white '> PARA DESTACAR</p>
                                        <p className='text-base text-crema mt-2 font-light text-wrap max-w-[250px] lg:max-w-full '>Calzado masculino en cuero premium 100% nacional</p>
                                    </div>
                        </div>

                        <div className='relative bg-[#C00000] w-fit h-fit mt-8 rounded ml-2 sm:ml-0 '> 
                            <a href='#productos'
                            className=' flex  items-center justify-center  gap-2 p-2 px-2 w-fit   font-medium rounded  text-nowrap text-white text-base bg-[#E86343]/70 z-30'>
                                    COMPRAR AHORA 
                                    <FaArrowRightLong className='text-sm md:text-base'/>
                            </a>

                            <div className='absolute -top-1 border-2 border border-[#C14426] h-12 w-[174px] rounded z-0 animate-pin'> 

                            </div>
                        </div> 

                    </div>

                    <div className='absolute bottom-0 right-0 md:static w-60 px-2 sm:mx-8 sm:w-80 '>
                        <img 
                        src={zapato} 
                        alt="zapato"
                        className='drop-shadow-lg drop-shadow-black'
                        />
                    </div>                             
                </div>
                
            </section>
                  
        </header>
    )
}