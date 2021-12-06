import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, app } from "./initialize_firebase.js";
const auth = getAuth();

// TODO generate entry in users table
export const createUser = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            setDoc(doc(db, "users", user.uid), { type: "standard" });
            return 200;
        })
        .catch((error) => {
            return error.code;
        });
};

export const updateCurrentUser = async (obj) => {
    const auth = getAuth();
    if (auth.currentUser) {
        return setDoc(doc(db, "users", auth.currentUser.uid), obj, {
            merge: true,
        });
    } else {
        return Promise.reject(new Error("current user not authenticated"));
    }
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

export const getUserDetails = async (id) => {
    const docSnap = await getDoc(doc(db, "users", id.toString()));
    if (docSnap.exists()) {
        return docSnap.data();
    } else return null;
};
