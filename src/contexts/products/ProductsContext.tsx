import { createContext, type Dispatch, type SetStateAction } from "react";
import type { ProductsProps } from "../../pages/home";
import type { QueryDocumentSnapshot } from "firebase/firestore";


interface ProductsContextData{
    products: ProductsProps[];
    setProducts:Dispatch<SetStateAction<ProductsProps[]>>;
    searchProducts:(input:string)=>void;
    loadInitialProducts:()=>void;
    getProducts:()=>void;
    setEmpty:Dispatch<SetStateAction<boolean>>;
    empty:boolean;
    setIsFiltered:Dispatch<SetStateAction<boolean>>;
    isFiltered:boolean;
    setDocument:Dispatch<SetStateAction<QueryDocumentSnapshot | null>>;
    updateItem:(item:ProductsProps, status:string)=>void;

}

export const ProductsContext = createContext({} as ProductsContextData)