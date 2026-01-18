import {useContext} from 'react'
import  {AuthContext} from '../contexts/auth/authContext'

import type { ReactNode } from "react"
import { Navigate } from 'react-router-dom';



interface PrivateProps{
    children:ReactNode;
}

export function Private({children}:PrivateProps){

    const {loadingAdmin, signed} = useContext(AuthContext);
   

    if(loadingAdmin){
        return <div className='h-screen w-full items-center justify-center text-2xl font-semibold'>Cargando...</div>
    }

    if(!signed){
        
        return <Navigate to='/' />
    }


    return children
}