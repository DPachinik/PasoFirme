import { BiTrash } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import styles from './table.module.css'
import { memo, useState } from "react";
import type { Product } from "../../../../features/products/types/product";

interface TableProps{
    handleStatusOpenModal:(product:Product)=>void;
    handleOpenModal:(product:Product)=>void;
    userProducts:Product[];
    uid:string | undefined;
}

export const Table=memo(({handleStatusOpenModal, handleOpenModal, userProducts, uid}:TableProps)=> {

    const[loadImage, setLoadImage] = useState<string[]>([]);
    function handleImageLoad(id:string){
    setLoadImage((prevImage)=>[...prevImage, id])
    }
    
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          <th className="rounded-tl rounded-bl">Producto</th>
          <th>Modelo</th>
          <th>Calce-Mín/Máx</th>
          <th>Precio</th>
          <th>Estado</th>
          <th className="rounded-tr rounded-br">Acciones</th>
        </tr>
      </thead>

      <tbody>
        {uid &&
          userProducts.map((product) => (
            <tr key={product.id} className={styles.tr}>
              <td className={`rounded-tl-lg rounded-bl-lg ${styles.td}`}
                data-label="PRODUCTO"
              >
                <div className="w-fit h-full flex justify-center items-center  ">
                    <div className="w-30 h-20 rounded-lg bg-slate-200 animate-pulse "
                        style={{display:loadImage.includes(product.id)?'none':'block'}}
                    >
                    </div>
                    <img
                        className="w-30 h-20 rounded-lg  mb-2 object-contain object-center "
                        src={product.imagenes[0].url}
                        onLoad={() => handleImageLoad(product.id)}
                        style={{
                        display: loadImage.includes(product.id)? "block": "none",
                        }}
                        decoding="async"
                        alt={product.modelo}
                    />
                </div>
              </td>

              <td className={styles.td} data-label="MODELO">
                {product.modelo}
              </td>

              <td className={styles.td} data-label="CALCE">
                {product.calceMax
                  ? `${product.calceMin} | ${product.calceMax} `
                  : product.calceMin}
              </td>

              <td className={styles.td} data-label="PRECIO">
                <span>
                  {product.precio.toLocaleString("es-PY", {
                    style: "currency",
                    currency: "PYG",
                  })}
                </span>
              </td>

              <td className={styles.td} data-label="ESTADO">
                {product.estado}
              </td>

              <td
                className={`rounded-tr-lg rounded-br-lg ${styles.td}`}
                data-label="ACCIONES"
              >
                <div className="w-full h-full flex items-center justify-end  md:justify-center gap-4">
                  <button
                    className="cursor-pointer "
                    onClick={() => handleOpenModal(product)}
                  >
                    <BiTrash size={24} color="#ff2323" />
                  </button>
                  <button
                    className="cursor-pointer "
                    onClick={() => handleStatusOpenModal(product)}
                  >
                    <FaRegEdit size={24} color="#0B2D2E" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
})
