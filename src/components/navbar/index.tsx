import {CartContext} from '../../features/cart/CartContext'
import {AuthContext} from '../../features/auth/authContext'
import { useContext } from 'react'
import { NavbarMobile } from './navbarMobile';
import { NavbarDesktop } from './navbarDesktop';

export function Navbar(){
    const{ cart }= useContext(CartContext);
    const {signed, loadingAdmin} = useContext(AuthContext)

    return(
        <>
            <NavbarMobile cart={cart} signed={signed} loadingAdmin={loadingAdmin} />
            <NavbarDesktop cart={cart} signed={signed} loadingAdmin={loadingAdmin} />
        </>
    )
}