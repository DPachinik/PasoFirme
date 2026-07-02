import { createContext } from 'react';
import type { Product } from '../types/product';
import type { QueryDocumentSnapshot } from 'firebase/firestore';

interface ProductsContextData{
    products:Product[],
    product:Product | null,
    empty:boolean,
    loading:boolean,
    isFiltered:boolean,
    firstImage:string | null,
    lastDoc:QueryDocumentSnapshot | null
    userProducts:Product[],
    loadInitialProducts:()=>void,
    getMoreProducts:()=>void,
    searchProducts:(input:string)=>void,
    updateProduct:(product:Product, status:string)=>void,
    clearSearch: () => void,
    getProduct: (id:string)=>void,
    getUserProducts: (uid:string|undefined)=>void,
    deleteProduct:({product, uid}:{product:Product; uid:string})=>void,
}

export const ProductsContext = createContext({} as ProductsContextData)