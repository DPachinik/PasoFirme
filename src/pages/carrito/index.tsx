import { useContext } from 'react'
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/cart/CartContext';


export function Carrito(){

    const {cart, addItemCart, removeItemCart, totalP, setCart } = useContext(CartContext)




    function handleWhatsApp(){

        const phone ="+5950992988397";

        const productos = cart.map((item)=>{
            return `Modelo:*${item.modelo}*
                    Talle: ${item.talle}

            Precio:${item.precio.toLocaleString('es-PY',{
                style:'currency',
                currency:'PYG'
            })}

            Cantidad:${item.amount}

            Subtotal:${item.total.toLocaleString('es-PY',{
                style:'currency',
                currency:'PYG'   
            })}`;

        }).join('\n');

        const mensaje = `
         Hola! vengo desde la Web PasoFirme, quiero consultar la disponibilidad de este zapato:

        ${productos}
        *TOTAL PRODUCTOS:* ${cantidad}
        *TOTAL:* ${totalP}
        `;
        const mensajeCodificado = encodeURIComponent(mensaje);

        window.open(`https://wa.me/${phone}?text=${mensajeCodificado}`, '_blank');

        setCart([]);

    };

    const cantidad = cart.reduce((total, item)=> total +Number(item.amount), 0 )

    return(
        <div className="w-full max-w-7xl mx-auto">
            <h1 className="font-medium text-2xl  my-4"> Mi Carrito </h1>

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

            { cart.length !==0 &&( 
                <main className='flex w-full gap-8 ' >
                    <div className='w-full'>   
                        <table className='w-full  border-separate border-spacing-y-2   '>
                            <thead className='h-10 shadow '>
                                <tr className=''>
                                    <th className='text-start pl-4'>Productos</th>
                                    <th className='text-center'>Cantidad</th>
                                    <th>Precio</th>
                                </tr>
                            </thead>

                            <tbody className='text-center ' >
                                
                                {cart.map((item,i)=>(
                                    <tr key={i} className='shadow'>
                                        <td >
                                            <div className='flex'>
                                                <img 
                                                src={item.imagenes[0].url}
                                                className='min-w-40 h-25 object-contain'
                                                />

                                                <div className='w-full   flex flex-col justify-center  text-start '>
                                                    <div className=' w-fit pl-16'>
                                                        <p className='font-medium'>{item.modelo}</p>
                                                        <span className='block text-start text-gray-500'>Talle: {item.talle}</span>
                                                    </div>

                                                </div> 
                                            </div> 
                                        </td>

                                    <td >
                                        
                                            <button 
                                            className='mr-4 text-2xl font-bold'
                                            onClick={()=>addItemCart(item)}
                                            >
                                                +
                                            </button>
                                            {item.amount}
                                            <button 
                                            className='ml-4 text-2xl font-bold'
                                            onClick={()=>removeItemCart(item)}
                                            >
                                                -
                                            </button>

                                    </td>

                                    <td>
                                        <strong>
                                            {item.precio.toLocaleString('es-PY',{
                                            style:'currency',
                                            currency:'PYG'
                                            })}
                                        </strong>

                                    </td>
                                    </tr>
                                ))}

                                

                            </tbody>
                        </table>

                        <Link to='/'>
                                <button className='bg-black text-white px-4 py-1 w-fit cursor-pointer'> ver más</button>
                        </Link>
                    </div> 

                    <div className=' shadow w-full  max-w-sm px-4 py-4 '>
                        <h2 className='border-b border-gray-400 py-2 mb-4 font-bold'>Resumen del Pedido</h2>
                        <div className='mb-8'>
                            <div className='flex justify-between mb-4 font-medium'>
                                <span >Total Productos</span>
                                <span>{cantidad} items</span>
                            </div>

                            <div className='flex justify-between mb-8'>
                                <span className='font-medium'>Total Precio</span>
                                <strong>{totalP}</strong>
                            </div>
                            <div>
                                <p className='text-gray-500'> 🚚 El envío no está incluido en el total y se cobrará de manera adicional.</p>
                            </div>

                        </div>
                       
                         <a 
                        onClick={handleWhatsApp} 
                        rel='external'
                        className='flex items-center justify-center  text-sm bg-black px-6 py-2   text-white  font-bold cursor-pointer'
                        >
                            FINALIZAR COMPRA 
                            
                        </a>


                    </div>


                </main> 
                )
            }
        </div>
    )
}