import {  useEffect, useContext, useState } from 'react'
import { Header } from '../../components/header';
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

export function Home(){

    const { products,isFiltered, loadInitialProducts, lastDoc, loading } = useContext(ProductsContext)
    const {cart} = useContext(CartContext)

    const [scrollActive, setScrollActive]= useState(false);


    function handleScroll(){
        if(window.scrollY>10){
           setScrollActive(true)
        }else{
            setScrollActive(false)
        }
    }

    useEffect(()=>{
        loadInitialProducts();

        window.addEventListener('scroll', handleScroll)

        return ()=>window.removeEventListener('scroll', handleScroll)
    },[])

    return(
        <div>
            <Header />

            <div className=''>
                <div className='arrow-container'>
                    <MdKeyboardDoubleArrowDown size={50}  color='#082F36' className='arrow' />
                </div>
     
                <h1 id="productos" className="  font-medium text-2xl  mb-4 text-center text-secondary ">Nuestra Colección</h1>

                <div className='w-full max-w-[80%] flex  items-center justify-center mx-auto gap-8 lg:hidden'>
              
                    <InputSearch />

                </div>
            </div>

            <main className="w-full max-w-7xl  mx-auto z-0 px-2 mt-14  flex flex-col">
                <section className=" grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4   place-items-center " id='shoes'>
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
                
                <div className='w-full flex items-center justify-center '>
                    { !lastDoc && <ButtonMore />}
                </div>

                <div className='w-full flex items-center justify-center '>
                            { isFiltered && (
                                <ButtonProducts />
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