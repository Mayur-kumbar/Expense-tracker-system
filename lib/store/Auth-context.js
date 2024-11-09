"use client"

import { createContext } from "react";

import {auth} from "@/lib/Firebase"
import { GoogleAuthProvider , signInWithPopup , signOut } from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth"

export const authContext = createContext({
    user : null,
    loading : false,
    googleLoginHandler: async () => {},
    logout : async () => {}
})

export default function AuthContextProvider({children}){
    
    const [user , loading] = useAuthState(auth)

    const googleProvider = new GoogleAuthProvider

    const googleLoginHandler = async () => {
        try {
            signInWithPopup(auth , googleProvider)
        } catch (error) {
            throw error
        }
    }

    const logout = () => {
        signOut(auth)
    }
    
    return <authContext.Provider value={{user , loading , googleLoginHandler, logout}}>{children}</authContext.Provider>
}
    
