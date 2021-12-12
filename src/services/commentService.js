import { db } from "./initialize_firebase.js";
import {
    collection,
    query,
    where,
    getDocs,
    addDoc,
    orderBy,
    Timestamp,
} from "firebase/firestore";

export const getCommentsOnEntity = (dispatch, entityType, entityId) => {
    const q = query(
        collection(db, "comments"),
        where("onEntity", "==", entityType),
        where("onID", "==", parseInt(entityId)),
        orderBy("dateCreated", "desc")
    );
    return getDocs(q).then((querySnapshot) => {
        const comments = querySnapshot.docs.map((doc) => doc.data());
        dispatch({
            type: "set-comments",
            comments,
        });
        return comments;
    });
};

export const makeComment = (dispatch, onEntity, onID, text, userID) => {
    const comment = {
        onEntity,
        onID: parseInt(onID),
        text,
        writtenBy: userID,
        dateCreated: Timestamp.now(),
    };
    addDoc(collection(db, "comments"), comment);
    dispatch({
        type: "add-comment",
        comment,
    });
};

export const countComments = (onEntity, onID) => {
    const q = query(
        collection(db, "comments"),
        where("onEntity", "==", onEntity),
        where("onID", "==", parseInt(onID))
    );
    return getDocs(q).then((snap) => snap.size);
};

export const getUsersComments = (dispatch, userID) => {
    const q = query(
        collection(db, "comments"),
        where("writtenBy", "==", userID)
    );
    getDocs(q)
        .then((snap) =>
            snap.docs.map((d) => {
                return { ...d.data(), id: d.id };
            })
        )
        .then((data) => dispatch({ type: "set-comments", comments: data }));
};
