import { createContext } from 'react'
import type { ProductsProps } from '../../pages/home';

export interface CartContextData{
    cart:CartProps[]
    addItemCart:(newItems:ProductsProps)=>void;
    removeItemCart:(product:CartProps) =>void;
    totalP:string;
}

export interface CartProps{
    id:string;
    modelo:string;
    descripcion:string;
    precio:number;
    amount:number;
    total:number;
    calceMin:string;
    calceMax?:string;
    color:string;
    estado:string;
    imagenes:ImageProps[]
}

interface ImageProps{
    uid:string;
    url:string;
    idImage:string;
}

export const   CartContext= createContext({} as CartContextData)