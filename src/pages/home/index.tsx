import { useState, useEffect, useContext } from 'react'
import { CartContext } from '../../contexts/cart/CartContext'
import { useNavigate } from 'react-router-dom'

import { BsCartPlus } from "react-icons/bs";
import {api} from '../../services/api'
import  Toast  from 'react-hot-toast';
import { Header } from '../../components/header';




export interface ProductsProps{
    id:number;
    title:string;
    description:string;
    price:number;
    cover:string;
}



export function Home(){

    const {addItemCart} = useContext(CartContext)
    const  navigate  = useNavigate()
 

    const[products, setProducts] = useState<ProductsProps[]>([]);

    useEffect(()=>{
        async function getProducts(){
            const response = await api.get("/products")
            setProducts(response.data)
        }

        getProducts();
    },[])

    function handleDetail(id:number){
        navigate(`/cart/${id}`)
    }


    function handleAddItemCart(product:ProductsProps){
        addItemCart(product)
        Toast.success('Producto añadido al carrito',{
            style:{background:'#121212',color:'#ffff'}
        })
    }

    return(
        <div className='mx-2'>

            <Header />
            <main className="w-full max-w-7xl  mx-auto  mb-4">
                
                <h1 className="font-bold text-2xl mt-10 mb-4 text-center text-[#3D4035]">Productos Destacados</h1>

                <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 ">
                    {products.map((product)=>(
                        <section 
                        key={product.id}
                        className="w-full  bg-white rounded-lg px-2 flex flex-col ">
                            <img 
                            className="w-full rounded-lg max-h-60 mb-2"
                            src={product.cover} alt="producto"
                        
                            />
                            <div className='w-full flex justify-end'>
                                <span
                                onClick={()=>handleDetail(product.id)}  
                                className='bg-black w-fit text-white text-sm px-2 rounded-xl mb-2 hover:bg-[#3D4035] hover:cursor-pointer transition-all'>ver detalle</span>
                            </div>
                            
                            <div className='h-px w-full max-w-90 bg-[#3D4035] '></div>
                            <p className="font-medium mt-1 mb-2 text-[#3D4035]">{product.title}</p>

                            <div className="flex h-full items-end justify-between gap-3 mb-2  ">
                                <strong className="text-[#8B4513]">
                                    {product.price.toLocaleString("es-PY",{
                                        style:'currency',
                                        currency:'PYG'
                                    })}
                                </strong>

                                <button onClick={()=>handleAddItemCart(product)} className="bg-[#3D4035] p-1 rounded">
                                    <BsCartPlus size={20} color="#ffff"/>
                                </button>
                            </div>
                    </section>
                    ))}
                </div>
            </main>
        </div>
    )
}