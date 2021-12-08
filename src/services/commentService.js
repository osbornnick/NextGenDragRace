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

export const getCommentsOnEntity = async (dispatch, entityType, entityId) => {
    const q = query(
        collection(db, "comments"),
        where("onEntity", "==", entityType),
        where("onID", "==", parseInt(entityId)),
        orderBy("dateCreated", "desc")
    );
    getDocs(q).then((querySnapshot) => {
        const comments = querySnapshot.docs.map((doc) => doc.data());
        dispatch({
            type: "set-comments",
            comments,
        });
    });
};

export const makeComment = async (dispatch, onEntity, onID, text, userID) => {
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
