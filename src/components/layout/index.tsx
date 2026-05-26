import { Navbar } from '../navbar'
import { Outlet, ScrollRestoration } from 'react-router-dom'

export function Layout(){
    return(
        <>
            <ScrollRestoration />
            <Navbar />
            <Outlet />
        </>

    )
}