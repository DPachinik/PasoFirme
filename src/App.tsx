import { createBrowserRouter } from 'react-router-dom'

import { Home } from './pages/home'
import { Carrito } from './pages/carrito'
import { Layout } from './components/layout';
import { Detail } from './pages/detail';
import { Login } from './pages/login';
import { Dashboard } from './pages/dashboard';
import { Private } from './routes/Private';
import { New } from './pages/dashboard/new';

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
  },
  {
    path:"/dashboard",
    element:<Private><Dashboard /></Private>
  },
  {
    path:"/dashboard/new",
    element:<Private>< New /></Private>
  },
])

export {router};