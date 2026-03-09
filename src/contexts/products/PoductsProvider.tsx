import { useState, type ReactNode } from "react";
import { ProductsContext } from "./ProductsContext";
import type { ProductsProps } from "../../pages/home";
import { db } from "../../services/firebaseConnection";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  type DocumentData,
  doc,
  updateDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";

interface ProviderProps {
  children: ReactNode;
}

export function ProductsProvider({ children }: ProviderProps) {
  const [products, setProducts] = useState<ProductsProps[]>([]);
  const [document, setDocument] = useState<QueryDocumentSnapshot | null>(null);
  const [empty, setEmpty] = useState<boolean>(false);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);

 

    function formatSnapshot(snapshot:QueryDocumentSnapshot<DocumentData>[]){
        const list = [] as ProductsProps[];
        snapshot.forEach((product) => {
          list.push({
            id: product.id,
            modelo: product.data().modelo,
            calceMin: product.data().calceMin,
            calceMax: product.data().calceMax,
            precio: Number(product.data().precio),
            color: product.data().color,
            estado: product.data().estado,
            descripcionCorta: product.data().descripcionCorta,
            descripcion: product.data().descripcion,
            imagenes: product.data().imagenes,
          });
        });
        return list;
    }

 //Carga Inicial- Primer Renderizado

  function loadInitialProducts() {


    setEmpty(false);

    const productsRef = collection(db, "shoes");
    const queryRef = query(productsRef, orderBy("created", "desc"), limit(16));

    getDocs(queryRef)
      .then((snapshot) => {
        const list =formatSnapshot(snapshot.docs)
        const ultimoDoc = snapshot.docs[snapshot.docs.length - 1]?? null;
        setDocument(ultimoDoc);

        setProducts(list);
      })
      .catch((error) => {
        console.log("error:" + error);
      });
  }

  //Consultar más productos
  function getProducts() {
    if(!document){
        return;
    }

    const productsRef = collection(db, "shoes");
    const nextQuery = query(
      productsRef,
      orderBy("created", "desc"),
      startAfter(document),
      limit(16),
    );
    getDocs(nextQuery)
      .then((snapshot) => {
        if (snapshot.empty) {
          setEmpty(true);
          return;
        }

        const list =formatSnapshot(snapshot.docs)

        const ultimoDocActual = snapshot.docs[snapshot.docs.length - 1];
        setDocument(ultimoDocActual);
        setProducts((prevDoc) => [...prevDoc, ...list]);
      })
      .catch(() => {});
  }

  //busqueda filtrada
  async function searchProducts(input: string) {
    if (input === "") {
      return;
    }

    setEmpty(false);
    setIsFiltered(true);

    const q = query(
      collection(db, "shoes"),
      where("modelo", ">=", input.trim().toUpperCase()),
      where("modelo", "<=", input.trim().toUpperCase() + "\uf8ff"),
    );

    getDocs(q).then((snapshot) => {
      const list =formatSnapshot(snapshot.docs)

      setProducts(list);
    });
  }

  //Actualizar Producto

  function updateItem(product:ProductsProps, status:string){
    const docRef= doc(db, 'shoes', product.id);

    updateDoc(docRef, {
      estado:status
    }

    )
    .then(()=>{
      toast.success('Producto actualizado exitosamente')
    })
    .catch((error)=>{
      console.log('error:' + error);
    })

  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        searchProducts,
        loadInitialProducts,
        getProducts,
        setEmpty,
        empty,
        isFiltered,
        setDocument,
        setIsFiltered,
        updateItem
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
