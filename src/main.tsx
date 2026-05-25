import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'
import {router} from './App'
import './styles/index.css'
import CartProvider from './features/cart/CartProvider'
import  AuthProvider from './features/auth/authProvider'
import {Toaster} from 'react-hot-toast' 
import { ProductsProvider } from './features/products/context/ProductsProvider'



createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <CartProvider>
      <AuthProvider>
        <ProductsProvider>
        <Toaster   position="bottom-right" reverseOrder={false}/>
        <RouterProvider router={router}/>
        </ProductsProvider>
      </AuthProvider>
    </CartProvider>
  </StrictMode>,
)
