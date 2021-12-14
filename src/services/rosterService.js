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
    Timestamp,
    orderBy,
    deleteDoc,
} from "@firebase/firestore";
import { getAuth } from "@firebase/auth";

export const getRostersForCurrentUser = async (dispatch) => {
    const auth = getAuth();
    if (auth.currentUser) {
        const q = query(
            collection(db, "rosters"),
            where("user", "==", auth.currentUser.uid),
            orderBy("dateCreated", "asc")
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
        if (snap.exists()) return { ...snap.data(), id: snap.id };
        return false;
    });
    if (!roster) {
        dispatch({
            type: "set-roster",
            roster: { rosterNotFound: true, id: roster.id },
        });
        return;
    }
    if (roster.queens) {
        let queens = await getRostersQueens(roster);
        roster = { ...roster, queens };
    }
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

export const updateRoster = (dispatch, roster) => {
    if (roster.queens) roster.queens = roster.queens.map(queenToRef);
    updateDoc(doc(db, "rosters", roster.id), roster, { merge: true });
    dispatch({ type: "update-roster", roster });
    dispatch({ type: "update-rosters", roster });
};

const queenToRef = (queen) => {
    return doc(db, `queens/${queen.id}`);
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

export const newRoster = async (dispatch) => {
    const auth = getAuth();
    const roster = {
        name: "my new roster",
        queenCount: 0,
        user: auth.currentUser.uid,
        queens: [],
        dateCreated: Timestamp.now(),
    };
    await addDoc(collection(db, "rosters"), roster).then(
        (snap) => (roster.id = snap.id)
    );
    dispatch({ type: "add-roster", roster });
};

export const deleteRoster = (dispatch, roster) => {
    deleteDoc(doc(db, "rosters", roster.id));
    dispatch({ type: "delete-roster", roster });
};

export const getUsersRosters = (userID) => {
    const q = query(collection(db, "rosters"), where("user", "==", userID));
    return getDocs(q)
        .then((snap) => snap.docs.map((d) => d.data()))
        .then(async (data) => {
            for (const roster of data) {
                roster.queens = await getRostersQueens(roster);
            }
            return data;
        });
};
