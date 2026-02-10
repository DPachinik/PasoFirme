import { createContext, type Dispatch, type SetStateAction } from "react";
import type { ProductsProps } from "../../pages/home";


interface ProductsContextData{
    products: ProductsProps[];
    setProducts:Dispatch<SetStateAction<ProductsProps[]>>
}

export const ProductsContext = createContext({} as ProductsContextData)