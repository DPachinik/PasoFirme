import { createContext } from 'react';
import type { Product } from '../types/product';

interface ProductsContextData{
    products:Product[],
    product:Product | null,
    empty:boolean,
    loading:boolean,
    isFiltered:boolean,
    firstImage:string | null,
    loadInitialProducts:()=>void,
    getMoreProducts:()=>void,
    searchProducts:(input:string)=>void,
    updateProduct:(productId:string, status:string)=>void,
    clearSearch: () => void,
    getProduct: (id:string)=>void,

}

export const ProductsContext = createContext({} as ProductsContextData)