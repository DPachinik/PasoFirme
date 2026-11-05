import { createContext } from 'react';
import type { CategoryCache, Product } from '../types/product';
import type { QueryDocumentSnapshot } from 'firebase/firestore';

interface ProductsContextData{
    productsByCategory:Record<string, CategoryCache>,
    products:Product[],
    product:Product | null,
    empty:boolean,
    loading:boolean,
    isFiltered:boolean,
    firstImage:string | null,
    lastDoc:QueryDocumentSnapshot | null
    userProducts:Product[],
    loadInitialProducts:(route:string)=>void,
    getMoreProducts:(route:string)=>void,
    searchProducts:(input:string)=>void,
    updateProduct:(product:Product, status:string)=>void,
    clearSearch: (route:string) => void,
    getProduct: (id:string)=>void,
    getUserProducts: (uid:string|undefined)=>void,
    deleteProduct:({product, uid}:{product:Product; uid:string})=>void,
}

export const ProductsContext = createContext({} as ProductsContextData)