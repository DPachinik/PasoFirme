import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'
import {router} from './App'
import './index.css'
import CartProvider from './contexts/cart/CartProvider'
import {Toaster} from 'react-hot-toast' 


createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <CartProvider>
      <Toaster   position="bottom-right" reverseOrder={false}/>
      <RouterProvider router={router}/>

    </CartProvider>
  </StrictMode>,
)
