import { useEffect, useState, type ReactNode } from "react"
import { AuthContext } from './authContext'
import { auth } from '../../services/firebaseConnection'
import { onAuthStateChanged } from 'firebase/auth'


interface AuthProviderProps{
    children:ReactNode;
}

interface AdminProps{
    uid:string;
    email:string | null;
}

function AuthProvider({children}:AuthProviderProps){
    const [admin, setAdmin] = useState<AdminProps | null>(null);
    const [loadingAdmin, setLoadingAdmin] = useState<boolean>(true);

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, (user)=>{
            if(user){
                setLoadingAdmin(false)
                setAdmin({
                    uid:user?.uid,
                    email:user?.email
                })

            }else{
                setLoadingAdmin(false)
                setAdmin(null)
            }
            
        })

        return ()=>{
            unsub();
        }

    }, [])


    return(
        <AuthContext.Provider
        value={{
            signed:!!admin,
            loadingAdmin
        }}>
            {children}
        </AuthContext.Provider>
        

    )
}

export default AuthProvider