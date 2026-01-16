import { Link } from "react-router-dom";
import { Input } from "../../components/input";

import {useForm} from 'react-hook-form'
import {  z } from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'

const schema = z.object({
    email:z.string().trim().min(1,{
        message:'el email es obligatorio'
    }),
    password:z.string().trim().min(1,{
        message:'el password es obligatorio'
    })
})

type FormData = z.infer< typeof schema>

export function Login(){

    const { register, handleSubmit, formState:{errors}} = useForm<FormData>({
        resolver:zodResolver(schema),
        mode:"onChange"
        
    })

    function onSubmit(data:FormData){
        console.log(data)

    }


    return(
        <div className=" w-full h-dvh flex flex-col items-center justify-center ">

            <Link className="font-bold text-2xl md:text-4xl text-amber-50 mb-4" to='/'>
                <span className='bg-[#8B4513] bg-clip-text text-transparent select-none'>PASO</span>
                <span className='bg-[#3D4035] bg-clip-text text-transparent select-none'>FIRME</span>
            </Link>


            <form 
            onSubmit={handleSubmit(onSubmit)}
            className=" w-full max-w-2xl  flex  flex-col mx-auto bg-white justify-center items-center gap-4 px-8 py-6 rounded-xl">

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

                <button type="submit" className=" bg-[#3D4035] h-8 w-full text-white text-lg font-medium px-6 rounded-lg cursor-pointer">Ingresar</button>
            </form>

        </div>
    )
}