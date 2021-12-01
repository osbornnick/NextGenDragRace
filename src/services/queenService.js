import { db } from "./initialize_firebase.js";
import {
    collection,
    query,
    getDocs,
    orderBy,
    limit,
    startAfter,
} from "firebase/firestore";

const queenRef = collection(db, "queens");
// get next 10 queens
export const paginateQueens = async (dispatch, startAfterQueen = null) => {
    let q;
    if (startAfterQueen)
        q = query(
            queenRef,
            orderBy("name"),
            limit(25),
            startAfter(startAfterQueen)
        );
    else q = query(queenRef, orderBy("name"), limit(25));
    getDocs(q).then((querySnapshot) => {
        const queens = querySnapshot.docs.map((doc) => doc.data());
        dispatch({
            type: "set-queens",
            queens,
        });
    });
};

// get queen by id
