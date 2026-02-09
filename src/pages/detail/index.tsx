import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useContext} from 'react'
import { CartContext } from '../../contexts/cart/CartContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseConnection';
import { FaCheck } from 'react-icons/fa';


export interface ProductsProps{
    id:string;
    modelo:string;
    calceMin:string;
    calceMax?:string;
    precio:number;
    color:string;
    estado:string;
    descripcion:string;
    imagenes:ImageProps[];
}

type ImageProps ={
    idImage:string;
    uid:string;
    url:string;
}




export function Detail(){
    const { id }= useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState<ProductsProps>();

    const {addItemCart}=useContext(CartContext)

    useEffect(()=>{
        async function productDetail(){ 
            if(!id){
                return;
            } 

            const productRef = doc(db, 'shoes', id);
             getDoc(productRef)
             .then((snapshot)=>{
                setProduct({
                    id:snapshot.id,
                    modelo:snapshot.data()?.modelo,
                    calceMin:snapshot.data()?.calceMin,
                    calceMax:snapshot.data()?.calceMax,
                    precio:Number(snapshot.data()?.precio),
                    color:snapshot.data()?.color,
                    estado:snapshot.data()?.estado,
                    descripcion:snapshot.data()?.descripcion,
                    imagenes:snapshot.data()?.imagenes
                })
             }) 

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

    if(!product){
        
       return <h2>Cargando Producto</h2>
    }

    return(

        
        <main  className=" w-full max-w-7xl px-4 mx-auto flex items-center justify-center ">
            <section className='grid grid-cols-2 mt-8 w-full place-items-center' >
                <div className='flex  flex-col gap-4'>
                    <div className='grid grid-cols-2 gap-4 max-w-lg 0 mx-auto'>
                        {product?.imagenes.map((imagen)=>(
                            <div key={imagen.idImage} className='flex h-38 w-48 items-center justify-center rounded-lg'>
                                <img 
                                src={imagen.url} 
                                alt='calzado de cuero'
                                className='w-full h-full rounded-lg object-cover hover:scale-125 transition-all'
                                />
                            </div>
                        ))}
                    </div>

                    <div className=' pb-2 pl-8 flex flex-col gap-2 mt-2'>
                        <h2>Características  </h2>
                        <ul className='text-sm'>
                            <li className='flex items-center gap-2'><FaCheck color="green" /> Materiales duraderos pensados para acompañarte por mucho tiempo</li>
                            <li className='flex items-center gap-2'><FaCheck color="green" /> Estilo moderno y funcional, ideal para cualquier ocasión</li>
                            <li className='flex items-center gap-2'><FaCheck color="green" /> Sensación de comodidad continua gracias a su diseño ergonómico</li>
                            <li className='flex items-center gap-2'><FaCheck color="green" /> Modelos originales que marcan la diferencia</li>
                            <li className='flex items-center gap-2'><FaCheck color="green" /> Fácil de cuidar y diseñado para resistir el uso diario</li>

                        </ul>
                    </div>
                </div>
               

               

                <div className='h-full mb-4 flex flex-col  p-4 bg-amber-50  justify-evenly w-full max-w-[75%] rounded-lg shadow '>

                    <h1 className='uppercase text-2xl font-bold'> {product.modelo}</h1>

                    <div className='flex text-xl'>
                        <strong>{product?.precio.toLocaleString('es-PY',{
                            style:'currency',
                            currency:'PYG'
                        })}</strong>
                    

                    </div>

                    <div className='flex flex-col gap-4 '>

                        <div className='flex flex-col '>
                            <span>TAMAÑOS DISPONIBLES:</span>
                            <span>{product.calceMin} - {product.calceMax} </span>
                        </div>
                            

                        <div className='flex items-center gap-4'>
                            <span>COLOR:</span>
                            <span className='h-4 w-4 rounded-full' style={{backgroundColor:product.color}}></span>
                        </div>

                    </div>

                            

                    <div className='flex flex-col '>
                        <span>DESCRIPCIÓN DEL CALZADO:</span>
                        <span>{product.descripcion}</span>
                    </div>
                            
                    <div className='w-full  flex items-center justify-center '>
                        <button onClick={() => product && handleAddItemCart(product)} className="bg-secondary p-1 rounded  w-full max-w-sm flex items-center justify-center gap-4 px-2 cursor-pointer">
                            añadir al carrito
                        </button>
                    </div>
                        
                            

                </div>
                    
    


            </section>
        </main>
    )
}