import { useState } from 'react';
import type { Product } from '../types/product';
import { QueryDocumentSnapshot } from 'firebase/firestore';
import { getMoreProducts, getProduct, loadInitialProducts, searchProducts, updateProduct } from '../services/products.api';
import toast from 'react-hot-toast';


export function useProducts(){
    const [products, setProducts] = useState <Product[]>([]);
    const [product, setProduct] = useState <Product | null>(null);
    const [lastDoc, setLastDoc] = useState <QueryDocumentSnapshot | null>(null);
    const [loading, setLoading] = useState <boolean>(false);
    const [empty, setEmpty] = useState<boolean>(false);
    const [isFiltered, setIsFiltered] = useState<boolean>(false);
    const [firstImage, setFirstImage] = useState<string | null>(null);


    //función para búsqueda inicial de Productos
    async function handleLoadInitialProducts(){
        try{
            setLoading(true);
            setEmpty(false);
            setIsFiltered(false);

            const result = await loadInitialProducts()
                setProducts(result.products);
                setLastDoc(result.lastDoc);
            
        }catch(error){
            toast.error('Error al cargar los productos');
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }

    //función para buscar más 16 Productos
    async function handleGetMoreProducts(){

        if(!lastDoc) return;

        try{
            setLoading(true);

            const result = await getMoreProducts(lastDoc);

            if(result.products.length === 0) {
                return setEmpty(true);
            
            }
            setProducts((prevDoc)=>[...prevDoc, ...result.products]);
            setLastDoc(result.lastDoc);    
        }catch(error){
            toast.error('No se pudieron cargar más productos');
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    //función para buscar por filtro 'modelos'
    async function handleSearchProducts(input:string){
        if(input ==='') return;

        try{
            setLoading(true);
            setIsFiltered(true);
            const result = await searchProducts(input);


            if(result.length === 0){
                toast.error('El producto buscado no existe')
                return setProducts((prev)=>[...prev])
            }
            setProducts(result)

        } catch(error){
            toast.error('Error al buscar productos');
            console.log(error)
        }
        finally{
            setLoading(false);
        }
    }

        //función para actualizar el estado de un producto 
    async function handleUpdateProduct(product:Product, status:string){
        try{
            await updateProduct(product, status);
            setProducts((prev)=>
                prev.map(doc=> doc.id === product.id?{...doc, estado:status}:doc)
            )
            toast.success('Producto actualizado exitosamente', {style:{backgroundColor:'#ffff', color:'#0B2D2E'}})
        }catch(error){
            toast.error('Error al actualizar el estado')
            console.log(error);
        }

    } 

    //función para actualizar estados de boton 'ver más' y 'volver' al salir de una búsqueda filtrada
    async function handleClearSearch() {
        setIsFiltered(false);
        setEmpty(false);
        await handleLoadInitialProducts();
    }

    //función para búsqueda dinámica de un Producto
    async function handleGetProduct(id:string){
        try{
            const item = await getProduct(id);
            if(!item){
                throw new Error('Producto no encontrado')
            }
            if(item.imagenes?.length === 0){
                return null;
            }else{

                setFirstImage(item.imagenes[0].idImage)
            }
            setProduct(item)
        }catch(err){
            console.log(err);
            toast.error('Error al buscar producto')
        }
    }

    return{
        products,
        product,
        empty,
        loading,
        isFiltered,
        firstImage,
        loadInitialProducts:handleLoadInitialProducts,
        getMoreProducts:handleGetMoreProducts,
        searchProducts:handleSearchProducts,
        updateProduct:handleUpdateProduct,
        clearSearch:handleClearSearch,
        getProduct:handleGetProduct,
    };
}
