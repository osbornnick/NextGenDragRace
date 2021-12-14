import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    getCommentsOnEntity,
    makeComment,
    deleteComment,
} from "../../services/commentService";
import { getUserDetails } from "../../services/userService";
import CommentSummary from "./CommentSummary";
import { useNavigate } from "react-router";

const commentSelector = (state) => state.comments;
const userSelector = (state) => state.currentUser;

const CommentSection = (props) => {
    const dispatch = useDispatch();
    const { parentEntityType, parentId } = props;
    const { comments } = useSelector(commentSelector);
    const { currentUser } = useSelector(userSelector);
    useEffect(() => {
        console.log("getting comments for ", parentEntityType, " ", parentId);
        getCommentsOnEntity(dispatch, parentEntityType, parentId);
    }, [dispatch, parentEntityType, parentId]);
    return (
        <div>
            <ul className="list-group">
                <li className="list-group-item">
                    <h5 className="mb-0">Comments</h5>
                </li>
                <li className="list-group-item">
                    <PostComment
                        parentEntityType={parentEntityType}
                        parentId={parentId}
                        user={currentUser}
                    />
                </li>
                {comments
                    ? comments.map((c, i) => <Comment comment={c} key={i} />)
                    : ""}
            </ul>
        </div>
    );
};

const PostComment = (props) => {
    const dispatch = useDispatch();
    const { parentEntityType, parentId, user } = props;
    const [newComment, setNewComment] = useState("");
    const handlePostClick = () =>
        makeComment(dispatch, parentEntityType, parentId, newComment, user.id);
    const isDisabled = user ? false : true;
    return (
        <div className="input-group">
            <textarea
                type="text"
                className="form-control"
                placeholder={user ? "What do you think..." : "Login to post"}
                onChange={(e) => setNewComment(e.target.value)}
                disabled={isDisabled}
            />
            <button
                className="btn btn-secondary"
                onClick={handlePostClick}
                disabled={isDisabled}
            >
                Post
            </button>
        </div>
    );
};

const Comment = (props) => {
    const { comment } = props;
    const [author, setAuthor] = useState(null);
    const { currentUser } = useSelector(userSelector);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        getUserDetails(comment.writtenBy).then(setAuthor);
    }, [comment.writtenBy]);
    const d = new Date(comment.dateCreated.seconds * 1000);
    const showDelete =
        currentUser &&
        (currentUser.id === comment.writtenBy || currentUser.type === "admin");
    return (
        <li
            className="list-group-item d-flex align-items-center"
            key={comment.id}
        >
            <div>
                <div
                    onClick={() => navigate("/profile/" + author.id)}
                    style={{ cursor: "pointer" }}
                >
                    @{author ? author.handle : ""} -{" "}
                    <span style={{ opacity: 0.5 }}>{d.toDateString()}</span>
                </div>
                {comment.isDeleted ? <i>Comment deleted</i> : comment.text}
            </div>
            {showDelete && (
                <i
                    className="fas fa-times ms-auto"
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => deleteComment(dispatch, comment.id)}
                ></i>
            )}
        </li>
    );
};

export { CommentSummary };
export default CommentSection;
