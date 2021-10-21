import React, { useEffect } from 'react'

// Firebase
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const Context = React.createContext<string | null>(null);


export default function AuthContext({ children }: { children: any }) {

    useEffect(() => {
        const firebaseConfig = {
            apiKey: "AIzaSyDGsT7x50e00MIuLXSynv7nNU4Ro85QNMA",
            authDomain: "reptree-6f706.firebaseapp.com",
            projectId: "reptree-6f706",
            storageBucket: "reptree-6f706.appspot.com",
            messagingSenderId: "605389078849",
            appId: "1:605389078849:web:eea23136aba1968f97a1c0"
        };
        initializeApp(firebaseConfig);

        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;

                console.log(uid + ' logged in')
            } else {
                console.log('user logged out')
            }
        });
    }, []);

    return (
        <Context.Provider value='hello world'>
            {children}
        </Context.Provider>
    )
}
