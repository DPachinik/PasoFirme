import { BiImageAdd } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";
import type { ImageProps } from "../../types/image";

interface ImagePreviewProps{
    image?:ImageProps;
    onDelete:()=>void;
}


export function ImagePreview({image, onDelete}:ImagePreviewProps){

    const layoutShift ="flex  rounded-lg bg-[#2A4D4E]"


    return(
        <div className={ layoutShift }> 
        {image?(

            <div className="relative w-full ">

                <img 
                src={`${image.previewUrl}`} 
                className="w-full h-30  rounded-lg"
                loading="lazy"
                decoding="async"
                alt="producto"
                />

                <button 
                className="absolute right-2 top-1 cursor-pointer bg-secondary-rel rounded-full p-1"
                onClick={onDelete}
                >
                    <FiTrash2 size={20} color="white" />

                </button>
                
            </div>
                                            
            ):(
            <div className="w-full h-full flex items-center justify-center ">
                <BiImageAdd size={30} color="#ffff" className="flex" />
            </div>    
                                            
            )}
        
        </div>
    )
}
