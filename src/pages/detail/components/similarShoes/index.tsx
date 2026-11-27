import {Swiper, SwiperSlide} from 'swiper/react';
import {useContext} from 'react'
import { ProductsContext } from '../../../../features/products/context/ProductsContext';
import { Link } from 'react-router-dom';


export function SimilarShoes({modelo}:{modelo:string}){

    const {similar}= useContext(ProductsContext);

    return(
        <div>
            {similar.length>0 && (
                <h2 className='text-2xl font-Poppins text-title mb-6 mt-10'>Productos Relacionados</h2>
            )}
            <Swiper
            slidesPerView={'auto'}
            spaceBetween={20}
            grabCursor
            className='w-full mb-10'
            >
            {similar.map((product,i)=>(
            <SwiperSlide 
            key={i}
            className='h-auto max-w-[200px]'
            >
                    
                <article className="rounded-lg bg-white hover:bg-white  p-2  font-Poppins shadow ">
                    <span className='absolute top-1 left-1 bg-black font-semibold text-white text-sm  px-2  rounded z-50 animate-pulse'>40% OFF</span>

                    <div className='relative w-full h-[95px]  rounded-t-md  overflow-hidden'>
                        <img 
                        src={product.imagenes[0].url} 
                        alt={modelo}
                        className=" w-full h-full object-contain object-center  hover:scale-110 transition-all duration-200 "
                        />                
                    </div>    


                    <section className='pl-2 flex flex-col   text-title bg-white '>
                        <p className="text-[14px] font-semibold mt-4 text-gray-700 " > {product.modelo}</p>

                        <strong className="my-2 flex items-center justify-between ">
                            {product.precio.toLocaleString("es-PY",{
                                style:'currency',
                                currency:'PYG'
                            })}
                        </strong>
                    </section>

            <div className="w-fit bg-active rounded-md mt-4 ml-auto">
                <Link to={`/detail/${product.categoria}/${product.id}`}
                className=" text-white text- text-nowrap py-1 px-2   w-full  flex flex-1 items-center justify-center gap-4  cursor-pointer "
                >
                    
                    Detalles 
                </Link>

            </div>

                </article>
                </SwiperSlide>
            ))}
        </Swiper>
        </div>
    )
}