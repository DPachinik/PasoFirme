import { createContext } from 'react'
import type { AddCartItem } from './CartProvider';

export interface CartContextData{
    cart:CartProps[]
    addItemCart:(newItems:AddCartItem)=>void;
    removeItemCart:(product:CartProps) =>void;
    totalP:string;
    setCart: React.Dispatch<React.SetStateAction<CartProps[]>>;
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
    imagenes:ImageProps[];
    talle:number;   
}

interface ImageProps{
    uid:string;
    url:string;
    idImage:string;
}

export const   CartContext= createContext({} as CartContextData)