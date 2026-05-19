import {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useContext} from 'react'
import { FaArrowsRotate } from "react-icons/fa6";
import { ProductsContext } from '../../features/products/context/ProductsContext';
import { ImageContainer } from './components/ImagesContainer';
import { ProductDetails } from './components/ProductDetails';


export function Detail(){

    const { id }= useParams();
    const navigate = useNavigate(); 
    const {getProduct, product }=useContext(ProductsContext);

    useEffect(()=>{
        function loadProducts (){
            if(!id){
                return navigate('/');
            }
            getProduct(id);
        }

        loadProducts()
    },[id]);

    if(!product){
        
       return (
       <div className='w-full h-screen text-2xl text-secondary flex flex-col items-center justify-center gap-4'>
            <h1>Cargando Producto</h1>

            <div className='container-rotate'>
                <FaArrowsRotate size={30} className='arrow-rotate' />
            </div>       
        </div>
       )
    }

    return(
        <main  className="  w-full  max-w-7xl  mx-auto flex items-center justify-center ">
            <div className='flex flex-col md:flex-row justify-between w-full  gap-8  mt-4  rounded-lg ' >
                
                <section className=' w-full flex-1 px-4 '>
                    <div className="grid grid-cols-3 gap-4">
                       <ImageContainer product={product} />
                    </div>
                </section>

                <section className='w-full flex-1 '>
                    <ProductDetails product={product}/>
                </section>    
            </div>
        </main>
    )
}