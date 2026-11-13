import { useCallback, useState } from 'react';
import type { CategoryCache, Product } from '../types/product';
import { QueryDocumentSnapshot } from 'firebase/firestore';
import { deleteProductApi, deleteImage, getMoreProducts, getProduct, loadInitialProducts, loadUserProducts,searchSimilarProducts, searchProducts, updateProduct } from '../services/products.api';
import toast from 'react-hot-toast';



export function useProducts(){

    const [productsByCategory, setProductsByCategory] = useState<Record<string, CategoryCache>>({});
    const [products, setProducts] = useState <Product[]>([]);
    const [product, setProduct] = useState <Product | null>(null);
    const [userProducts, setUserProducts] = useState <Product[] >([]);
    const [lastDoc, setLastDoc] = useState <QueryDocumentSnapshot | null>(null);
    const [loading, setLoading] = useState <boolean>(false);
    const [empty, setEmpty] = useState<boolean>(false);
    const [isFiltered, setIsFiltered] = useState<boolean>(false);
    const [firstImage, setFirstImage] = useState<string | null>(null);
    const [cached, setCached] = useState<boolean>(false);
    const [similar, setSimilar]= useState<Product[]>([]);



    //función para búsqueda inicial de Productos
    const handleLoadInitialProducts = useCallback(
        async (route:string)=>{
        try{

            // 1.Buscar categoria en caché
            console.log(`buscando en ruta:' ${route} `)
            const cachedProducts = productsByCategory[route];
            
            //2.Recuperar datos sin consultar a Firestore
            if(cachedProducts){
                setProducts(cachedProducts.products);
                setLastDoc(cachedProducts.lastDoc);
                setEmpty(false);
                setIsFiltered(false);
                setCached(true);
                return;
            }
          
            //3.No hay caché: consultar Firestore
            console.log('consultando base de datos')
            setLoading(true);
            setEmpty(false);
            setIsFiltered(false);
            setCached(false);

            const result = await loadInitialProducts(route);

            //Guardar productos y cursor de esta categoria
            setProductsByCategory((prev)=>({
                ...prev,
                    [route]:{
                        products:result.products,
                        lastDoc:result.lastDoc,
                    },
            }));

            // Mostrar los resultados en el catálogo
            setProducts(result.products);
            setLastDoc(result.lastDoc);
            setEmpty(result.products.length ==0);
            console.log(result.lastDoc);
            
        }catch(error){
            toast.error('Error al cargar los productos');
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    
        },
        [productsByCategory]
    );




    //función para buscar más 16 Productos
    async function handleGetMoreProducts(route:string){

        const cached = productsByCategory[route];

        if(!cached?.lastDoc) return;

        
        try{
            setLoading(true);

            console.log(`buscando mas productos con: ${route}`)
            const result = await getMoreProducts(cached.lastDoc, route);

            if(result.products.length === 0) {
                setEmpty(true);
                
            }

            //actualizar cache de la categoria
            setProductsByCategory((prev)=>{
                const current = prev[route];
                if(!current) return prev;
                
                return{
                    ...prev,
                    [route]:{
                        products:[...current.products, ...result.products],
                        lastDoc:result.lastDoc,
                    }
                }
                
            })

            //Actualizar los productos visibles
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
            setEmpty(false);
            setLoading(true);
            const result = await searchProducts(input)
            console.log('filtrando....')
            ;


            if(result.length === 0){
                toast.error('El producto buscado no existe')
                return setProducts((prev)=>[...prev])
            }
            console.log('productos encontrados...')
            setProducts(result)
            setIsFiltered(true);

        } catch(error){
            toast.error('Error al buscar productos');
            console.log(error)
        }
        finally{
            setLoading(false);
        }
    }

    // función para buscar productos similares a través de 'modelos'

    async function handleSimilarShoes(modelo:string, id:string) {

        if(!modelo) return;
        
        try{
            setLoading(true);
            const result = await searchSimilarProducts(modelo);
            console.log(result);
            setSimilar(()=>[...result.filter(item => item.id !== id )]);

        }catch(error){
            toast.error(`Error al cargar productos:'${error}`)

        }finally{
            setLoading(false)
        }
    }

    //función para actualizar el estado de un producto 
    async function handleUpdateProduct(product:Product, status:string){
        try{
            await updateProduct(product, status);
            setUserProducts((prev)=>
                prev.map(doc=> doc.id === product.id?{...doc, estado:status}:doc)
            )
            toast.success('Producto actualizado exitosamente', {style:{backgroundColor:'#ffff', color:'#0B2D2E'}})
        }catch(error){
            toast.error('Error al actualizar el estado')
            console.log(error);
        }

    } 

    //función para actualizar estados de boton 'ver más' y 'volver' al salir de una búsqueda filtrada
    async function handleClearSearch(route:string) {
        setEmpty(false);
        await handleLoadInitialProducts(route);
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

                setFirstImage(item.imagenes[0].uidImage)
            }
            setProduct(item)
            handleSimilarShoes(item.modelo, id);
        }catch(err){
            console.log(err);
            toast.error('Error al buscar producto')
        }
    }

    //función para búsqueda de Productos por filtro de ususario

    async function getUserProducts(uid:string | undefined) {
        try{
            setLoading(true);
            if(!uid){
                return;
            }
            const items = await loadUserProducts(uid);
            setUserProducts(items);
        }catch(err){
            console.log(err);
            toast.error('Error al buscar producto')
        }finally{
            setLoading(false);
        }
    }

    //función para eliminar un Producto
    async function deleteProduct({product, uid}:{product:Product; uid:string}){
        try{
            await deleteImage({product, uid});
            await deleteProductApi(product);
            setUserProducts(prev =>prev.filter(item => item.id !== product.id));
        }catch(err){
            console.log(err);
            toast.error('Error al eliminar producto')
        }  
    }

    return{
        cached,
        productsByCategory,
        products,
        product,
        empty,
        loading,
        isFiltered,
        firstImage,
        userProducts,
        lastDoc,
        similar,
        loadInitialProducts:handleLoadInitialProducts,
        getMoreProducts:handleGetMoreProducts,
        searchProducts:handleSearchProducts,
        searchSimilarProducts:handleSimilarShoes,
        updateProduct:handleUpdateProduct,
        clearSearch:handleClearSearch,
        getProduct:handleGetProduct,
        getUserProducts,
        deleteProduct,
    };
}
