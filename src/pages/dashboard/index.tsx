import { DashboardHeader } from "../../components/panelheader";
import { useState, useEffect, useContext, useCallback } from 'react'
import { AuthContext } from "../../features/auth/authContext";
import { ProductsContext } from "../../features/products/context/ProductsContext";
import type { Product } from "../../features/products/types/product";
import { DeleteModal } from "./components/deleteModal";
import { StatusModal } from "./components/statusModal";
import { Table } from "./components/table";

export default function Dashboard(){

    const {uid} = useContext(AuthContext);
    const { updateProduct, getUserProducts, deleteProduct, userProducts } = useContext(ProductsContext);
    const[openModal, setOpenModal] = useState<boolean>(false);
    const[openStatusModal, setOpenStatusModal] = useState<boolean>(false);
    const[shoe, setShoe] = useState<Product | null>(null)
    
    
        useEffect(()=>{
                getUserProducts(uid)
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


        // funciones para manipular modal de eliminar un producto
        const handleOpenModal= useCallback((product:Product)=>{
            setOpenModal(true);
            setShoe(product);
        },[])

        const handleCancel=useCallback(()=>{
            setOpenModal(false);
            setShoe(null);
        },[])
        
        const handleDeleteConfirm=useCallback(()=>{
            if (!uid || shoe===null){
                return;
            }

            deleteProduct({product:shoe, uid});
            setOpenModal(false);
        },[uid, shoe, deleteProduct])


        // funciones para manipular modal de modificar estado de un producto
        const handleStatusOpenModal=useCallback((product:Product)=>{
            setOpenStatusModal(true);
            setShoe(product);
        },[])

        const handleStatusCancel= useCallback(()=>{
            setOpenStatusModal(false);
            setShoe(null);
        },[])

        const handleEdit=useCallback((e:React.FormEvent<HTMLFormElement>)=>{
            e.preventDefault();
            
            if(!shoe) return;

            const formData = new FormData(e.currentTarget);
            const status = formData.get("estado") as string;

            updateProduct(shoe, status);

            setOpenStatusModal(false)
        },[shoe,updateProduct])


    return(

        <div className="grid grid-cols-1 md:grid-cols-[0.5fr_2fr]   h-full md:h-screen">
            <div className="w-full">
                <DashboardHeader />
            </div>    
            <section className="relative flex flex-col gap-4 mt-6  md:mt-0">               
                <h1 className="text-center mt-4 text-secondary text-2xl font-semibold">Inventario de Productos</h1>

                <Table handleOpenModal={handleOpenModal} handleStatusOpenModal={handleStatusOpenModal} userProducts={userProducts} uid={uid}/>
                <DeleteModal openModal={openModal} handleDeleteConfirm={handleDeleteConfirm} handleCancel={handleCancel}/>
                
                <StatusModal openStatusModal={openStatusModal} handleStatusCancel={handleStatusCancel} handleEdit={handleEdit} shoe={shoe}/>          
            </section>
        </div>
    )
}