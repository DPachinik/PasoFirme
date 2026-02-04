import { createContext } from  'react'

type AuthContextProps ={
    signed:boolean;
    loadingAdmin:boolean;
    uid:string | undefined;
}

export const AuthContext = createContext({} as AuthContextProps)