import type { QueryDocumentSnapshot } from "firebase/firestore";

export type CategoryCache={
    products:Product[];
    lastDoc:QueryDocumentSnapshot | null;
}

export interface Product{
    id:string;
    modelo:string;
    calceMin:string;
    calceMax?:string;
    precio:number;
    colores:string;
    estado:string;
    descripcion:string;
    descripcionCorta?:string;
    imagenes:ImageProps[];
    categoria:string;
    marcas:string;
    talles:string;
    popular:string,

}

export type ImageProps ={
    uidImage:string;
    uid:string;
    url:string;
}

