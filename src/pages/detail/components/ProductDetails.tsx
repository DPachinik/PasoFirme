import { IoIosStar } from "react-icons/io";
import type { Product } from "../../../features/products/types/product";
import { useContext, useState } from "react";
import { CartContext } from "../../../features/cart/CartContext";
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
        <h1 className=" text-3xl font-bold text-primary text-nowrap">
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
          <strong className="text-secondary text-2xl">
            {product?.precio.toLocaleString("es-PY", {
              style: "currency",
              currency: "PYG",
            })}
          </strong>
        </div>

        <div className="w-full flex flex-col mt-4 ">
          <span className="font-bold text-primary text-xl">Descripción</span>
          <p className="text-base md:text-sm text-gray-600">
            {product.descripcion}
          </p>
        </div>

        <div className="flex flex-col gap-1 mt-4">
          <span className="font-bold text-primary text-xl">Color</span>
          <span
            className="h-4 w-4 rounded-full "
            style={{ backgroundColor: product.color }}
          ></span>
        </div>

        <div className="flex flex-col  mt-4">
          <div className="flex flex-col gap-1">
            <span className="font-bold  text-xl text-primary">Tamaños</span>
            <div className="grid grid-cols-6 gap-2">
              {tamaños.map((size) => (
                <button
                  key={size}
                  className=" px-3 py-1 rounded bg-white border border-[#2A4D4E] text-[#2A4D4E] cursor-pointer hover:bg-[#082F36] hover:text-white transition-all"
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

        <div className="w-full flex flex-col md:flex-row   items-center justify-center gap-4 mt-8  md:max-w-[90%]  my-4">
          
          <div className="w-44 bg-[#C00000] rounded">
            <button
              onClick={() => product && handleAddItemCart(product)}
              className="bg-[#E86343]/70  text-white text- text-nowrap py-2   w-full font-medium flex flex-1 items-center justify-center gap-4  cursor-pointer  rounded "
            >
              AÑADIR AL CARRITO
            </button>

          </div>

          <div  className="w-44  flex bg-black rounded ">
            <Link to="/" className="bg- text-white text-nowrap font-medium  py-2   w-full flex flex-1 items-center justify-center gap-4 px-2 cursor-pointer rounded bg-[#082F36]/50 ">
              SEGUIR COMPRANDO
            </Link>
          </div>
        </div>
      </div>
  );
}
