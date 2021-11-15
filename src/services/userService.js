import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";

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

export const login = (dispatch, email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            dispatch({ type: "login", user });
        })
        .catch((error) => {
            dispatch({ type: "error", error });
        });
};
