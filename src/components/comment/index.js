import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCommentsOnEntity } from "../../services/commentService";

const commentSelector = (state) => state.comments.comments;

const CommentSection = (props) => {
    const dispatch = useDispatch();
    console.log(props);
    const { parentEntityType, parentId } = props;
    const comments = useSelector(commentSelector);
    useEffect(() => {
        getCommentsOnEntity(dispatch, parentEntityType, parentId);
    }, []);
    return <>{JSON.stringify(comments)}</>;
};

export default CommentSection;
