import { db } from "./initialize_firebase.js";
import {
    collection,
    query,
    where,
    getDocs,
    addDoc,
    orderBy,
    Timestamp,
    updateDoc,
    doc,
} from "firebase/firestore";

export const getCommentsOnEntity = (dispatch, entityType, entityId) => {
    entityId = Number.isInteger(entityId) ? parseInt(entityId) : entityId;
    const q = query(
        collection(db, "comments"),
        where("onEntity", "==", entityType),
        where("onID", "==", entityId),
        orderBy("dateCreated", "desc")
    );
    return getDocs(q).then((querySnapshot) => {
        const comments = querySnapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
        });
        dispatch({
            type: "set-comments",
            comments,
        });
        return comments;
    });
};

export const deleteComment = (dispatch, commentId) => {
    updateDoc(doc(db, "comments", commentId), { isDeleted: true });
    dispatch({ type: "delete-comment", delete: commentId });
};

export const makeComment = (dispatch, onEntity, onID, text, userID) => {
    onID = Number.isInteger(onID) ? parseInt(onID) : onID;
    const comment = {
        onEntity,
        onID,
        text,
        writtenBy: userID,
        dateCreated: Timestamp.now(),
        isDeleted: false,
    };
    console.log(comment);
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
        where("writtenBy", "==", userID),
        orderBy("dateCreated", "asc")
    );
    getDocs(q)
        .then((snap) =>
            snap.docs.map((d) => {
                return { ...d.data(), id: d.id };
            })
        )
        .then((data) => dispatch({ type: "set-comments", comments: data }));
};
