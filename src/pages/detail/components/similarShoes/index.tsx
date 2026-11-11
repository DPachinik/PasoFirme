import {Swiper, SwiperSlide} from 'swiper/react';
import {useContext, useEffect} from 'react'
import { ProductsContext } from '../../../../features/products/context/ProductsContext';
import { Link } from 'react-router-dom';


export function SimilarShoes({modelo}:{modelo:string}){

    const {similar}= useContext(ProductsContext);

    useEffect((

    )=>{},[])

    return(
        <Swiper
    //     breakpoints={{
    //     0: { slidesPerView: 1.3, spaceBetween: 20 },
    //     768: { slidesPerView: 1.4, spaceBetween: 15 },
    //     1024: { slidesPerView: 5, spaceBetween: 20 },
    // }}
    slidesPerView={'auto'}
        spaceBetween={20}
        grabCursor
        className='w-full mb-10'
        >
        {similar.map((product,i)=>(
        <SwiperSlide 
        key={i}
        className='h-auto max-w-[200px] '
        >
                
            <article className=' relative w-[200px]  shadow bg-white rounded overflow-hidden'>
                <span className='absolute top-1 left-1 bg-secondary text-white text-sm  px-2  rounded z-50'>- 40%</span>

                    <img 
                    src={product.imagenes[0].url} 
                    alt={modelo}
                    className='w-full h-[200px] object-contain bg-white px-4 hover:scale-105'
                    />

                <section className='pl-2 flex flex-col   text-primary bg-white '>
                    <span className='text-gray-600 text-xs font-bold mb-2'>{product.categoria}</span>
                    <p className='mb-4' > {product.modelo}</p>
                    <span className='border border-slate-600 w-fit p-0.5 px-1 text-[12px] font-bold  rounded-sm mb-4 '>
                        {product.calceMax
                            ? `BRA ${product.calceMin} | ${product.calceMax}`
                            :`BRA ${product.calceMin}`}
                    </span>
                    <strong className="text-secondary text-sm sm:text-lg mb-2">
                        {product.precio.toLocaleString("es-PY",{
                            style:'currency',
                            currency:'PYG'
                        })}
                    </strong>
                </section>

          <div className="w-full bg-[#C00000]">
            <Link to={`/detail/${product.categoria}/${product.id}`}
             className="bg-[#E86343]/80  text-white text- text-nowrap py-2   w-full font-bebas flex flex-1 items-center justify-center gap-4  cursor-pointer"
            >
             ver detalles 
            </Link>

          </div>

            </article>
            </SwiperSlide>
        ))}
       </Swiper>

    )
}