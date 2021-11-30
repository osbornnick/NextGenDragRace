import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import app from "./initialize_firebase.js";
const auth = getAuth();

export const createUser = (dispatch, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            dispatch({ type: "login", user });
        })
        .catch((error) => {
            // const errorCode = error.code;
            // const errorMessage = error.message;
            dispatch({ type: "error", error });
        });
};

export const login = async (dispatch, email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            dispatch({ type: "login", user });
            return 200;
        })
        .catch((error) => {
            dispatch({ type: "error", error });
            return error.code;
        });
};
