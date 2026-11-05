import {  useEffect, useContext, useState } from 'react'
import { Hero} from '../../components/hero';
import { InputSearch } from '../../components/InputSearch/InputSearch';
import { MdKeyboardDoubleArrowDown } from 'react-icons/md';
import { ProductsContext } from '../../features/products/context/ProductsContext';
import { ShoesCard } from './components/shoesCard';
import { ButtonMore } from './components/buttonMore';
import { ButtonProducts } from './components/buttonProducts';
import { Banner } from '../../components/banner';
import SubBanner from '../../components/subBanner';
import Footer from '../../components/footer';
import CartHome from './components/carthome';
import { CartContext } from '../../features/cart/CartContext';
import {  useNavigate, useParams, useSearchParams } from 'react-router-dom';



export function Home(){

    const { route }= useParams();
    const [searchParams]=useSearchParams();
    const busqueda = searchParams.get('busqueda');

    const navigate = useNavigate();  
    const { products,isFiltered, loadInitialProducts, lastDoc, loading ,empty, searchProducts, productsByCategory} = useContext(ProductsContext)
    const {cart} = useContext(CartContext)
    const [scrollActive, setScrollActive]= useState(false);
    const [path, setPath]=useState<string |null>(null)

    
    function handleScroll(){
        if(window.scrollY>10){
           setScrollActive(true)
        }else{
            setScrollActive(false)
        }
    }





    useEffect(()=>{

        function routes(route:string | undefined, busqueda:string | null) {
        if(!route){
            return navigate('/');
        }
        


        //llamar la variable para ambos casos
        setPath(route);

        if(busqueda){
            console.log(`Buscando por parametro:${busqueda}`)
            searchProducts(busqueda)
            
        }else{
            console.log(`llamando a los productos en la ruta:${route}`)
            loadInitialProducts(route);
        }

        //Condición de Scroll para navegación directa a grid de 'Productos'
        function moveScroll(){

           const isProduct = !! productsByCategory[route];
            

            if(isProduct){
                window.scrollBy(0, 500);
            }
        }

        moveScroll();

        }


        routes(route, busqueda);

        window.addEventListener('scroll', handleScroll)

        return ()=>window.removeEventListener('scroll', handleScroll)
    },[ route, busqueda])

    return(
        <div>
            <Hero/>

            <div className=''>
                <div className='arrow-container'>
                    <MdKeyboardDoubleArrowDown size={50}  color='#082F36' className='arrow' />
                </div>
     
                <h1 
                id="productos" 
                className="  font-bebas  text-base  mb-4 text-center text-primary ">NUESTRA COLECCIÓN</h1>

                <div className='w-full max-w-[80%] flex  items-center justify-center mx-auto gap-8 lg:hidden'>
              
                    <InputSearch />

                </div>
            </div>

            <main className="w-full max-w-7xl  mx-auto z-0 px-2 mt-14  flex flex-col" >
                <section className=" grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4   place-items-center " >
                    {loading && products.length===0 ?(
                        Array.from({length:8}).map((_,index)=>(
                            <article key={index} className="w-[250px] h-[380px] bg-slate-100 border border-slate-200 animate-pulse rounded-lg mb-12 flex flex-col p-4 justify-between">
                                <div className="w-full h-[180px] bg-slate-300 rounded-lg"></div>
                                <div className="w-3/4 h-5 bg-slate-300 rounded mt-4"></div>
                                <div className="w-full h-12 bg-slate-200 rounded mt-2"></div>
                                <div className="w-1/2 h-6 bg-slate-300 rounded mt-4"></div>
                            </article>
                        ))
                ):(
                    <ShoesCard products ={products} />
                )}

                </section>
                
                <div className='w-full flex items-center justify-center mx-4'>
                    { lastDoc && path && <ButtonMore path={path} />}
                </div>

                <div className='w-full flex items-center mx-8 '>
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

                <div className=' mb-14 w-full max-w-7xl mx-auto  md:px-6 lg:px-10'>
                    <Banner />
                    <SubBanner />
                </div>

                <Footer />

                {  cart.length>0 && scrollActive && (
                    <div className='w-full bg-[#C00000] fixed bottom-0 sm:hidden'>
                        <CartHome cart ={cart}/>
                    </div>
                ) }

        </div>
    )
}