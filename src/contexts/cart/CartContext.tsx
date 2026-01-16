import { createContext } from 'react'
import type { ProductsProps } from '../../pages/home';

export interface CartContextData{
    cart:CartProps[]
    addItemCart:(newItems:ProductsProps)=>void;
    removeItemCart:(product:CartProps) =>void;
    totalP:string;
}

export interface CartProps{
    id:number;
    title:string;
    description:string;
    price:number;
    cover:string;
    amount:number;
    total:number;
}

export const   CartContext= createContext({} as CartContextData)