import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCommentsOnEntity } from "../../services/commentService";
import { getUserDetails } from "../../services/userService";

const commentSelector = (state) => state.comments;
const userSelector = (state) => state.user;

const CommentSection = (props) => {
    const dispatch = useDispatch();
    const { parentEntityType, parentId } = props;
    const { comments } = useSelector(commentSelector);
    const { user } = useSelector(userSelector);
    const [newComment, setNewComment] = useState("");
    useEffect(() => {
        getCommentsOnEntity(dispatch, parentEntityType, parentId);
    }, [parentEntityType, parentId]);
    return (
        <div>
            <ul className="list-group">
                <li className="list-group-item">Comments</li>
                <li className="list-group-item">
                    {user ? (
                        <div className="input-group">
                            <textarea
                                type="text"
                                className="form-control"
                                placeholder="What do you think..."
                            />
                            <button className="btn btn-secondary">Post</button>
                        </div>
                    ) : (
                        "login to post"
                    )}
                </li>
                {comments
                    ? comments.map((c, i) => <Comment comment={c} _key={i} />)
                    : ""}
            </ul>
        </div>
    );
};

const Comment = (props) => {
    const { comment } = props;
    const [author, setAuthor] = useState(null);
    useEffect(() => {
        getUserDetails(comment.writtenBy).then(setAuthor);
    }, []);

    return (
        <li className="list-group-item" key={props._key}>
            <div>@{author ? author.handle : ""}</div>
            {comment.text}
        </li>
    );
};

export default CommentSection;
