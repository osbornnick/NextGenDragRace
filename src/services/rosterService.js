import { db } from "./initialize_firebase";
import {
    collection,
    getDocs,
    query,
    where,
    doc,
    arrayUnion,
    addDoc,
    updateDoc,
    increment,
    arrayRemove,
    getDoc,
} from "@firebase/firestore";
import { getAuth } from "@firebase/auth";

export const getRostersForCurrentUser = async (dispatch) => {
    const auth = getAuth();
    if (auth.currentUser) {
        const q = query(
            collection(db, "rosters"),
            where("user", "==", auth.currentUser.uid)
        );
        const myRosters = await getDocs(q).then((snap) => {
            return snap.docs.map((doc) => {
                return { ...doc.data(), id: doc.id };
            });
        });
        for (const roster of myRosters) {
            roster.queens = await getRostersQueens(roster);
        }
        dispatch({ type: "set-rosters", myRosters });
    } else return null;
};

export const getRoster = async (dispatch, id) => {
    let roster = await getDoc(doc(db, "rosters", id)).then((snap) => {
        return { ...snap.data(), id: snap.id };
    });
    let queens = await getRostersQueens(roster);
    roster = { ...roster, queens };
    dispatch({ type: "set-roster", roster });
};

export const getRostersQueens = async (roster) => {
    const queens = [];
    for (const queen of roster.queens) {
        const qData = await getDoc(queen).then((snap) => {
            return { ...snap.data(), id: snap.id };
        });
        queens.push(qData);
    }
    return queens;
};

export const addQueenToRoster = async (dispatch, queen, roster) => {
    const queenRef = doc(db, `queens/${queen.id}`);
    updateDoc(doc(db, "rosters", roster.id), {
        queenCount: increment(1),
        queens: arrayUnion(queenRef),
    });
    roster.queenCount++;
    roster.queens.push(queen);
    dispatch({ type: "update-roster", roster });
};

export const updateRoster = async (dispatch, roster) => {
    updateDoc(doc(db, "rosters", roster.id), { name: roster.name });
    dispatch({ type: "update-roster", roster });
    dispatch({ type: "update-rosters", roster });
};

export const removeQueenFromRoster = async (dispatch, queen, roster) => {
    const queenRef = doc(db, `queens/${queen.id}`);
    updateDoc(doc(db, "rosters", roster.id), {
        queenCount: increment(-1),
        queens: arrayRemove(queenRef),
    });
    roster.queenCount--;
    roster.queens.filter((q) => q.id !== queen.id);
    dispatch({ type: "update-roster", roster });
};

export const newRoster = (dispatch, name) => {
    const auth = getAuth();
    const roster = {
        name,
        queenCount: 0,
        user: auth.currentUser.uid,
        queens: [],
    };
    addDoc(doc(db, "rosters"), roster);
    dispatch({ type: "add-roster", roster });
};

export const deleteRoster = (dispatch, id) => {
    // must delete subcollections
};
