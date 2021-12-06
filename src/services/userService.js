import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { app } from "./initialize_firebase.js";
const auth = getAuth();

// TODO generate entry in users table
export const createUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return 200;
            // dispatch({ type: "login", user });
        })
        .catch((error) => {
            return error.code;
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // dispatch({ type: "error", error });
        });
};

export const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            return 200;
        })
        .catch((error) => {
            return error.code;
        });
};

export const logout = async () => {
    signOut(auth)
        .then(() => {
            // signout successful
        })
        .catch(console.log);
};

// TODO
export const getUserByID = async (id) => {
    return id;
};
