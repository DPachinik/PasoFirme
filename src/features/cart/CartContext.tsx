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
    colores:string[];
    estado:string;
    imagenes:ImageProps[];
    talles:string[];
    categoria:string;
    marcas:string[]
    popular:string;
    calces:number;
}

interface ImageProps{
    uid:string;
    url:string;
    uidImage:string;
}

export const   CartContext= createContext({} as CartContextData)