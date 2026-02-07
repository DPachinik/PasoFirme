import { DashboardHeader } from "../../components/panelheader";
import { useState, useEffect, useContext } from 'react'
import {getDocs, collection, query, where, doc, deleteDoc} from 'firebase/firestore'
import {db, storage} from '../../services/firebaseConnection'
import { AuthContext } from "../../contexts/auth/authContext";
import {  BiTrash } from "react-icons/bi";
import { deleteObject, ref } from "firebase/storage";


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


export function Dashboard(){

    const {uid} = useContext(AuthContext);

    const[products, setProducts] = useState<ProductsProps[]>([]);
    const[loadImage, setLoadImage] = useState<string[]>([]);
    
    
        useEffect(()=>{
            async function getProducts(){
                
                const productsRef = collection(db, 'shoes');
                const queryRef = query(productsRef, where('uid', '==' , uid))
    
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
        },[uid])
    
        function handleImageLoad(id:string){
            setLoadImage((prevImage)=>[...prevImage, id])
        }


        async function handleDelete(product: ProductsProps){

            const docRef = doc(db,'shoes',product.id)           
            await deleteDoc(docRef);

            product.imagenes.map(async (image)=>{
                const imagePath = `images/${uid}/${image.idImage}`
                const imageRef = ref(storage, imagePath);

                try{
                    await deleteObject(imageRef)

                }catch(error){
                    console.log('error:' + error)
                }
            })

            setProducts(products.filter(item=>item.id !== product.id))
        }


    return(
        <div className="grid grid-cols-1 md:grid-cols-[0.5fr_2fr]  bg-white/80 h-full md:h-screen ">

                <div className="w-full">
                    <DashboardHeader />
                </div>    

            <section className="flex flex-col gap-4 px-2">
                <h1 className="text-center mt-4 text-primary font-bold uppercase">Inventario de Productos</h1>
                <table className="w-full  ">
                    <thead className="h-10 border-separate">
                        <tr className="bg-[#3F4336]/80 uppercase text-[12px] text-white md:text-base">
                            
                            <th className="rounded-tl-xl rounded-bl-lg ">Producto</th>
                            <th>Modelo</th>
                            <th>Calce-Mín/Máx</th>
                            <th>Precio</th>
                            <th>Estado</th>
                            <th className="rounded-tr-lg rounded-br-lg">Eliminar</th>

                        </tr>
                    </thead>

                    <tbody className="text-[11px] md:text-base">
                        {uid && products.map((product)=>(
                     
                            <tr key={product.id} className="text-center  border-b h-[110px] ">
                                <td className="p-0 m-0 ">
                                    <div className="w-full h-full flex justify-center items-center  ">
                                        <img 
                                        className="w-30 h-20 rounded-lg bg-primary mb-2 object-cover "
                                        src={product.imagenes[0].url} alt="producto"
                                        onLoad={()=>handleImageLoad(product.id)} 
                                        style={{display:loadImage.includes(product.id)? 'block':'none'}}                   
                                        />

                                    </div>
                                </td>
                                <td>{product.modelo}</td>
                                <td >{product.calceMax?`${product.calceMin} | ${product.calceMax} `: product.calceMin}</td>
                                <td>
                                    <span className="">
                                            {product.precio.toLocaleString("es-PY",{
                                                style:'currency',
                                                currency:'PYG'
                                            })}
                                    </span>
                                </td>
                                <td>{product.estado}</td>
                                <td className="">
                                    <div className="w-full h-full flex items-center justify-center">
                                        <button 
                                        className="cursor-pointer"
                                        onClick={()=>handleDelete(product)}
                                        >
                                            <BiTrash size={22} color="#ff2323" />
                                        </button>
                                        
                                    </div>
                                </td>

                            </tr>
                        
                        ))}
                   </tbody>

                </table>
                
            </section>
        </div>
    )
}