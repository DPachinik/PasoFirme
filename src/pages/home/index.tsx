import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../../components/header';
import { ProductsContext } from '../../contexts/products/ProductsContext';
import { InputSearch } from '../../components/InputSearch/InputSearch';
import { MdKeyboardDoubleArrowDown } from 'react-icons/md';



export interface ProductsProps{
    id:string;
    modelo:string;
    calceMin:string;
    calceMax?:string;
    precio:number;
    color:string;
    estado:string;
    descripcion:string;
    descripcionCorta?:string;
    imagenes:ImageProps[];
}

 export type ImageProps ={
    idImage:string;
    uid:string;
    url:string;
}


export function Home(){

    const { products, getProducts, empty,setEmpty, isFiltered , setIsFiltered, setDoc, loadInitialProducts}= useContext(ProductsContext)

    const[loadImage, setLoadImage] = useState<string[]>([]);
    
    


    useEffect(()=>{
        
        loadInitialProducts();
    },[])

    function TotalProducts(){
        setDoc(null);
        loadInitialProducts();
        setIsFiltered(false)
        setEmpty(false);
    }


    function handleImageLoad(id:string){
        setLoadImage((prevImage)=>[...prevImage, id])
    }


    return(
        <div className=''>

            <Header />
            <main className="w-full max-w-7xl  mx-auto z-0 px-2 ">
                <div className='arrow-container'>
                    <MdKeyboardDoubleArrowDown size={50}  color='#2A4D4E' className='arrow' />
                </div>

                
                <h1 
                id="productos"
                className="  font-bold text-2xl  mb-4 text-center text-secondary-rel text-glow ]">Productos Destacados</h1>


                <div className='flex  w-full px-8  mb-8'>
                    <InputSearch />
                </div>

                <div className='w-full  h-10 flex items-center justify-center  rounded-lg mb-4   pl-4 '>
                    <button 
                    className='bg-linear-to-t to-[#E86343] via-[#E86343] from-[#C14426] text-white px-4 my-12 w-full max-w-3xs rounded-sm font-medium  cursor-pointer'
                    onClick={TotalProducts}
                    style={isFiltered?{}:{display:'none'}}
                    >Ver todos</button>
                </div>

                <div 

                className=" grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center mb-4">
                    {products.map((product)=>(
                        <section 
                        key={product.id}
                        className="relative w-full   sm:max-w-[80%] md:max-w-[90%] h-[380px] rounded-lg  flex flex-col items-center">

                            <div 
                            className='w-full min-h-[200px] bg-slate-100 rounded-t-lg'
                            style={{display:loadImage.includes(product.id)? 'none':'block'}}
                            >

                            </div>

                            <div className='w-full min-h-[200px]  rounded-t-lg  '>
                                
                                    <img 
                                    className="w-full h-full rounded-t-lg border border-[#2A4D4E] mb-2 object-contain  sm:p-4"
                                    src={product.imagenes[0].url} alt="producto"
                                    onLoad={()=>handleImageLoad(product.id)} 
                                    style={{display:loadImage.includes(product.id)? 'block':'none'}}                   
                                    />

                                
                            </div>

                            <div className='absolute top-[190px] h-[200px] w-full flex flex-col   px-3 rounded-xl  bg-white '>
                                
                                <div className='flex flex-col'>
                                    <p className="font-bold mt-2 mb-2 text-primary uppercase">{product.modelo}</p>
                                    <div className='flex flex-row items-start gap-2 text-slate-600 font-medium '>
                                        <div className="border border-slate-600 w-fit p-0.5 px-1 text-[10px] font-bold  rounded-sm ">
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

                                <div className='text-xs sm:text-sm text-slate-600  mt-3'>{product.descripcionCorta}</div>

                                <div className="flex h-full items-end justify-between  mb-4 ">
                                    <div className='flex flex-col'>
                                        <span className=' text-xs sm:text-[11px] font-bold text-slate-600'>PRECIO</span>
                                        <strong className="text-secondary-rel text-sm sm:text-lg">
                                            {product.precio.toLocaleString("es-PY",{
                                                style:'currency',
                                                currency:'PYG'
                                            })}
                                        </strong>
                                    </div>

                                    <Link to={`/detail/${product.id}`}>
                                        <button  className="bg-primary p-1 px-2 rounded cursor-pointer text-xs sm:text-sm font-medium text-white">
                                            ver detalles
                                        </button>
                                    </Link>
                                    
                                </div>

                            </div>                            
                        </section>
                    ))}
                </div>

                <div 
                className='w-full flex justify-center'>
                    <button
                    onClick={getProducts}
                    className='bg-linear-to-t to-[#C14426] via-[#E86343] from-[#C14426] text-white px-4 my-12 w-full max-w-3xs rounded-sm font-medium  cursor-pointer'
                    style={empty || isFiltered?{display:'none'}:{} }
                    >
                        Ver más
                    </button>
                </div>
            </main>
        </div>
    )
}