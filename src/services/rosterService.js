import { db } from "./initialize_firebase";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";

export const getRostersForCurrentUser = async (dispatch) => {
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
