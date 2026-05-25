import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4} from 'uuid' ;
import { db, storage } from '../../../../services/firebaseConnection';
import type { ImageProps, ListImageProps } from '../types/image';
import { addDoc, collection } from 'firebase/firestore';
import type { FormData } from '../components/form';

interface upLoadImageProps{
    image:File;
    uid:string;
}

// función para cargar una imagen en Storage
export async function upLoadImage({image, uid}:upLoadImageProps):Promise<{
    uidImage:string;
    uid:string;
    url:string;
    previewUrl:string;
}> {
    const uidImage = uuidv4();
    const upLoadRef =ref(storage,`images/${uid}/${uidImage}`);
    const snapshot =await uploadBytes(upLoadRef, image);
    const downloadUrl = await getDownloadURL(snapshot.ref);

    return {
        uidImage,
        uid,
        url:downloadUrl,
        previewUrl: URL.createObjectURL(image)
    }
}

//función para eliminar una imagen del Storage
export async function deleteImage({image, uid}:{image:ImageProps, uid:string} ):Promise<void> {
    const imageRef = ref(storage, `images/${uid}/${image.uidImage}`);
    await deleteObject(imageRef)
}

//función para cargar un producto en la Base de Datos Firestore

export async function upLoadProduct(data:FormData, shoesListImage:ListImageProps[], uid:string):Promise<void>{
    await   addDoc(collection(db, 'shoes'),{
            modelo:data.modelo.trim().toUpperCase(),
            calceMin:data.calceMin,
            calceMax:data.calceMax,
            precio:data.precio,
            estado:data.estado,
            color:data.color,
            descripcion:data.descripcion,
            descripcionCorta:data.descripcionCorta,
            created: new Date(),
            uid:uid,
            imagenes:shoesListImage,
        })
}

