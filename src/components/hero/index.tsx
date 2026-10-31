import { FaArrowRightLong } from 'react-icons/fa6';
import Details from './components/details';
import {HeroData} from '../../Data/hero';
import {Swiper, SwiperSlide} from 'swiper/react';
import {  useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import type { Swiper as SwiperCore } from 'swiper';

export function Hero(){

    const location = useLocation();

    const swiperRef = useRef<SwiperCore | null>(null);

    useEffect(()=>{
        if(!swiperRef.current) return;

        let targetIndex = 0;
        if(location.pathname.includes('/accesorios')){
            targetIndex = 1;
        }
        if(location.pathname.includes('/sport')){
            targetIndex = 2;
        }

        swiperRef.current.slideTo(targetIndex);
    },[location.pathname])

    return(
        <Swiper
        slidesPerView={1}
        style={{
                '--swiper-pagination-color': '#E86343', // Color del punto activo
                '--swiper-pagination-bullet-inactive-color': '#ffffff', // Color de los puntos inactivos
                '--swiper-pagination-bullet-inactive-opacity': '0.5', // Opacidad de los inactivos
            } as React.CSSProperties}
        onSwiper={(swiper)=>{
            swiperRef.current =swiper;
        }}
        >
   
                {HeroData.map((slide, i)=>{
                    return(
                    <SwiperSlide
                    key={i}
                    >
                    <header className='relative flex flex-col justify-center gap-4 bg-black'>
                        <section className='flex flex-col bg-[#082F36]/60'>
                            <div className='flex flex-col sm:flex-row  w-full h-[500px] sm:h-[350px] lg:h-[450px]  overflow-hidden'>

                                {/* Columna de Texto */}
                                <div className='flex flex-col flex-1 px-4 z-20 mt-6 sm:mt-10 space-y-4'>
                                    <div className='flex flex-col space-y-4 '>              
                                        <div className='w-full flex items-center gap-3'>
                                            <div className='w-[50px] h-px bg-secondary '></div>
                                            <p className='w-full bg-white bg-clip-text text-secondary font-medium text-sm lg:text-lg font-bebas'>{slide.collection}</p>
                                        </div>
                                        
                                        <div className='w-full text-4xl sm:text-3xl xl:text-5xl font-bebas font-semibold'>
                                            <div className='leading-7.5 xl:leading-11.5 '>
                                                <p className='sm:max-w-full text-white'>{slide.title}</p>
                                                <p className='sm:max-w-full text-secondary'>{slide.subTitle}</p>
                                            </div>

                                            <p className='text-sm  text-crema mt-4 font-light text-wrap max-w-[90%] '>
                                                {slide.description}
                                                <span>{slide.subDescription}</span> 

                                            </p>
                                        </div>
                                    </div>

                                    <div className='hidden xl:block relative bg-[#C00000] w-fit h-fit mt-6 rounded ml-0 cursor-pointer mb-8'> 
                                      
                                        <button 
                                                type="button"
                                                onClick={() => {
                                                    const element = document.getElementById('productos');
                                                    if (element) {
                                                        element.scrollIntoView({ behavior: 'smooth' });
                                                    }
                                                }}
                                                className='relative flex items-center justify-center gap-2 p-2 px-4 w-fit font-bebas rounded text-nowrap text-white text-base bg-[#E86343]/90 hover:cursor-pointer border-none z-50'
                                            >
                                                COMPRAR AHORA 
                                                <FaArrowRightLong className='text-sm md:text-base'/>
                                        </button>

                                        {/* capa flotante*/}
                                        <div className='absolute -top-1 left-0 p-2 border-2 border-[#C14426] h-12 w-[194px] rounded z-0 animate-pin pointer-events-none'></div>
                                    </div> 

                                    <div className='flex   w-full max-w-xl gap-4 sm:gap-0 justify-between mt-4 '>

                                        {slide.icons.map((item,index)=>(
                                            <Details
                                            key={index} 
                                            icon={item.icon} 
                                            textTop={item.iconTextTop} 
                                            textBottom={item.iconTextBottom}/>  
                                        ))}

                                    </div>
                                </div>

                                {/* Columna de la Imagen */}
                                <div className='flex-1 relative flex items-end justify-center md:justify-end h-[475px] sm:h-full  w-full'>
                                        <img 
                                            src={slide.image} 
                                            alt="Zapato de cuero premium 100% nacional"
                                            className=' w-full  absolute -bottom-20  right-10 object-cover   object-bottom lg:scale-120  z-10'
                                        />

                                </div>

                            </div>
                        </section>
                    </header>
                </SwiperSlide>                    
                )})}


        </Swiper>
       
    );
}