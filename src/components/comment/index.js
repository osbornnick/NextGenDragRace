import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCommentsOnEntity } from "../../services/commentService";
import { getUserDetails } from "../../services/userService";
import { makeComment } from "../../services/commentService";

const commentSelector = (state) => state.comments;
const userSelector = (state) => state.user;

const CommentSection = (props) => {
    const dispatch = useDispatch();
    const { parentEntityType, parentId } = props;
    const { comments } = useSelector(commentSelector);
    const { user } = useSelector(userSelector);
    const [newComment, setNewComment] = useState("");
    const handlePostClick = () =>
        makeComment(dispatch, parentEntityType, parentId, newComment, user.id);
    useEffect(() => {
        getCommentsOnEntity(dispatch, parentEntityType, parentId);
    }, [parentEntityType, parentId]);
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
                        user={user}
                    />
                </li>
                {comments
                    ? comments.map((c, i) => <Comment comment={c} _key={i} />)
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
    useEffect(() => {
        getUserDetails(comment.writtenBy).then(setAuthor);
    }, []);
    const d = new Date(comment.dateCreated.seconds * 1000);
    return (
        <li className="list-group-item" key={props._key}>
            <div>
                @{author ? author.handle : ""} -{" "}
                <span style={{ opacity: 0.5 }}>{d.toDateString()}</span>
            </div>
            {comment.text}
        </li>
    );
};

export default CommentSection;
