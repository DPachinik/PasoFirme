import { FiUpload } from "react-icons/fi";
import { DashboardHeader } from "../../../components/panelheader";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {  z } from 'zod';
import { Input } from '../../../components/input/index';
import type { ChangeEvent } from "react";
import toast from "react-hot-toast";
import { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/auth/authContext'
import { db, storage } from '../../../services/firebaseConnection'
import { getDownloadURL, uploadBytes, ref, deleteObject } from 'firebase/storage'
import { v4 as uuidv4} from 'uuid' 
import { addDoc, collection } from "firebase/firestore";
import { ImagePreview } from "../../../components/ImagePreview";

const schema = z.object({
    modelo:z.string().trim().nonempty('campo obligatorio'),
    calceMin:z.string().trim().nonempty('campo obligatorio'),
    calceMax:z.string().trim().optional(),
    descripcionCorta:z.string().trim().nonempty('campo obligatorio'),
    descripcion:z.string().trim().nonempty('campo obligatorio'),
    color:z.string().nonempty('campo obligatorio'),
    precio:z.string().trim().nonempty('campo obligatorio'),
    estado:z.enum(['En stock', 'Agotado', 'Novedades']),
})

type FormData = z.infer<typeof schema>

const labelStyle = "text-xs font-medium  text-primary"
const containerStyle = "flex flex-col gap-1 w-full"


 export interface ImageProps{
    uidImage:string;
    uid:string;
    url:string;
    previewUrl:string;

}

export function New(){

    const {uid} = useContext(AuthContext);

    const{ register, handleSubmit, formState:{errors}, reset }=useForm<FormData>({
        resolver:zodResolver(schema),
        mode:'onChange'
    })

    const [shoeImages, setShoeImages] = useState<ImageProps[]>([])

    function onSubmit(data: FormData){
        if (shoeImages.length === 0){
            toast('Adjunte imágenes del producto', {
                icon: '⚠️',
            });
            return;
            
        }
        
        const shoesListImage = shoeImages.map(item=>{
            return {
                uid:item.uid,
                idImage:item.uidImage,
                url:item.url
            }
        })

        addDoc(collection(db, 'shoes'),{
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
        .then(()=>{
            reset();
            setShoeImages([]);
            toast.success('Producto registrado exitosamente')
        })
        .catch((error)=>{
            console.log('error:' + error);
        })

    }

    async function handleFile(e:ChangeEvent<HTMLInputElement>){

        if (shoeImages.length >= 4) {
            toast.error('Máximo 4 imágenes',{style:{backgroundColor:'#ff2323', color:'#ffff'}});
            return;
        }      
  
        if(e.target.files && e.target.files[0]){
            const image = e.target.files[0];

            if(image.type === 'image/jpeg' || image.type === 'image/png'){
                
                await handleUpLoad (image)

            }else{
                toast.error('el formato debe ser png o jpeg')
                return
            }
        }
    }

     async function handleUpLoad (image:File){
        if(!uid){
            return;
        }

        const uidImage = uuidv4();

        const uploadRef = ref(storage,`images/${uid}/${uidImage}`);
        uploadBytes(uploadRef, image)
        .then((snapshot)=>{
            getDownloadURL(snapshot.ref).then((downloadUrl)=>{
                const imageItem = {
                    uidImage:uidImage,
                    uid:uid,
                    url:downloadUrl,
                    previewUrl: URL.createObjectURL(image)
                }

                setShoeImages((images)=>[...images, imageItem])
            })
        }) 

        
    }

    async function handleDeleteImage(image:ImageProps){
        const uidImage =image.uidImage;
        const uid = image.uid;
        const imagePath = `images/${uid}/${uidImage}`

        const imageRef = ref (storage, imagePath);

        try{
            await deleteObject(imageRef);
            setShoeImages(shoeImages.filter(car=> car.uidImage !== uidImage ))
        }
        catch(error){
            console.log('error:' + error)
        }
        

    }


    return(
        <div className="grid grid-cols-1 md:grid-cols-[0.5fr_2fr] gap-1 bg-white/80 h-100dvh">
            
                <div className="w-full">
                    <DashboardHeader />
                </div>            
                
                <div className="flex flex-col my-4 ">
                    
                    <div className="w-full border border-[#3F4336] border-b-0 rounded-t-lg max-w-4xl mx-auto py-1 pl-4  text-white">
                        <h2 className={labelStyle}>REGISTRAR NUEVO PRODUCTO</h2>
                    </div>

                    <div className="w-full max-w-4xl  flex flex-col mx-auto border border-[#3F4336] rounded-b-lg">

                        <div className="flex gap-2 w-full max-w-4xl mx-auto px-10  rounded-t-lg pt-4">

                            <button className="w-25 h-30  border rounded-lg flex items-center justify-center ">
                                <FiUpload size={30} color="black" className="absolute cursor-pointer"/>
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="opacity-0 cursor-pointer" 
                                    onChange={handleFile}
                                />
                            </button>

                            <div className="grid grid-cols-4 w-full gap-2 ">

                                {[0,1,2,3].map((index)=>(
                                    <ImagePreview 
                                        key={index}
                                        image={shoeImages[index]}
                                        onDelete={()=>handleDeleteImage(shoeImages[index])}
                                    />
                                ))}
                            </div>

                        </div>


                        <form 
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-2 mx-auto  my-4 w-full max-w-3xl ">

                            <div className=" p-2 rounded-lg flex flex-col gap-2 w-full ">
                                <div className={containerStyle}>
                                    <label className={labelStyle}>MODELO</label>
                                    <Input 
                                    type="text"
                                    name="modelo"
                                    placeholder="Zapato punta fina"
                                    register={register}
                                    error={errors.modelo?.message}
                                    />

                                </div>
                                <div>
                                    
                                </div>


                                <div className="flex gap-2">
                                    <div className={containerStyle}>
                                        <label  className={labelStyle}>CALCE MÍN</label>
                                        <select id="min" 
                                        required
                                        {...register('calceMin')}
                                        name="calceMin"
                                        className="border border-[#3F4336]outline-none rounded-sm h-7"
                                        >
                                            <option>37</option>
                                            <option>38</option>
                                            <option>39</option>
                                            <option>40</option>
                                            <option>41</option>
                                            <option>42</option>
                                            <option>43</option>
                                            <option>44</option>
                                        </select> 
                                    </div>
                                    <div className={containerStyle}>
                                        <label  className={labelStyle}>CALCE MÁX</label>
                                        <select id="min" 
                                        {...register('calceMax')}
                                        name="calceMax"
                                        className="border border-[#3F4336] outline-none rounded-sm h-7"
                                        >
                                            <option></option>
                                            <option>37</option>
                                            <option>38</option>
                                            <option>39</option>
                                            <option>40</option>
                                            <option>41</option>
                                            <option>42</option>
                                            <option>43</option>
                                            <option>44</option>
                                        </select> 
                                    </div>

                                    <div className={containerStyle}>
                                        <label className={labelStyle}>PRECIO</label>
                                        <Input 
                                        type="text"
                                        name="precio"
                                        placeholder="250.000"
                                        register={register}
                                        error={errors.precio?.message}
                                        />

                                    </div>

                                </div>
                            </div>

                            <div className=' w-full px-2 rounded-lg flex flex-col gap-1 py-2'>
                                <p className={labelStyle}>DESCRIPCIÓN CORTA </p>
                                <textarea
                                className=" w-full max-w-3xl text-xs border border-[#3F4336] h-10 outline-none px-2 pt-2 rounded-lg"
                                id="descriptionCorta"
                                {...register('descripcionCorta')}
                                placeholder="Zapato punta fina elegante, estilo italiano de cuero vacuno... "
                                />
                            </div>
                            
                            <div className=' w-full px-2 rounded-lg flex flex-col gap-1 py-2'>
                                <p className={labelStyle}>DESCRIPCIÓN</p>
                                <textarea
                                className=" w-full max-w-3xl text-xs border border-[#3F4336] h-24 outline-none px-2 pt-2 rounded-lg"
                                id="descripcion"
                                {...register('descripcion')}
                                placeholder="Zapato casual para hombre, Diseño X, estilo Y de cuero vacuno... "
                                />
                            </div>

                            <div className="flex gap-12 items-center"> 
                                <div className=" p-2 rounded-lg">
                                    <p className={labelStyle}>ESTADO DEL PRODUCTO</p>
                                    <div className="flex gap-4 border border-[#3F4336] w-fit p-2 rounded-lg mt-1 text-slate-600 text-xs">
                                        <label className="text-center flex items-center gap-2 ">
                                            <p>En stock</p>
                                            <input
                                            type="radio"
                                            value='En stock'
                                            {...register('estado')}
                                            name='estado'
                                            />
                                        </label>
                                        <label className="text-center flex items-center gap-2">
                                            <p>Agotado</p>
                                            <input
                                            type="radio"
                                            value='Agotado'
                                            {...register('estado')}
                                            name='estado'
                                            className="cursor-pointer"
                                            />
                                        </label>
                                        <label className="text-center flex items-center gap-2">
                                            <p>Novedades</p>
                                            <input
                                            type="radio"
                                            value='Novedades'
                                            {...register('estado')}
                                            name='estado'
                                            className="cursor-pointer"
                                            />
                                        </label>
                                    </div>
                                </div>

                                <div className=''>
                                    <label className={labelStyle}>COLOR</label>
                                    <Input 
                                    type="color"
                                    name="color"
                                    register={register}
                                    error={errors.modelo?.message}
                                    />
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-primary text-white rounded-sm h-6 font-semibold text-SM hover:cursor-pointer hover:bg-amber-700 transition-all ">Registrar</button>

                            
                        </form>

                    </div>
                </div>


        </div>
    )

}