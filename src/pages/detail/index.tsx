import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import { api } from '../../services/api';
import type { ProductsProps } from '../home';
import {useContext} from 'react'
import { CartContext } from '../../contexts/cart/CartContext';
import toast from 'react-hot-toast';
import { BsCartPlus } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom'


export function Detail(){
    const { id }= useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState<ProductsProps>();

    const {addItemCart}=useContext(CartContext)

    useEffect(()=>{
        async function productDetail(){  
                const response = await api.get(`products/${id}`)
                setProduct(response.data);
                console.log(response.data)

        };

        productDetail();
    },[id]);


        function handleAddItemCart(product:ProductsProps){
        addItemCart(product)
        toast.success('Producto añadido al carrito',{
            style:{background:'#121212',color:'#ffff'}
        })

        navigate('/cart')
    }

    return(
        <main  className="w-full max-w-7xl px-4 mx-auto ">
            <section className='grid grid-cols-2 mt-8 place-items-center' >
                <img
                src={product?.cover}
                alt={product?.title}
                className='w-full max-w-9/12 h-90 object-fill object-center'
                />

                <div className='flex flex-col gap-4 py-4'>

                    <h1 className='text-xl font-medium '>{product?.title}</h1>
                    <p>{product?.description}</p>
                    <div className='flex items-center justify-between w-fit gap-6 px-2'>
                        <strong>Precio: {product?.price.toLocaleString('es-PY',{
                            style:'currency',
                            currency:'PYG'
                        })}</strong>
                    <button onClick={() => product && handleAddItemCart(product)} className="bg-zinc-900 p-1 rounded">
                        <BsCartPlus size={20} color="#ffff"/>
                    </button>
                    </div>

                </div>


            </section>
        </main>
    )
}