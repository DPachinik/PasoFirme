import { useState, type ChangeEvent } from "react";
import type { ImageProps } from "../types/image";
import { deleteImage, upLoadImage, upLoadProduct } from "../services/image.api";
import type { FormData } from "../components/form";

interface FileProps{
    e:ChangeEvent<HTMLInputElement>;
    uid:string| undefined;
}

export function useShoes(){

    const [shoeImages, setShoeImages] = useState<ImageProps[]>([])


    async function handleFile({e, uid}:FileProps) {
        
        try{
            if(!uid){
                return;
            }

            if(shoeImages.length >= 4){
                return;
            }

            if(e.target.files && e.target.files[0]){
            const image = e.target.files[0];

            if(image.type === 'image/jpeg' || image.type === 'image/png'){
                
                const imageItem= await upLoadImage({image, uid})
                setShoeImages((prev)=>[...prev, imageItem])

            }else{
                return
            }
        }

        }catch(err){
            console.log('Error al cargar la imagen:' + err)
        }
    }

    async function handleDeleteImage({image, uid}:{image:ImageProps, uid:string|undefined}) {
        
        try{
            if(!uid){
                return;
            }
            await deleteImage({image,uid})
            setShoeImages(shoeImages=>shoeImages.filter(item=>item.uidImage !== image.uidImage))
        }catch(err){
            console.log(err)
        }
    }

    async function registerProduct(shoeImages:ImageProps[], data:FormData, uid:string|undefined) {
        try{
            if(shoeImages.length ===0){
            return;
            }

            if(!uid){
                return;
            }

            const shoesListImage = shoeImages.map((shoe)=>{
               return{
                uid:shoe.uid,
                uidImage:shoe.uidImage,
                url:shoe.url,
               } 
            })

            await upLoadProduct(data, shoesListImage, uid)
        }catch(err){
            console.log(err)
        }
    }

    return{
    handleFile,
    handleDeleteImage,
    shoeImages,
    registerProduct,
    }
}

