import { db } from "./initialize_firebase";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";

export const getRostersForCurrentUser = (dispatch) => {
    const auth = getAuth();
    if (auth.currentUser) {
        const q = query(
            collection(db, "rosters"),
            where("user", "==", auth.currentUser.uid)
        );
        getDocs(q).then((snap) => {
            const myRosters = snap.docs.map((doc) => doc.data());
            dispatch({ type: "set-rosters", myRosters });
        });
    } else return null;
};

export const getRostersQueens = (id) => {
    return getDocs(collection(db, `rosters/${id}/queens`)).then((snap) =>
        snap.docs.map((doc) => doc.data())
    );
};
