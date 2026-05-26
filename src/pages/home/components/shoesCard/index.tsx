import { useState } from "react"
import { Link } from "react-router-dom"
import type { Product } from "../../../../features/products/types/product";

    const estadoColors:Record<string, string>={
    'Novedades': 'bg-white text-primary',
    'Pocas unidades': 'bg-secondary text-white',
    'Agotado': 'bg-[#ff0000] text-white'
    }

export function ShoesCard({products}:{products:Product[]}){

    const [loadImage, setLoadImage] = useState<string[]>([]);

    function handleImageLoad(id:string){
        setLoadImage((prevImage)=>[...prevImage, id])
    }

    return(
        <>
        {products.map((product)=>(
                        <article 
                        key={product.id}
                        className="relative max-w-[75%] sm:max-w-[80%] md:max-w-[90%] h-[380px] rounded-lg  flex flex-col items-center">

                
                            <div 
                            className='w-full min-w-[250px] min-h-[200px] bg-slate-200 rounded-t-lg animate-pulse '
                            style={{display:loadImage.includes(product.id)? 'none':'block'}}
                            >
                            </div>


                            <div  style={{display:loadImage.includes(product.id)? 'block':'none'}} className=''  >
                                <div className='relative w-full max-w-[250px] min-h-[200px]  rounded-t-lg bg-white/15 px-4 '>
                                    
                                        <img 
                                        className=" h-[200px] w-[250px] rounded-t-lg   object-contain  sm:p-4 "
                                        src={product.imagenes[0].url} 
                                        onLoad={()=>handleImageLoad(product.id)} 
                                        decoding='async'
                                        alt={product.modelo}                   
                                        />


                                        <div className={`absolute top-2 left-2  rounded text-white px-2 py-1 font-medium text-xs  ${estadoColors[product.estado]} `}>
                                            {product.estado}
                                        </div>
                                    
                                </div>
                            </div>

                            <section className='absolute top-[190px] h-[200px] w-full max-w-[250px] flex flex-col   px-3 rounded-xl  bg-white ' >
                                    
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

                                    <div className='text-xs sm:text-[12px] text-[#2A4D4E]  mt-3'>{product.descripcionCorta}</div>

                                    <div className="flex h-full items-end justify-between  mb-4 ">
                                        <div className='flex flex-col'>
                                            <span className=' text-xs sm:text-[11px] font-bold text-primary'>PRECIO</span>
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

                            </section>
                                                        
                        </article>
                    ))}
        </>
    )
}
