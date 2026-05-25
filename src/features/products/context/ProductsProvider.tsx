
import type { ReactNode } from "react";
import { ProductsContext } from "./ProductsContext";
import { useProducts } from "../hooks/useProducts";

interface ProviderProps{
    children: ReactNode;
}

export function ProductsProvider ({children}:ProviderProps){

    const {
            products,
            product,
            empty,
            loading,
            isFiltered,
            firstImage,
            userProducts,
            loadInitialProducts,
            getMoreProducts,
            searchProducts,
            updateProduct,
            clearSearch,
            getProduct,
            getUserProducts,
            deleteProduct,
        } = useProducts();
        
    return(
        <ProductsContext.Provider 
        value={{
            products,
            product,
            empty,
            loading,
            isFiltered,
            firstImage,
            userProducts,
            loadInitialProducts,
            getMoreProducts,
            searchProducts,
            updateProduct,
            clearSearch,
            getProduct,
            getUserProducts,
            deleteProduct,
        }}>
            {children}
        </ProductsContext.Provider>
    )

}