import {  useEffect, useContext } from 'react'
import { Header } from '../../components/header';
import { InputSearch } from '../../components/InputSearch/InputSearch';
import { MdKeyboardDoubleArrowDown } from 'react-icons/md';
import { ProductsContext } from '../../features/products/context/ProductsContext';
import { ShoesCard } from './components/shoesCard';
import { ButtonMore } from './components/buttonMore';
import { ButtonProducts } from './components/buttonProducts';

export function Home(){

    const { products,isFiltered, loadInitialProducts } = useContext(ProductsContext)

    useEffect(()=>{
        loadInitialProducts();
    },[])

    return(
        <div>
            <Header />

            <div className='boder-2 border-amber-400'>
                <div className='arrow-container'>
                    <MdKeyboardDoubleArrowDown size={50}  color='#2A4D4E' className='arrow' />
                </div>
     
                <h1 id="productos" className="  font-medium text-2xl  mb-4 text-center text-secondary ">Productos Destacados</h1>

                <div className='w-full flex flex-col items-center justify-center mx-auto  my-4'>
                    <InputSearch />
                    <div className='w-full   flex items-center justify-center  rounded-lg  pl-4 '>
                        { isFiltered && (
                            <ButtonProducts />
                        )}
                    </div>
                </div>
            </div>

            <main className="w-full max-w-7xl  mx-auto z-0 px-2 ">
                <section className=" grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-4 place-items-center mb-4">
                    <ShoesCard products ={products} />
                </section>
            </main>

            <ButtonMore />
        </div>
    )
}