// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAocGd7jmUkwQqJALwPXbUNy4I98ixZKD0",
    authDomain: "rupaulsfantasyleague.firebaseapp.com",
    projectId: "rupaulsfantasyleague",
    storageBucket: "rupaulsfantasyleague.appspot.com",
    messagingSenderId: "160994438",
    appId: "1:160994438:web:7ac4f7f2398878ea466d07",
    measurementId: "G-PHB8F71DX7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
