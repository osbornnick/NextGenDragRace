import { db } from "./initialize_firebase";
import {
    collection,
    getDocs,
    query,
    where,
    doc,
    setDoc,
    addDoc,
    updateDoc,
    increment,
    deleteDoc,
} from "@firebase/firestore";
import { getAuth } from "@firebase/auth";
import { getQueenById } from "./queenService";

export const getRostersForCurrentUser = (dispatch) => {
    const auth = getAuth();
    if (auth.currentUser) {
        const q = query(
            collection(db, "rosters"),
            where("user", "==", auth.currentUser.uid)
        );
        getDocs(q).then((snap) => {
            const myRosters = snap.docs.map((doc) => {
                return { ...doc.data(), id: doc.id };
            });
            dispatch({ type: "set-rosters", myRosters });
        });
    } else return null;
};

export const getRostersQueens = (id) => {
    return getDocs(collection(db, `rosters/${id}/queens`)).then((snap) =>
        snap.docs.map((doc) => doc.data())
    );
};

export const addQueenToRoster = async (dispatch, queen, roster) => {
    setDoc(doc(db, `rosters/${roster.id}/queens`, queen.id), {
        ...queen,
        rank: roster.numQueens + 1,
    });
    updateDoc(doc(db, "rosters", roster.id), { numQueens: increment(1) });
    roster.numQueens++;
    dispatch({ type: "update-roster", roster });
};

export const updateRoster = async (dispatch, roster) => {
    updateDoc(doc(db, "rosters", roster.id), { name: roster.name });
    dispatch({ type: "update-roster", roster });
};

export const removeQueenFromRoster = async (dispatch, queen, roster) => {
    // get queens with higher rank
    const q = query(
        collection(db, `rosters/${roster.id}/queens`),
        where("rank", ">", queen.rank)
    );
    const queenSnap = await getDocs(q);
    // decrease rank of queens with higher rank
    queenSnap.forEach((q) => updateDoc(q.ref, { rank: increment(-1) }));
    // remove queen from this roster object
    deleteDoc(doc(db, `rosters/${roster.id}/queens`, queen.id));
};

export const newRoster = (dispatch, name) => {
    const auth = getAuth();
    const roster = {
        name,
        queenCount: 0,
        user: auth.currentUser.uid,
    };
    addDoc(doc(db, "rosters"), roster);
    dispatch({ type: "add-roster", roster });
};
