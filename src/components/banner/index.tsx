import { Link } from 'react-router-dom'
import zapato from '../../../public/zapato.png'

export function Banner(){
    return(
        <div className="flex w-full h-40  overflow-hidden   bg-[#C00000] md:rounded ">
            <section className="  relative w-full h-full flex  items-center bg-[#E86343]/40 lg:pl-20">

                <div className='flex flex-col text-white justify-center w-fit h-[90%] ml-4 sm:ml-14 sm:border-r pr-14   '>
                    <span className='text-base '>HASTA</span>
                    <strong className='text-4xl md:text-5xl text-nowrap animate-pulse'>40% OFF</strong>
                    <span className='text-base font- md:text-nowrap'>EN CUERO Y ACCESORIOS</span>
                </div>

                <div className=' flex w-full h-full justify-start   items-center flex-1  '>

                    <div className='hidden md:flex w-fit h-fit bg-black  items-center justify-center rounded  mt-10 ml-4  mb-4 lg:ml-30'>
                        <Link to='/sport' className='text-white text-base text-nowrap  w-full text-center bg-[#082F36]/40 px-2 py-2'> VER DEPORTIVOS</Link>
                    </div>

                    <div className='overflow-hidden absolute -right-14 -top-5 lg:-right-5 lg:-top-18'>
                        <img 
                        src={zapato} 
                        alt="zapato"
                        className='w-80  md:w-75 lg:w-120'
                        />
                    </div>
                </div>
            </section>            
        </div>
    )
}