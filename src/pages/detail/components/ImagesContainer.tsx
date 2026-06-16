import { useState } from "react";
import type { Product } from "../../../features/products/types/product";


export function ImageContainer({product}:{product:Product}){

    const [mainImage,setMainImage]= useState<string|null>(null);
    const [loadImage, setLoadImage] = useState<string[]>([])

    const oderedImages = [...product.imagenes].sort((a,b)=>{
        if(a.uidImage === mainImage) return -1
        if(b.uidImage === mainImage) return 1
        return 0
    })

        function handleLoadImage(id:string){
        setLoadImage(prevImage=>[...prevImage, id])
    }
    return(
        <>
         {oderedImages.map((imagen, index) => {

                            const isLoaded = loadImage.includes(imagen.uidImage);

                            return (
                                <div
                                key={imagen.uidImage}
                                onClick={()=>setMainImage(imagen.uidImage)}
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
                                    onLoad={() => handleLoadImage(imagen.uidImage)}
                                    decoding='async'
                                    alt={product.modelo}
                                    />
                                </div>
                            );
                        })}
        </>
    )
}