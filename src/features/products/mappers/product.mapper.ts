import { DocumentSnapshot, type DocumentData, type QueryDocumentSnapshot} from "firebase/firestore";
import type  { Product } from '../types/product'

export function productMapper(doc:QueryDocumentSnapshot <DocumentData> | DocumentSnapshot <DocumentData> ): Product {
    return{
    id: doc.id,
    modelo: doc.data()?.modelo,
    calceMin: doc.data()?.calceMin,
    calceMax: doc.data()?.calceMax,
    precio: Number(doc.data()?.precio),
    color: doc.data()?.color,
    estado: doc.data()?.estado,
    descripcionCorta: doc.data()?.descripcionCorta,
    descripcion: doc.data()?.descripcion,
    imagenes: doc.data()?.imagenes,
    }
}
