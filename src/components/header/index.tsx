import { Aside } from '../../components/aside';
import  zapato  from '../../assets/zapato.png'
import { IoBagCheckSharp } from 'react-icons/io5';
import { IoIosArrowDown } from 'react-icons/io';

export function Header(){
    return(
         <header className='flex flex-col md:flex-row justify-center  mt-6 max-w-7xl  mx-auto bg-white rounded-2xl p-4 '>
                    <Aside />

                    <div className=' relative  flex flex-1/2 w-full  '>

                        <div className='flex w-full mt-4 md:mt-0 justify-end'>
                          <img src={zapato} className=' max-w-xs object-cover  rounded-tr-2xl opacity-60 md:opacity-100' /> 
                        </div>
                        

                        <div className='absolute top-4 left-8'>
                            <div className='flex items-end gap-4'>
                                <IoBagCheckSharp size={42} color='black' className='flex '/>
                                <h2 className=' text-primary font-bold text-2xl lg:text-4xl'>TU TIENDA ONLINE  </h2>
                            </div>

                            <p className='text-lg font-bold text-secondary'>DESCUBRE PRODUCTOS A PRECIOS INCREIBLES</p>
                        </div>

                        <div className='absolute bottom-4  md:bottom-1/4 left-8 md:left-1/4 rounded-full w-20 h-20 md:h-30 md:w-30 bg-red-600 p-4 flex justify-center items-center '>
                            <p className=' text-white text-center font-medium text-xs md:text-base '>
                                    AHORRA HASTA <span className='font-bold text-xl md:text-3xl'>40%</span>
                            </p>
                        </div>

                        <button className='absolute bottom-2 left-36  px-4 p-1 rounded-2xl flex justify-center items-center  bg-black hover:bg-primary hover:cursor-pointer transition-all gap-2'>
                            <p className=' text-white text-center font-semibold text-xs '>
                                    COMPRAR AHORA 
                            </p>
                            <IoIosArrowDown size={24} color='white' />
                        </button>

                        
                    </div>
                     
            </header>
    )
}