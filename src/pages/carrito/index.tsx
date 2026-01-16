import { useContext } from 'react'
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/cart/CartContext';

export function Carrito(){

    const {cart, addItemCart, removeItemCart, totalP } = useContext(CartContext)

    return(
        <div className="w-full max-w-7xl mx-auto">
            <h1 className="font-medium text-2xl text-center my-4"> Mi Carrito</h1>

            {cart.length === 0 && (
                <div className='flex flex-col items-center justify-center gap-3'>
                    <p className='text-xl font-medium'>Tú carrito está vacío!</p>
                    <Link 
                    to="/"
                    className='bg-gray-500 p-1 px-3 rounded text-white'
                    >
                        Agregar Productos
                    </Link>
                </div>
            )}

            {
                cart.map((item)=>(
                    <section 
                    key={item.id}
                    className="flex items-center justify-between border-b-2 border-gray-300 pb-2">
                        <img 
                        className="w-28"
                        src={item.cover} 
                        alt={item.title}
                        />

                        <strong>Precio: {item.price.toLocaleString("es-PY",{
                                        style:'currency',
                                        currency:'PYG'}
                                    )}</strong>

                        <div className="flex gap-3 items-center justify-center">
                            <button 
                            onClick = {()=>removeItemCart(item)}
                            className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center">
                                -
                            </button>
                            {item.amount}
                            <button 
                            onClick = {()=>addItemCart(item)}
                            className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center">
                                +
                            </button>
                        </div>

                        <strong className="font-medium float-right">
                            subtotal: {item.total.toLocaleString("es-PY",{
                                        style:'currency',
                                        currency:'PYG'}
                                    )}
                        </strong>
                    </section>
                ))
            }
            { cart.length !==0 && <p className="font-bold mt-4">Total: {totalP}</p>}
        </div>
    )
}