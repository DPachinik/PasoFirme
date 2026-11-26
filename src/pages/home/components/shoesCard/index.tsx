import { useState } from "react"
import { Link } from "react-router-dom"
import type { Product } from "../../../../features/products/types/product";
import { HeartIcon } from "@phosphor-icons/react";

    const estadoColors:Record<string, string>={
    'Novedades': 'bg-active text-white ',
    'Pocas unidades': 'bg-dark text-white',
    'Agotado': 'bg-black text-white'
    }

export function ShoesCard({products, path}:{products:Product[], path:string | null}){

    const [loadImage, setLoadImage] = useState<string[]>([]);

    function handleImageLoad(id:string){
        setLoadImage((prevImage)=>[...prevImage, id])
    }

    return(
        <>
        {products.map((product)=>(
                        <article 
                        key={product.id}
                        className="rounded-lg bg-white hover:bg-white  p-2  font-Poppins shadow ">

                            { path === 'clásicos' && (
                                <div className={` rounded text-white px-2 py-1 mt-2 font-medium text-xs  w-fit  ${estadoColors[product.estado]} `}>
                                    {product.estado}
                                </div>                                    
                            )}

                            {/* //skeleton de imagen */}
                            <div 
                            className=' w-full h-[90px] bg-secondary rounded-t-md animate-pulse '
                            style={{display:loadImage.includes(product.id)? 'none':'block'}}
                            >
                            </div>


                            <div  style={{display:loadImage.includes(product.id)? 'block':'none'}} className=''>
                                <Link to={`/detail/${product.categoria}/${product.id}`} >


                                    <div className='relative w-full h-[95px]  rounded-t-md  overflow-hidden'>
                                        
                                            <img 
                                            className=" w-full h-full object-contain object-center   hover:scale-110 transition-all duration-200 "
                                            src={product.imagenes[0].url} 
                                            onLoad={()=>handleImageLoad(product.id)} 
                                            decoding='async'
                                            alt={product.modelo}                   
                                            />                            
                                    </div>

                                    
                                </Link>

                                
                            </div>

                            <p className="text-[14px] font-semibold mt-4 text-gray-700 ">{product.modelo}</p>

                            <div className="my-2 flex items-center justify-between text-basic">
                                <span className="text-base font-semibold">
                                {product?.precio.toLocaleString("es-PY", {
                                    style: "currency",
                                    currency: "PYG",
                                })}
                                </span>
                                    <HeartIcon size={18} weight="fill" className="text-olive" />
                            </div>                                    
                        </article>
                    ))}
        </>
    )
}
