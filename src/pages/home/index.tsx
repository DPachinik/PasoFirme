import {  useEffect, useContext, useState } from 'react'
import { Hero} from '../../components/hero';
// import { InputSearch } from '../../components/InputSearch/InputSearch';
// import { MdKeyboardDoubleArrowDown } from 'react-icons/md';
import { ProductsContext } from '../../features/products/context/ProductsContext';
import { ShoesCard } from './components/shoesCard';
import { ButtonMore } from './components/buttonMore';
import { ButtonProducts } from './components/buttonProducts';
import { Banner } from '../../components/banner';
import SubBanner from '../../components/subBanner';
import Footer from '../../components/footer';
// import CartHome from './components/carthome';
import { CartContext } from '../../features/cart/CartContext';
import {  useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Header } from '../../components/header';
import { Skeleton } from './components/shoesCard/skeleton';
import { CaretRightIcon } from '@phosphor-icons/react';
import { MobileNavbar } from '../../components/navbar/lowerNavbar';
import { AuthContext } from '../../features/auth/authContext';



export function Home(){

    const { route }= useParams();
    const [searchParams]=useSearchParams();
    const busqueda = searchParams.get('busqueda');
    const search = !!busqueda;

    const navigate = useNavigate();  
    const { products,isFiltered, loadInitialProducts, lastDoc, loading ,empty, searchProducts, cached} = useContext(ProductsContext);
    const {cart} = useContext(CartContext);
    const {signed, loadingAdmin} = useContext(AuthContext);
    // const [scrollActive, setScrollActive]= useState(false);
    const [path, setPath]=useState<string |null>(null);
    

    
    // function handleScroll(){
    //     if(window.scrollY>10){
    //        setScrollActive(true)
    //     }else{
    //         setScrollActive(false)
    //     }
    // }

    


    useEffect(()=>{

        function routes(route:string | undefined, busqueda:string | null) {
        if(!route){
            return navigate('/');
        }
        
        //llamar la variable para ambos casos
        setPath(route);

        if(busqueda){
            console.log(`Buscando por parametro:${busqueda}`)
            moveScroll();
            searchProducts(busqueda);
            
        }else{
            console.log(`llamando a los productos en la ruta:${route}`)
            loadInitialProducts(route);
        }

        //función de scroll directo a grid de 'Productos': navegación entre páginas
        function moveScroll(){

            if(cached || search){
                document.getElementById('productos')?.scrollIntoView({
                    block:'start',
                });
            }
        }
        moveScroll();

        }


        routes(route, busqueda);

        // window.addEventListener('scroll', handleScroll)

        // return ()=>window.removeEventListener('scroll', handleScroll);

    },[ route, busqueda, cached])

    return(
        <div className=' w-full max-w-[480px] h-100dvh  '>
            <Header />
            <Hero/>

            {/* <div className='mb-4 lg:mb-12'>
                <div className='arrow-container'>
                    <MdKeyboardDoubleArrowDown size={50}  color='#082F36' className='arrow' />
                </div>
     
                <p 
                id="productos" 
                className="    text-xl font-bebas   mb-4 text-center text-primary font-bold ">Nuestros Productos</p>


            </div> */}


            <div className='pl-2 sm:pl-8 text-title flex gap-2 font-Poppins items-center'>
                <CaretRightIcon size={16} className='text-title' />
                {path}
            </div>


            <main className="w-full max-w-7xl  mx-auto z-0  mt-2 flex flex-col " >
                <section className="grid grid-cols-2 md:grid-cols-3 gap-x-[9px] gap-y-3 px-2.5" >
                    {loading && products.length===0 ?(
                       <Skeleton />
                        ):(
                        <ShoesCard products ={products} path={path} />
                    )}

                </section>
                
                <div className='w-full flex items-center justify-center '>
                    { lastDoc && path && <ButtonMore path={path} />}
                </div>

                <div className='w-full flex items-center'>
                            { isFiltered && path && (
                                <ButtonProducts  />
                            )}

                            { empty && (
                                <div className='flex mb-4'>

                                <p className='text-primary text-lg font-bebas   mb-4'>¡HAS LLEGADO AL FINAL DE LA LISTA!</p>

                                </div>

                            )}
                </div>

            </main>

                <div className=' mb-14 w-full max-w-7xl mx-auto  md:px-6 lg:px-10 '>
                    <Banner />
                    <SubBanner />
                </div>

                <Footer />

                
                    <div className=' w-full bg-fondo fixed bottom-0 px-3.5 max-w-[480px] mx-auto sm:hidden'>
                        <MobileNavbar cart={cart} signed={signed} loadingAdmin={loadingAdmin}   />
                    </div>
           

        </div>
    )
}