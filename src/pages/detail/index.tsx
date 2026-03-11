import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useContext} from 'react'
import { CartContext } from '../../contexts/cart/CartContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseConnection';
import { IoIosStar } from "react-icons/io";
import type { ProductsProps } from '../home';
import { FaArrowsRotate } from "react-icons/fa6";


export function Detail(){
    const { id }= useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState<ProductsProps>();
    const [loadImage, setLoadImage] = useState<string[]>([])
    const [selectedSize,setSelectedSize]= useState<number | null>(null);
    const [mainImage,setMainImage]= useState<string>();

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
                    imagenes:snapshot.data()?.imagenes,
                })

                if(snapshot.data()?.imagenes?.length){
                    setMainImage(snapshot.data()?.imagenes[0].id)
                }
             }) 

        };

        productDetail();
    },[id]);


        function handleAddItemCart(product:ProductsProps){

            if(!selectedSize){
                toast.error('seleccione un talle');
                return;
            }

            addItemCart({
                ...product,
                talle: selectedSize
            });

            toast.success('Producto añadido al carrito',{style:{backgroundColor:'#ffff', color:'#0B2D2E'}
            })

        navigate('/cart')
    }

    function handleLoadImage(id:string){
        setLoadImage(prevImage=>[...prevImage, id])
    }

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

    const min = Number(product.calceMin);
    const max = product.calceMax? Number(product.calceMax):null;
    let tamaños: number [] = [];

    if(max && max>= min){
        const cantidad = max - min +1;
        tamaños =Array.from({length:cantidad}, (_, i)=> min + i );
    }else{
        tamaños=[min];
    }

    const oderedImages = [...product.imagenes].sort((a,b)=>{
        if(a.idImage === mainImage) return -1
        if(b.idImage === mainImage) return 1
        return 0
    })


    return(

        
        <main  className="  w-full  max-w-7xl  mx-auto flex items-center justify-center ">

            <section className='flex flex-col md:flex-row justify-between w-full  gap-8  mt-4  rounded-lg ' >
                
                <div className=' w-full flex-1 px-4 '>
                    <div className="grid grid-cols-3 gap-4">
                        {oderedImages.map((imagen, index) => {

                            const isLoaded = loadImage.includes(imagen.idImage);

                            return (
                                <div
                                key={imagen.idImage}
                                onClick={()=>setMainImage(imagen.idImage)}
                                className={`relative w-full rounded-lg  border border-[#2A4D4E] bg-[#2A4D4E] overflow-hidden 
                                ${index === 0 ? "col-span-3 h-70" : "h-40 hover:border-[#E86343] cursor-pointer"} `}
                                >

                                    {!isLoaded && (
                                    <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                                    )}


                                    <img
                                    className={`w-full h-full object-contain transition-opacity duration-300
                                    ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"} hover:scale-110 hover:transition-all duration-150`}
                                    src={imagen.url}
                                    onLoad={() => handleLoadImage(imagen.idImage)}
                                    decoding='async'
                                    alt={product.modelo}
                                    />
                                </div>
                            );
                        })}
                    </div>

                </div>

                <div className='w-full flex-1 '>

                    <div className='w-full  flex flex-col   rounded-lg px-4 '>

                        <h1 className=' text-3xl font-bold text-white text-nowrap'> {product.modelo}</h1>
                                <div className='flex items-center'>
                                    <IoIosStar size={18} color='#FFCE1B' />
                                    <IoIosStar size={18} color='#FFCE1B' />
                                    <IoIosStar size={18} color='#FFCE1B' />
                                    <IoIosStar size={18} color='#FFCE1B' />
                                    <IoIosStar size={18} color='#FFCE1B' />
                                </div>

                        <div className='flex  '>
                            <strong className="text-secondary-rel text-2xl">{product?.precio.toLocaleString('es-PY',{
                                style:'currency',
                                currency:'PYG'
                            })}</strong>
                        
                        </div>

                        
                        <div className='w-full flex flex-col mt-4 '>
                            <span className='font-bold text-white text-xl'>Descripción</span>
                            <p className='text-base md:text-sm text-white/60'>{product.descripcion}</p>
                        </div>

                        <div className='flex flex-col gap-1 mt-4'>
                                <span className='font-bold text-white text-xl'>Color</span>
                                <span className='h-4 w-4 rounded-full ' style={{backgroundColor:product.color}}></span>
                        </div>

                        <div className='flex flex-col  mt-4'>

                            <div className='flex flex-col gap-1'>
                                <span className='font-bold  text-xl text-white'>Tamaños</span>
                                <div className='flex gap-2'>
                                    {tamaños.map((size)=>(
                                    <button
                                    key={size}
                                    className=" px-3 py-1 rounded border border-[#2A4D4E] text-[#2A4D4E] cursor-pointer hover:bg-[#2A4D4E] hover:text-white transition-all"
                                    onClick={()=>setSelectedSize(size)}
                                    style={selectedSize === size?{backgroundColor:'#2A4D4E', color:'white'}:{}}
                                    >
                                        {size}
                                    </button>
                                ))}</div>
                            </div>
                                

                        </div>

                            
                    </div>
                    
                    <div className='w-full flex flex-col md:flex-row px-4  items-center justify-center gap-4 mt-4  md:max-w-[90%]  my-4'>

                            <button 
                            onClick={() => product && handleAddItemCart(product)} 
                            className="bg-linear-to-t to-[#E86343] via-[#E86343] from-[#C14426]  text-white py-2   w-full font-medium flex flex-1 items-center justify-center gap-4 px-2 cursor-pointer  rounded ">
                                Añadir al carrito
                            </button>

                            <Link 
                            to='/'
                            className='w-full flex flex-1'
                            >

                            <button  className="bg-linear-to-t to-[#2A4D4E] via-[#0B2D2E] from-[#B2D2E] border border-[#2A4D4E] text-white font-medium  py-2   w-full flex flex-1 items-center justify-center gap-4 px-2 cursor-pointer rounded  ">
                                Ver más
                            </button>
                            </Link>
                    </div>
                </div>    
            </section>

        </main>
    )
}