import { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/cart/CartContext';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import toast from 'react-hot-toast';
import styles from './carrito.module.css'

export function Carrito(){

    const {cart, addItemCart, removeItemCart, totalP, setCart } = useContext(CartContext);
    const [nombre, setNombre]= useState('');
    const [ci, setCi]= useState('');
    const [ciudad, setCiudad]= useState('');


    const cantidad = cart.reduce((total, item)=> total +Number(item.amount), 0 )

    function handleWhatsApp(){

        if(!nombre || !ci || !ciudad ){
            return toast.error('Debe completar sus datos')
        }

        const phone ="5950992988397";

        const iconZapato = "\u{1F45F}"; // 👟
        const iconHello = "\u{1F44B}" ;//👋 
        const iconMoney = "\u{1F4B0}"; //💰
        const iconPack ="\u{1F4E6}";//📦
        const iconLocal="\u{1F4CD}";//📍
        const iconUser = "\u{1F464}";//👤
        const iconId = "\u{1F194}";

        const productos = cart.map((item)=>{
            return `
            ${iconZapato} *Modelo:* ${item.modelo}
            Talle: ${item.talle}
            Precio: ${item.precio.toLocaleString('es-PY',{
                style:'currency',
                currency:'PYG'
            })}
            Cantidad: ${item.amount}
            Subtotal: ${item.total.toLocaleString('es-PY',{
                style:'currency',
                currency:'PYG'   
            })}

            `;

        }).join('\n');

        const mensaje = `
        ${iconHello} Hola! vengo desde la Web PasoFirme, quiero consultar la disponibilidad de este zapato:
        ${productos}
        ---------------------------------------------
        ${iconPack}*TOTAL PRODUCTOS:* ${cantidad}
        ${iconMoney}*TOTAL:* ${totalP}
        ---------------------------------------------
        *Estos son mis datos:*
        ${iconUser}*Nombre:* ${nombre}
        ${iconId}*CI:* ${ci}
        ${iconLocal}*Destino:* ${ciudad}
        `;

        const url = new URL("https://api.whatsapp.com/send");
        url.searchParams.set("phone", phone);
        url.searchParams.set("text", mensaje);
        window.open(url.toString(), "_blank");

        setCart([]);

    };



    return(
        <div className="w-full max-w-7xl mx-auto   ">
            <div className='flex items-center justify-center w-full gap-4 mb-2 mt-6'>
                
                <h1 className="font-semibold text-3xl     text-secondary ">
                    Tu Carrito 
                </h1>
                <FiShoppingCart size={24} className='text-white -rotate-12'/>

            </div>


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
                <main className='flex flex-col md:flex-row  w-full gap-8 sm:px-2'>
                    
                    <div className='w-full flex-2'>   

                        <table>
                            <thead>
                                <tr >
                                    <th className='text-start pl-4 font-medium rounded-tl rounded-bl'>Productos</th>
                                    <th className='text-center font-medium'>Cantidad</th>
                                    <th className='font-medium rounded-tr rounded-br'>Precio</th>
                                </tr>
                            </thead>

                            <tbody className='text-center' id='tbody' >
                                
                                {cart.map((item)=>(
                                    <tr 
                                    key={item.id} 
                                    className={styles.tr}>
                                        <td 
                                        className={`rounded-tl-lg rounded-bl-lg ${styles.td} `}
                                        data-label='Producto'
                                        >
                                            <div className='flex   w-full max-w-3xs  '>
                                                <img 
                                                src={item.imagenes[0].url}
                                                className=' w-30 lg:min-w-40 h-25 object-contain object-center'
                                                />

                                                <div className=' flex flex-col justify-center  text-start '>
                                                    <div className='  pl-4 lg:pl-16'>
                                                        <p className='font-medium text-primary lg:text-nowrap '>{item.modelo}</p>
                                                        <span className='block text-start text-secondary-rel text-nowrap '>Talle: {item.talle}</span>
                                                    </div>

                                                </div> 
                                            </div> 
                                        </td>

                                        <td 
                                        className={styles.td}
                                        data-label='Cantidad'
                                        >
                                            <div className=' px-2 md:px-0 flex items-center justify-center bg-linear-to-t to-[#0B2D2E] via-[#2A4D4E] from-[#0B2D2E] rounded-md text-white gap-2 mr-12 sm:mr-0 '>
                                                <button 
                                                className=' text-2xl font-bold cursor-pointer '
                                                onClick={()=>addItemCart(item)}
                                                >
                                                    <FaPlus  className='text-xs md:text-md'/>
                                                </button>

                                                <div className='mx-2' >
                                                    {item.amount}
                                                </div>
                                                
                                                <button 
                                                className='text-2xl font-bold cursor-pointer'
                                                onClick={()=>removeItemCart(item)}
                                                >
                                                    <FaMinus className='text-xs md:text-md ' />
                                                </button>
                                            </div>
                                        </td>

                                        <td 
                                        className={`rounded-tr-lg rounded-br-lg text-secondary-rel ${styles.td} ` }
                                        data-label='Precio'
                                        >
                                            <div className='mr-8 md:mr-0'>
                                                <strong >
                                                    {item.precio.toLocaleString('es-PY',{
                                                    style:'currency',
                                                    currency:'PYG'
                                                    })}
                                                </strong>
                                            </div>


                                        </td>
                                    </tr>
                                ))}

                            </tbody>

                        </table>

                        <div className='w-full flex md:justify-center'>
                            <Link 
                            to='/'
                            className='mx-4'
                            >
                                    <button className="bg-linear-to-t to-[#E86343] via-[#E86343] from-[#C14426]  text-white   w-full max-w-3xs font-medium flex  items-center justify-center gap-4 cursor-pointer  px-4 rounded"> seguir comprando</button>
                            </Link>
                        </div>

                    </div> 

                    <div className=' flex-1 mx-auto w-full  max-w-sm px-4 py-2 border border-[#2A4D4E]  rounded-lg'>
                        <h2 className='border-b border-[#2A4D4E]  py-2 mb-4 font-semibold text-white'>Resumen del Pedido</h2>
                        <div className='mb-8'>
                            <div className='flex justify-between mb-4 font-medium text-white'>
                                <span >Total Productos</span>
                                <span>{cantidad} items</span>
                            </div>

                            <div className='flex justify-between mb-8'>
                                <span className='font-medium text-white'>Total Precio</span>
                                <strong className='text-secondary text-lg'>{totalP}</strong>
                            </div>

                            <div>
                                <p className='text-white mb-2'>Completa tus datos</p>


                                <input
                                    className='w-full max-w-2xl pl-2  h-8 text-primary bg-white rounded outline-none mb-4' 
                                    type='text' 
                                    placeholder='Nombre y Apellido'
                                    value={nombre}
                                    onChange={(e)=>setNombre(e.target.value)}
                                    required
                                />

                                <input
                                    className='w-full max-w-2xl pl-2  h-8 text-primary bg-white rounded outline-none mb-4' 
                                    type='text' 
                                    placeholder='C.I'
                                    value={ci}
                                    onChange={(e)=>setCi(e.target.value)}
                                    required
                                />

                                <input
                                    className='w-full max-w-2xl pl-2  h-8 text-primary bg-white rounded  outline-none mb-4' 
                                    type='text' 
                                    placeholder='Destino'
                                    value={ciudad}
                                    onChange={(e)=>setCiudad(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <p className='text-[#2A4D4E] text-sm'> 🚚 El envío no está incluido en el total y se cobrará de manera adicional.</p>
                            </div>

                        </div>
                       
                         <a 
                        onClick={handleWhatsApp} 
                        rel='external'
                        className='flex items-center justify-center  text-sm  px-6 py-1   font-medium cursor-pointer bg-linear-to-t to-[#E86343] via-[#E86343] from-[#C14426]  text-white rounded '
                        >
                            Finalizar compra
                            
                        </a>


                    </div>


                </main> 
                )
            }
        </div>
    )
}