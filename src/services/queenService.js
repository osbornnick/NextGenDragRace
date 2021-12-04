import { db } from "./initialize_firebase.js";
import {
    collection,
    query,
    getDocs,
    orderBy,
    limit,
    startAfter,
    doc,
    getDoc,
} from "firebase/firestore";

const queenRef = collection(db, "queens");
// get next 10 queens
export const paginateQueens = async (dispatch, startAfterQueen = null) => {
    let q;
    if (startAfterQueen)
        q = query(
            queenRef,
            orderBy("name"),
            limit(10),
            startAfter(startAfterQueen)
        );
    else q = query(queenRef, orderBy("name"), limit(10));
    getDocs(q).then((querySnapshot) => {
        const queens = querySnapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
        });
        dispatch({
            type: "set-queens",
            queens,
        });
    });
};

// get queen by id
export const getQueenById = async (dispatch, id) => {
    const docSnap = await getDoc(doc(db, "queens", id.toString()));
    if (docSnap.exists()) {
        dispatch({ type: "set-queen", queen: docSnap.data() });
    } else return null;
};
