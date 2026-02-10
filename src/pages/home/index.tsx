import { useState, useEffect, useContext } from 'react'
import { CartContext } from '../../contexts/cart/CartContext'
import { Link } from 'react-router-dom'
import  Toast  from 'react-hot-toast';
import { Header } from '../../components/header';
import {getDocs, collection, query, orderBy} from 'firebase/firestore'
import {db} from '../../services/firebaseConnection'


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


export function Home(){

    const {addItemCart} = useContext(CartContext)

    const[products, setProducts] = useState<ProductsProps[]>([]);
    const[loadImage, setLoadImage] = useState<string[]>([]);


    useEffect(()=>{
        async function getProducts(){
            
            const productsRef = collection(db, 'shoes');
            const queryRef = query(productsRef, orderBy('created', 'desc'))

            getDocs(queryRef)
            .then((snapshot)=>{
                const list = [] as ProductsProps[];

                snapshot.forEach((product)=>{
                    list.push({
                        id:product.id,
                        modelo:product.data().modelo,
                        calceMin:product.data().calceMin,
                        calceMax:product.data().calceMax,
                        precio:Number(product.data().precio),
                        color:product.data().color,
                        estado:product.data().estado,
                        descripcion:product.data(). descripcion,
                        imagenes:product.data().imagenes,

                    })
                })

                setProducts(list)

           
            })
            .catch((error)=>{
                console.log('error:' + error);
            })
        }

        getProducts();
    },[])



    function handleAddItemCart(product:ProductsProps){
        addItemCart(product)
        Toast.success('Producto añadido al carrito',{
            style:{background:'#121212',color:'#ffff'}
        })
    }

    function handleImageLoad(id:string){
        setLoadImage((prevImage)=>[...prevImage, id])
    }

    return(
        <div className='mx-2'>

            <Header />
            <main className="w-full max-w-7xl  mx-auto  mb-4">
                
                <h1 className="font-bold text-2xl mt-10 mb-4 text-center text-primary">Productos Destacados</h1>

                <div className=" grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-2 place-items-center">
                    {products.map((product)=>(
                        <section 
                        key={product.id}
                        className="relative w-full max-w-xs lg:max-w-[90%] h-[380px] bg-amber-300 rounded-lg  flex flex-col items-center">


                            <div 
                            className='w-full min-h-[200px] bg-slate-100 rounded-t-lg'
                            style={{display:loadImage.includes(product.id)? 'none':'block'}}
                            >

                            </div>
                            <div className='w-full min-h-[200px]  rounded-t-lg  '>
                                <Link to={`/detail/${product.id}`}>
                                    <img 
                                    className="w-full h-full rounded-t-lg bg-primary mb-2 object-cover "
                                    src={product.imagenes[0].url} alt="producto"
                                    onLoad={()=>handleImageLoad(product.id)} 
                                    style={{display:loadImage.includes(product.id)? 'block':'none'}}                   
                                    />

                                </Link>
                            </div>

                            <div className='absolute top-[180px] h-[200px] w-full flex flex-col   px-3 rounded-xl border bg-amber-50'>
                                
                                <div className='flex flex-col'>
                                    <p className="font-bold mt-2 mb-2 text-black/80 uppercase">{product.modelo}</p>
                                    <div className='flex flex-row items-start gap-2 text-gray-500 font-medium '>
                                        <div className="border border-gray-500 w-fit p-0.5 px-1 text-[10px] font-bold  rounded-sm ">
                                            {product.calceMax
                                                ? `BRA ${product.calceMin} | ${product.calceMax}`
                                                :`BRA ${product.calceMin}`}
                                        </div>


                                        <div className='flex  gap-2 border w-fit  p-0.5 px-1 text-[10px] font-bold rounded-sm uppercase items-center'>
                                            <span >Color</span>
                                            <span className='w-3 h-3  rounded-full' style={{backgroundColor:product.color}} />
                                        </div>


                                    </div>
                                </div>

                                <div className='text-sm text-gray-600  mt-3'>{product.descripcion}</div>

                                <div className="flex h-full items-end justify-between  mb-4 ">
                                    <div className='flex flex-col'>
                                        <span className='text-[11px] font-bold text-gray-600'>PRECIO</span>
                                        <strong className="text-secondary text-lg">
                                            {product.precio.toLocaleString("es-PY",{
                                                style:'currency',
                                                currency:'PYG'
                                            })}
                                        </strong>
                                    </div>


                                    <button onClick={()=>handleAddItemCart(product)} className="bg-primary p-1 px-2 rounded cursor-pointer text-sm font-medium text-white">
                                        añadir al carrito
                                    </button>
                                </div>

                            </div>

                           
                            
                        </section>
                    ))}
                </div>
            </main>
        </div>
    )
}