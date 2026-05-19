import { collection, query, orderBy, limit, getDocs, startAfter, where, updateDoc, doc, getDoc } from 'firebase/firestore';
import type { QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '../../../services/firebaseConnection';
import type { Product } from '../types/product';
import { productMapper } from '../mappers/product.mapper';

//conexión inicial para buscar productos 
export async function loadInitialProducts(): Promise<{
    products:Product[];
    lastDoc: QueryDocumentSnapshot | null ;  
}> {
    const productsRef = collection(db, 'shoes');
    const queryRef = query(productsRef, orderBy('created', 'desc'), limit(16));

   const snapshot = await getDocs(queryRef);

   return{
    products: snapshot.docs.map(productMapper),
    lastDoc: snapshot.docs.at(-1)?? null,
   };
}


//llamada para buscar más productos (paginación)
export async function getMoreProducts(lastDoc:QueryDocumentSnapshot):Promise<{
    products:Product[];
    lastDoc: QueryDocumentSnapshot | null ;
}>{
    const productRef = collection(db, 'shoes');
    const nextquery = query(productRef, orderBy('created','desc'), startAfter(lastDoc),limit(16));

    const snapshot = await getDocs(nextquery);

    if(snapshot.empty){
        return { products: [], lastDoc: null };
    }
    
    return{
        products:snapshot.docs.map(productMapper),
        lastDoc:snapshot.docs.at(-1)?? null
    }
}

//llamada  para buscar productos por filtro (lógica de búsqueda)
export async function searchProducts(input:string):Promise<
    Product[]
> {
    
    const productRef = collection(db, 'shoes');
    const q = query(productRef,
        where('modelo','>=', input.trim().toUpperCase()),
        where('modelo', '<=',input.trim().toUpperCase()+ '\uf8ff'),
    );
    const snapshot = await getDocs(q)

    return snapshot.docs.map(productMapper)
    
}


//llamada  para buscar un solo producto (búsqueda dinámica)
export async function getProduct(id:string):Promise<Product | null>{
    const productRef = doc(db, 'shoes', id);
    const snapshot =await getDoc(productRef);

    if(!snapshot.exists()){
        return null;
    }

    return productMapper(snapshot);
    
}


//llamada para actualizar el estado de un producto
export async function updateProduct(product:Product, status:string):Promise<void>{
    const itemRef = doc(db, 'shoes', product.id);
    await updateDoc(itemRef, {estado:status});
}