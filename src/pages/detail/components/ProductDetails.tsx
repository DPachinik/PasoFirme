
import type { Product } from "../../../features/products/types/product";
import { useContext, useState } from "react";
import { CartContext } from "../../../features/cart/CartContext";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CaretLeftIcon } from "@phosphor-icons/react";
import { ProductsContext } from "../../../features/products/context/ProductsContext";
import { LiaCartArrowDownSolid } from "react-icons/lia";

  interface ObjectProps{
        product:Product;
        path:string| null;
    }

  export function ProductDetails({ product, path }: ObjectProps) {
  

  const { addItemCart } = useContext(CartContext);
  const { isFiltered } =useContext(ProductsContext)
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const navigate = useNavigate();

  const min = Number(product.calceMin);
  const max = product.calceMax ? Number(product.calceMax) : null;
  let tamaños: number[] = [];

  if (max && max >= min) {
    const cantidad = max - min + 1;
    tamaños = Array.from({ length: cantidad }, (_, i) => min + i);
  } else {
    tamaños = [min];
  }

  function handleAddItemCart(product: Product) {
    if (!selectedSize) {
      toast.error("seleccione un talle");
      return;
    }

    addItemCart({
      ...product,
      calces: selectedSize,
    });

    toast.success("Producto añadido al carrito", {
      style: { backgroundColor: "#ffff", color: "#0B2D2E" },
    });

    navigate("/cart");
  }

  return (
      <div className="w-full  flex flex-col   rounded-lg px-3.5 font-Montserrat ">
        <h1 className=" text-2xl  text-nowrap text-title ">
          {product.modelo}
        </h1>

        <div className="w-full flex flex-col mt-4">
          <p className="text-base md:text-sm text-gray-700  ">
            {product.descripcion}
          </p>
        </div>

        <div className="flex pb-4 mt-8 justify-between items-baseline ">
          <h1 className="text-lg text-title  ">Precio</h1>
          <p className="text-basic text-xl font-semibold text-title font-Poppins ">
            {product?.precio.toLocaleString("es-PY", {
              style: "currency",
              currency: "PYG",
            })}
          </p>
        </div>



        <div className="flex flex-col  mt-4">
          <div className="flex flex-col gap-1">
            <span className="text-lg text-title mb-2">Talla</span>
            <div className="flex gap-2">
              {tamaños.map((size) => (
                <button
                  key={size}
                  className=" px-4 py-2 rounded-md bg-defuse text-gray  cursor-pointer   transition-all"
                  onClick={() => setSelectedSize(size)}
                  style={selectedSize === size? { backgroundColor: "#95982E", color: "white" }: {}
                  }
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

         

        <div className="w-full flex  items-center justify-center gap-4 mt-8  md:max-w-[90%]  my-4">

          <div  className="flex">
            {isFiltered && (
              <button 
              onClick={() => {
                navigate(-1)
              }}
              className=' py-2 text-base text-primary font-bebas  cursor-pointer flex items-center justify-center  rounded px-2 bg-[#ffff] hover:bg-[#082F36] hover:text-white transition all duration-200'
              >
                <CaretLeftIcon size={24} />

              </button>
            )}
            {!isFiltered && ( 
              <Link to={`/${path}#productos`} className=' py-3 px-3 text-base text-primary font-bebas  cursor-pointer flex items-center justify-center gap-2 shadow shadow-gray-300 rounded-md bg-white transition all duration-200' >
                <CaretLeftIcon size={24} weight="bold"  className="text-gray"/>

              </Link>
            )

            }
          </div>

          <div className="w-full ">
            <button
              onClick={() => product && handleAddItemCart(product)}
              className="bg-active text-white text- text-nowrap py-2   w-full font-bebas flex flex-1 items-center justify-center gap-4  cursor-pointer rounded-md "
            >
              <LiaCartArrowDownSolid size={36} strokeWidth={0} />
              Agregar  
            </button>

          </div>


        </div>
      </div>
  );
}
