import React, { useEffect } from 'react'

// Firebase
// import { auth } from '../Firebase/config';
// import { onAuthStateChanged } from "firebase/auth";

export const Context = React.createContext<string | null>(null);

export default function AuthContext({ children }: { children: any }) {

    useEffect(() => {
        // onAuthStateChanged(auth, (user) => {
        //     if (user) {
        //         const uid = user.uid;
        //         console.log(uid + ' logged in')
        //     } else {
        //         console.log('user logged out')
        //     }
        // });
    }, []);

    return (
        <Context.Provider value='hello world'>
            {children}
        </Context.Provider>
    )
}
