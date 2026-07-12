import { Link } from "react-router-dom";
import type { CartProps } from "../../../../features/cart/CartContext";
import { FiShoppingCart } from "react-icons/fi";

export default function CartHome({cart}:{cart:CartProps[]}) {

    return(
        <div className="bg-[#E86343]/70 w-full">
            <Link to='/cart' className="flex items-center justify-center py-2 text-white text-lg font-medium ">
                
                ({cart.length}) Mi carrito <FiShoppingCart  className="text-base"/>
            </Link>
        </div>
    )
}