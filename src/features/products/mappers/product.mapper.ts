import { DocumentSnapshot, type DocumentData, type QueryDocumentSnapshot} from "firebase/firestore";
import type  { Product } from '../types/product'

export function productMapper(doc:QueryDocumentSnapshot <DocumentData> | DocumentSnapshot <DocumentData> ): Product {
    return{
    id: doc.id,
    modelo: doc.data()?.modelo,
    calceMin: doc.data()?.calceMin,
    calceMax: doc.data()?.calceMax,
    precio: Number(doc.data()?.precio),
    colores: doc.data()?.colores,
    estado: doc.data()?.estado,
    descripcion: doc.data()?.descripcion,
    imagenes: doc.data()?.imagenes,
    categoria:doc.data()?.categoria,
    talles:doc.data()?.talles,
    marcas:doc.data()?.marcas,
    popular:doc.data()?.popular,
    }
}
