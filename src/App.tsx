import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react';

import { Home } from './pages/home'
import { Carrito } from './pages/carrito'
import { Layout } from './components/layout';
import { Detail } from './pages/detail';
import { Login } from './pages/login';
import { Private } from './routes/Private';
import { Spinner } from './components/spinner';

const Dashboard = lazy(()=>import('./pages/dashboard'))
const New = lazy(()=>import('./pages/dashboard/new'))


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
        path:"/detail/:id",
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
    element:(
      <Private>
        <Suspense fallback={<Spinner />}>
                  <Dashboard />
        </Suspense>
      </Private>
    )
  },
  {
    path:"/dashboard/new",
    element:(
      <Private>
        <Suspense fallback={<Spinner />}>
                  <New />
        </Suspense>
      </Private>
    )
  },
])

export {router};