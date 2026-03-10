import { DashboardHeader } from "../../components/panelheader";
import { useState, useEffect, useContext } from 'react'
import {getDocs, collection, query, where, doc, deleteDoc} from 'firebase/firestore'
import {db, storage} from '../../services/firebaseConnection'
import { AuthContext } from "../../contexts/auth/authContext";
import {  BiTrash } from "react-icons/bi";
import { deleteObject, ref } from "firebase/storage";
import styles from './dashboard.module.css'
import { IoWarningOutline } from "react-icons/io5";
import { FiX } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { ProductsContext } from "../../contexts/products/ProductsContext";


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
    const { updateItem } = useContext(ProductsContext);

    const[products, setProducts] = useState<ProductsProps[]>([]);
    const[loadImage, setLoadImage] = useState<string[]>([]);
    const[openModal, setOpenModal] = useState<boolean>(false);
    const[openStatusModal, setOpenStatusModal] = useState<boolean>(false);
    const[shoe, setShoe]= useState<ProductsProps | null >(null);
    
    
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
                            descripcion:product.data().descripcion,
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
    

        useEffect(()=>{
            if (openModal || openStatusModal) {
                document.body.style.overflow ='hidden';
            }else{
            document.body.style.overflow='auto';
            }
            return()=>{
            document.body.style.overflow='auto';
            }

        },[openModal, openStatusModal]);

        function handleImageLoad(id:string){
            setLoadImage((prevImage)=>[...prevImage, id])
        }



        async function handleDelete(product: ProductsProps){

            const docRef = doc(db,'shoes',product.id)           
            await deleteDoc(docRef);

            await Promise.all(product.imagenes.map(async (image)=>{
                const imagePath = `images/${uid}/${image.idImage}`
                const imageRef = ref(storage, imagePath);

                try{
                    await deleteObject(imageRef)

                }catch(error){
                    console.log('error:' + error)
                }
            }))

            setProducts(products.filter(item=>item.id !== product.id))
        }

        function handleOpenModal(product:ProductsProps){
            setOpenModal(true);
            setShoe(product);
        }

        
        function handleConfirm(){
            if (!shoe){
                return;
            }

            handleDelete(shoe);
            setOpenModal(false);
        }

        function handleCancel(){
            setOpenModal(false);
            setShoe(null);
        }

        function handleStatusOpenModal(product:ProductsProps){
            setOpenStatusModal(true);
            setShoe(product);
        }

        function handleStatusCancel(){
            setOpenStatusModal(false);
            setShoe(null);
        }

        function handleEdit(e:React.FormEvent<HTMLFormElement>){
            e.preventDefault();
            
            if(!shoe) return;

            const formData = new FormData(e.currentTarget);
            const status = formData.get("estado") as string;

            updateItem(shoe, status);

            setOpenStatusModal(false)

            setProducts(prev=>prev.map((item)=>
            item.id === shoe.id? {...item, estado:status}:item
            ));
        }


    return(

        <div className="grid grid-cols-1 md:grid-cols-[0.5fr_2fr]   h-full md:h-screen">

                <div className="w-full">
                    <DashboardHeader />
                </div>    

            <section className="relative flex flex-col gap-4 mt-6  md:mt-0">
                
                <h1 className="text-center mt-4 text-secondary text-2xl font-semibold">Inventario de Productos</h1>

                <table className= {styles.table}>
                    
                    <thead className={styles.thead}>

                        <tr >
                            
                            <th className="rounded-tl rounded-bl">Producto</th>
                            <th>Modelo</th>
                            <th>Calce-Mín/Máx</th>
                            <th>Precio</th>
                            <th>Estado</th>
                            <th className="rounded-tr rounded-br">Acciones</th>

                        </tr>

                    </thead>

                    <tbody>
                        {uid && products.map((product)=>(
                     
                            <tr key={product.id} className={styles.tr}>

                                <td 
                                className={`rounded-tl-lg rounded-bl-lg ${styles.td}`}
                                data-label="PRODUCTO"

                                >

                                    <div className="w-fit h-full flex justify-center items-center   ">
                                        <img 
                                        className="w-30 h-20 rounded-lg  mb-2 object-contain object-center "
                                        src={product.imagenes[0].url} 
                                        onLoad={()=>handleImageLoad(product.id)} 
                                        style={{display:loadImage.includes(product.id)? 'block':'none'}} 
                                        loading="lazy"
                                        decoding="async" 
                                        alt={product.modelo}             
                                        />

                                    </div>

                                </td>

                                <td 
                                className={styles.td}
                                data-label="MODELO"
                                >
                                    {product.modelo}
                                </td>

                                <td 
                                className={styles.td}
                                data-label= "CALCE"
                                >
                                    {product.calceMax?`${product.calceMin} | ${product.calceMax} `: product.calceMin}
                                </td>

                                <td 
                                className={styles.td}
                                data-label="PRECIO"
                                >

                                    <span>
                                            {product.precio.toLocaleString("es-PY",{
                                                style:'currency',
                                                currency:'PYG'
                                            })}
                                    </span>

                                </td>

                                <td 
                                className={styles.td}
                                data-label="ESTADO"
                                >
                                    {product.estado}
                                </td>

                                <td 
                                className={`rounded-tr-lg rounded-br-lg ${styles.td}`}
                                data-label="ACCIONES"
                                >

                                    <div className="w-full h-full flex items-center justify-end  md:justify-center gap-4">
                                        <button 
                                        className="cursor-pointer "
                                        onClick={()=>handleOpenModal(product)} 
                                        >
                                            <BiTrash 
                                            size={24} 
                                            color="#ff2323"
                                            />
                                        </button>
                                        <button 
                                        className="cursor-pointer "
                                        onClick={()=>handleStatusOpenModal(product)} 
                                        >
                                            <FaRegEdit
                                            size={24} 
                                            color="#0B2D2E"
                                            />
                                        </button>
                                        
                                    </div>

                                </td>

                            </tr>
                        
                        ))}
                    </tbody>

                </table>

                <section 
                className={`fixed top-0 inset-0  items-center justify-center bg-black/60 z-50 overflow-x-hidden ${openModal?'flex':' hidden' }`}>

                    <div className=" w-xs rounded bg-white flex flex-col items-center gap-4  p-4 ">
                        <div className="w-full flex justify-end">
                            <FiX 
                            onClick={()=>handleCancel()}
                            className=" text-end  text-lg text-[#2A4D4E] cursor-pointer"/>
                        </div>
                        
                        
                        <IoWarningOutline size={40} color="#C14426" />
                        <p className="font-semibold text-primary">¿Deseas eliminar este producto?</p>
                        <p className="text-xs text-[#2A4D4E]">esta acción no se puede deshacer</p>

                        <div className="w-full flex justify-between ">

                            <button 
                            onClick={()=>handleCancel()}
                            className="bg-[#0B2D2E] px-4 rounded text-white cursor-pointer font-semibold"
                            >    
                                Cancelar
                            </button>

                            <button
                            onClick={()=>handleConfirm()}
                            className="bg-[#C14426] px-4 rounded text-white cursor-pointer font-semibold">
                                Sí, eliminar
                            </button>

                        </div>
                    </div>

                </section>
                
                <section className={`fixed top-0 inset-0  items-center justify-center bg-black/60 z-50 overflow-x-hidden ${openStatusModal?'flex':' hidden' }`}>

                    <div className=" w-xs rounded bg-white flex flex-col items-center gap-4  p-4 ">

                        <div className="w-full flex justify-end font-medium text-[#0B2D2E] ">

                            <FiX 
                            onClick={()=>handleStatusCancel()}
                            className=" text-end  text-lg text-[#2A4D4E] cursor-pointer"/>
                        </div>

                        <form 
                        onSubmit={handleEdit}
                        className=" w-full flex flex-col gap-4 text-[#0B2D2E] ">

                            <fieldset className="font-medium text-center">Modificar Estado</fieldset>
                            <p className="text-xs font-semibold">MODELO: {shoe?.modelo}</p>

                            <label className="flex gap-2">
                                <input
                                type="radio"
                                name="estado"
                                value="Novedades"
                                />
                                Nuevo
                            </label>

                            <label className="flex gap-2">
                                <input
                                type="radio"
                                name="estado"
                                value="Pocas unidades"
                                />
                                Pocas unidades
                            </label>

                            <label className="flex gap-2">
                                <input
                                type="radio"
                                name="estado"
                                value="Agotado"
                                />
                                Agotado
                            </label>
                         
                            <button
                            type="submit" 
                            className="bg-[#C14426] px-4 rounded text-white cursor-pointer font-semibold"
                            
                            >
                                actualizar
                            </button>

                        </form>

                    </div>

                </section>
                
            </section>
        </div>
    )
}