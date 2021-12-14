import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import {
    doc,
    getDoc,
    setDoc,
    query,
    limit,
    orderBy,
    collection,
    Timestamp,
    getDocs,
} from "firebase/firestore";
import { db } from "./initialize_firebase.js";
const auth = getAuth();

export const createUser = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            setDoc(doc(db, "users", user.uid), {
                type: "standard",
                verified: false,
                dateJoined: Timestamp.now(),
                bio: "",
            });
            return 200;
        })
        .catch((error) => {
            return error.code;
        });
};

export const updateCurrentUser = async (dispatch, user) => {
    const auth = getAuth();
    if (auth.currentUser) {
        dispatch({ type: "update-user", currentUser: user });
        return setDoc(doc(db, "users", auth.currentUser.uid), user, {
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
        return { ...docSnap.data(), id: docSnap.id };
    } else return null;
};

export const getNewestUser = () => {
    const q = query(
        collection(db, "users"),
        orderBy("dateJoined", "desc"),
        limit(1)
    );
    return getDocs(q).then((snap) => {
        const ref = snap.docs.at(0);
        return { ...ref.data(), id: ref.id };
    });
};
