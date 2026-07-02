import {CartContext} from '../../features/cart/CartContext'
import { useContext } from 'react'
import { NavbarMobile } from './navbarMobile';
import { NavbarDesktop } from './navbarDesktop';

export function Navbar(){
    const{ cart }= useContext(CartContext);

    return(
        <>
            <NavbarMobile cart={cart}/>
            <NavbarDesktop cart={cart}/>
        </>
    )
}