import { useState, type ReactNode } from "react";
import { CartContext, type CartProps } from "./CartContext";
import type { ProductsProps } from "../../pages/home";


interface ProviderProps{
    children:ReactNode;
}

function CartProvider({children}:ProviderProps){

    const [cart, setCart] = useState<CartProps[]>([]);
    const [totalP, setTotalP] = useState("");

    function addItemCart(newItem:ProductsProps){

        const indexItem= cart.findIndex(item=> item.id === newItem.id);

        if(indexItem !== -1){
            const cartList = [...cart]
            cartList[indexItem].amount=cartList[indexItem].amount +1;
            cartList[indexItem].total =cartList[indexItem].precio *cartList[indexItem].amount;

            setCart(cartList);
            totalResultCart(cartList)
            return;

        }


        const data ={
            ...newItem,
            amount:1,
            total:newItem.precio,
        }
        setCart(products => [...products, data] )
        totalResultCart([...cart, data])


    }

    function removeItemCart(product:CartProps){

        const itemIndex =cart.findIndex(item=>item.id === product.id);
        
        if(cart[itemIndex]?.amount >1){
            const listProduct=[...cart];
            listProduct[itemIndex].amount=listProduct[itemIndex].amount - 1;
            listProduct[itemIndex].total=listProduct[itemIndex].precio * listProduct[itemIndex].amount;
            setCart(listProduct);
            totalResultCart(listProduct);
            return;
        }


        const cartList = cart.filter(item =>item.id !== product.id);
        setCart(cartList);
        totalResultCart(cartList);
    }

    function totalResultCart(product:CartProps[]){
        const myCart=[...product];
        const result=myCart.reduce((acc, obj)=>{return acc + obj.total}, 0)
        const resultFormated= result.toLocaleString("es-PY",{
            style:'currency',
            currency:'PYG'
        })
        setTotalP(resultFormated);

    }

    return(
        <CartContext.Provider value={{cart, addItemCart, removeItemCart, totalP}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;