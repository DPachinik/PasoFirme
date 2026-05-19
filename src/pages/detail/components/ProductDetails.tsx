import { IoIosStar } from "react-icons/io";
import type { Product } from "../../../features/products/types/product";
import { useContext, useState } from "react";
import { CartContext } from "../../../contexts/cart/CartContext";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export function ProductDetails({ product }: { product: Product }) {
  const { addItemCart } = useContext(CartContext);
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
      talle: selectedSize,
    });

    toast.success("Producto añadido al carrito", {
      style: { backgroundColor: "#ffff", color: "#0B2D2E" },
    });

    navigate("/cart");
  }

  return (
      <div className="w-full  flex flex-col   rounded-lg px-4 ">
        <h1 className=" text-3xl font-bold text-white text-nowrap">
          {" "}
          {product.modelo}
        </h1>
        <div className="flex items-center">
          <IoIosStar size={18} color="#FFCE1B" />
          <IoIosStar size={18} color="#FFCE1B" />
          <IoIosStar size={18} color="#FFCE1B" />
          <IoIosStar size={18} color="#FFCE1B" />
          <IoIosStar size={18} color="#FFCE1B" />
        </div>

        <div className="flex  ">
          <strong className="text-secondary-rel text-2xl">
            {product?.precio.toLocaleString("es-PY", {
              style: "currency",
              currency: "PYG",
            })}
          </strong>
        </div>

        <div className="w-full flex flex-col mt-4 ">
          <span className="font-bold text-white text-xl">Descripción</span>
          <p className="text-base md:text-sm text-white/60">
            {product.descripcion}
          </p>
        </div>

        <div className="flex flex-col gap-1 mt-4">
          <span className="font-bold text-white text-xl">Color</span>
          <span
            className="h-4 w-4 rounded-full "
            style={{ backgroundColor: product.color }}
          ></span>
        </div>

        <div className="flex flex-col  mt-4">
          <div className="flex flex-col gap-1">
            <span className="font-bold  text-xl text-white">Tamaños</span>
            <div className="flex gap-2">
              {tamaños.map((size) => (
                <button
                  key={size}
                  className=" px-3 py-1 rounded border border-[#2A4D4E] text-[#2A4D4E] cursor-pointer hover:bg-[#2A4D4E] hover:text-white transition-all"
                  onClick={() => setSelectedSize(size)}
                  style={selectedSize === size? { backgroundColor: "#2A4D4E", color: "white" }: {}
                  }
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row px-4  items-center justify-center gap-4 mt-4  md:max-w-[90%]  my-4">
          <button
            onClick={() => product && handleAddItemCart(product)}
            className="bg-linear-to-t to-[#E86343] via-[#E86343] from-[#C14426]  text-white py-2   w-full font-medium flex flex-1 items-center justify-center gap-4 px-2 cursor-pointer  rounded "
          >
            Añadir al carrito
          </button>

          <div  className="w-full flex flex-1">
            <Link to="/" className="bg-linear-to-t to-[#2A4D4E] via-[#0B2D2E] from-[#B2D2E] border border-[#2A4D4E] text-white font-medium  py-2   w-full flex flex-1 items-center justify-center gap-4 px-2 cursor-pointer rounded  ">
              Ver más
            </Link>
          </div>
        </div>
      </div>
  );
}
