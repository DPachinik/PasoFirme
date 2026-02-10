import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'
import {router} from './App'
import './styles/index.css'
import CartProvider from './contexts/cart/CartProvider'
import  AuthProvider from './contexts/auth/authProvider'
import {Toaster} from 'react-hot-toast' 
import { ProductsProvider } from './contexts/products/PoductsProvider'


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
