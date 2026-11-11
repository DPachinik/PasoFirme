import { Link, useParams } from 'react-router-dom';
import { banerContent } from '../../Data/banner'
import {Swiper, SwiperSlide} from 'swiper/react';
import {  useLocation } from 'react-router-dom';
import type { Swiper as SwiperCore } from 'swiper';
import { useEffect, useRef } from 'react';
import { CaretRightIcon } from '@phosphor-icons/react';

export function Banner(){
    const location = useLocation();
    const {route} = useParams();
    const swiperRef = useRef<SwiperCore | null>(null);

        let others = '';
        switch(route){
        case 'clásicos': 
            others='sport';
            break;
        case 'sport':
            others='accesorios';
            break;
        case 'accesorios':
            others='clásicos';
            break;
       }

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
            {
                banerContent.map((data, i)=>(
                    <SwiperSlide
                    key={i}
                    >
                        <div className="flex w-full h-40 md:h-50  overflow-hidden   bg-linear-to-r from-[#C00000] via-[#C00000] to-[#C00000]/10 md:rounded">

                            <section className="  relative w-full h-full flex  items-center bg-[#E86343]/40 ">

                                <div className='flex  flex-col text-white justify-center  h-[90%] pl-4 sm:pl-20 md:mr-20     '>
                                    <span className='text-sm'>HASTA</span>
                                    <strong className='text-5xl md:text-7xl text-nowrap animate-pulse'>{data.oferta}</strong>
                                    <span className='text-base font- md:text-nowrap'>EN {others.toLocaleUpperCase()} </span>
                                </div>

                                <div className=' relative flex-1 w-full h-full justify-start   items-center   '>

                                    <div className='absolute top-[40%] left-[10%] md:left-0 w-fit h-fit bg-black  items-center justify-center rounded   z-50 scale-75 sm:scale-100'>
                                        <Link to={`/${others}`} className='flex text-white text-base text-nowrap  w-full text-center bg-[#082F36]/40 px-2 py-2'> VER {others.toLocaleUpperCase()}
                                                        <CaretRightIcon size={24} />
                                        </Link>
                                    </div>

                                    <div className='flex h-full w-full  max-w-2xl overflow-hidden clip ml-auto '>
                                        <img 
                                        src={data.image} 
                                        alt="zapato"
                                        className='w-full h-full  object-cover object-bottom  '
                                        />
                                    </div>
                                </div>
                            </section>            
                        </div>            
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}