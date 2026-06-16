export interface Product{
    id:string;
    modelo:string;
    calceMin:string;
    calceMax?:string;
    precio:number;
    color:string;
    estado:string;
    descripcion:string;
    descripcionCorta?:string;
    imagenes:ImageProps[];
}

export type ImageProps ={
    uidImage:string;
    uid:string;
    url:string;
}

