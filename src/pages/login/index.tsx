import { Link, Navigate } from "react-router-dom";
import { Input } from "../dashboard/components/input";
import {useForm} from 'react-hook-form'
import {  z } from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { auth } from '../../services/firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import  Toast  from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext} from '../../features/auth/authContext'
import logo from '/logo.png'




const schema = z.object({
    email:z.string().trim().min(1,{
        message:'introduzca su email'
    }),
    password:z.string().trim().min(1,{
        message:'introduzca su contraseña'
    })
})

type FormData = z.infer< typeof schema>



export function Login(){

    const { loadingAdmin, signed } = useContext(AuthContext);
  
    const navigate = useNavigate();
    const { register, handleSubmit, formState:{errors}} = useForm<FormData>({
        resolver:zodResolver(schema),
        mode:"onChange"
        
    })



    function onSubmit(data:FormData){
        signInWithEmailAndPassword(auth, data.email, data.password)
        .then((user)=>{
            console.log(user.user);
            navigate('/dashboard', {replace:true})
        })
        .catch((error) => {
            let errorMessage = 'Error al iniciar sesión';

            switch(error.code){
                case 'auth/invalid-credential':
                    errorMessage = 'Correo o contraseña incorrectos';
                    break;

                case 'auth/user-disabled':
                    errorMessage = 'Usuario deshabilitado';
                    break;

                case 'auth/too-many-requests':
                    errorMessage = 'Demasiados intentos, intenta más tarde';
                    break;

                case 'auth/network-request-failed':
                    errorMessage = 'Error de conexión';
                    break;

                case 'auth/invalid-email':
                    errorMessage = 'Correo inválido';
                    break;

                default:
                    errorMessage = 'Error inesperado, intenta nuevamente';
            }

            Toast.error(errorMessage, {style:{backgroundColor:'#dc2626' , color:'#ffff'}});
        });


    }

    if(loadingAdmin){
        return <div className='h-screen w-full items-center justify-center text-2xl font-semibold'>Cargando...</div>
    }

    if(signed){
        
        return <Navigate to='/dashboard' replace />
    }


    return(
        <div className=" w-full h-dvh flex flex-col items-center justify-center ">
                <Link className=" relative flex font-bold text-4xl text-amber-50" to='/'>

                    <span className='bg-white bg-clip-text text-transparent select-none'>Paso</span>
                    <span className='bg-secondary bg-clip-text text-transparent select-none'>Firme</span>
                    <img src={logo} className='w-14 absolute -right-12'/>
                </Link>



            <form 
            onSubmit={handleSubmit(onSubmit)}
            className=" w-full max-w-2xl  flex  flex-col mx-auto justify-center items-center gap-4 px-8 py-6 rounded-xl">

                <Input
                    type="email"
                    name="email"
                    placeholder="correo electrónico"
                    register ={register}
                    error={errors.email?.message}
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="contraseña"
                    register ={register}
                    error={errors.password?.message}
                />

                <button type="submit" className='bg-linear-to-t to-[#C14426] via-[#E86343] from-[#C14426] text-white px-4  w-full max-w-3xs rounded-sm font-medium  cursor-pointer'>Ingresar</button>
            </form>

        </div>
    )
}