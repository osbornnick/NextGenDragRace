import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { DateTime } from "luxon";

const CommentSummary = (props) => {
    const { title } = props;
    const navigate = useNavigate();
    const { comments } = useSelector((state) => state.comments);
    if (!comments) return "Loading...";
    comments.sort((a, b) => b.dateCreated.seconds - a.dateCreated.seconds);
    return (
        <ul className="list-group">
            <li className="list-group-item">
                <h5 className="m-0">{title || "Comments"}</h5>
            </li>
            {comments.map((comment, i) => (
                <li
                    className="list-group-item list-group-item-action d-flex align-items-center"
                    key={i}
                    onClick={() =>
                        navigate(`/details/${comment.onEntity}/${comment.onID}`)
                    }
                    style={{ cursor: "pointer" }}
                >
                    <div>
                        {comment.text}
                        <div className="text-muted">
                            {DateTime.fromSeconds(
                                comment.dateCreated.seconds
                            ).toRelative()}
                        </div>
                    </div>
                    <i className="far fa-arrow-alt-circle-right ms-auto"></i>
                </li>
            ))}
        </ul>
    );
};

export default CommentSummary;
