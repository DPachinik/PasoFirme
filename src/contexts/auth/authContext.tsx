import { createContext } from  'react'

type AuthContextProps ={
    signed:boolean;
    loadingAdmin:boolean;
}

export const AuthContext = createContext({} as AuthContextProps)