
import {  useState, type ReactNode } from 'react'
import {ProductsContext } from './ProductsContext'
import type { ProductsProps } from '../../pages/home'

interface ProviderProps{
    children:ReactNode
}


export function ProductsProvider({children}:ProviderProps){

    const[products, setProducts] =useState<ProductsProps[]>([]);

    return(
        <ProductsContext.Provider value={{products, setProducts}}>
            { children }
        </ProductsContext.Provider>
    )
}