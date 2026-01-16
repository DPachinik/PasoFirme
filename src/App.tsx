import { createBrowserRouter } from 'react-router-dom'

import { Home } from './pages/home'
import { Carrito } from './pages/carrito'
import { Layout } from './components/layout';
import { Detail } from './pages/detail';
import { Login } from './pages/login';

const router = createBrowserRouter([
  {
    element:<Layout />,
    children:[
      {
        path:"/",
        element:<Home />,
      },
      {
        path:"/cart",
        element:<Carrito />
      },
      {
        path:"/cart/:id",
        element:<Detail />
      }
    ]
  },
  {
    path:"/login",
    element:<Login />
  }
])

export {router};