import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'
import {router} from './App'
import './styles/index.css'
import CartProvider from './contexts/cart/CartProvider'
import  AuthProvider from './contexts/auth/authProvider'
import {Toaster} from 'react-hot-toast' 


createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <CartProvider>
      <AuthProvider>
        <Toaster   position="bottom-right" reverseOrder={false}/>
        <RouterProvider router={router}/>
      </AuthProvider>
    </CartProvider>
  </StrictMode>,
)
