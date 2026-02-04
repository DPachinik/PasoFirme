import { BiImageAdd } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";
import type { ImageProps } from "../../pages/dashboard/new";

interface ImagePreviewProps{
    image?:ImageProps;
    onDelete:()=>void;
}


export function ImagePreview({image, onDelete}:ImagePreviewProps){

    const layoutShift ="flex  rounded-lg bg-[#5A6148]/10"


    return(
        <div className={ layoutShift }> 
        {image?(

            <div className="relative w-full ">

                <img src={`${image.previewUrl}`} className="w-full h-30  rounded-lg"/>
                    <button 
                    className="absolute right-2 top-1 cursor-pointer bg-amber-600 rounded-full p-1"
                    onClick={onDelete}
                    >
                        <FiTrash2 size={20} color="white" />

                    </button>
            </div>
                                            
            ):(
            <div className="w-full h-full flex items-center justify-center ">
                <BiImageAdd size={30} color="#3D4035" className="flex" />
            </div>    
                                            
            )}
        
        </div>
    )
}
