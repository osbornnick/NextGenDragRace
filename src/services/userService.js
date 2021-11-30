import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import app from "./initialize_firebase.js";
const auth = getAuth();

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
