import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDGsT7x50e00MIuLXSynv7nNU4Ro85QNMA",
    authDomain: "reptree-6f706.firebaseapp.com",
    projectId: "reptree-6f706",
    storageBucket: "reptree-6f706.appspot.com",
    messagingSenderId: "605389078849",
    appId: "1:605389078849:web:eea23136aba1968f97a1c0"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();