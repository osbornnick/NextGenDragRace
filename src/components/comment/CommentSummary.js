import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const CommentSummary = () => {
    const navigate = useNavigate();
    const { comments } = useSelector((state) => state.comments);
    if (!comments) return "Loading...";
    return (
        <ul className="list-group">
            <li className="list-group-item">
                <h5 className="m-0">Comments</h5>
            </li>
            {comments.map((comment) => (
                <li
                    className="list-group-item list-group-item-action d-flex align-items-center"
                    key={comment.id}
                    onClick={() =>
                        navigate(`/details/${comment.onEntity}/${comment.onID}`)
                    }
                >
                    {comment.text}
                    <i className="far fa-arrow-alt-circle-right ms-auto"></i>
                </li>
            ))}
        </ul>
    );
};

export default CommentSummary;
