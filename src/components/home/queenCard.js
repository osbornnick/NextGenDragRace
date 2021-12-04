import { useNavigate } from "react-router";
import "./card.css";

export const QueenImage = (props) => {
    const { queen } = props;
    const navigate = useNavigate();
    return (
        <div
            className="image-container overflow-hidden p-0 m-2 rounded position-relative"
            style={{ maxWidth: "12rem", maxHeight: "12rem" }}
            onClick={() => navigate(`details/${queen.id}`)}
        >
            <img
                src={queen.image_url}
                alt="to queens profile"
                className="img-fluid queen-image"
            />
            <h5 className="position-absolute overlay-name top-50 start-50 translate-middle">
                {queen.name}
            </h5>
        </div>
    );
};

export const QueenCard = (props) => {
    const { queen } = props;
    const navigate = useNavigate();
    return (
        <div
            className="card p-0 m-2"
            style={{ maxWidth: "12rem", maxHeight: "12rem" }}
            onClick={() => navigate(`details/${queen.id}`)}
        >
            <div className="card-img-top overflow-hidden">
                <img
                    // className="card-img-top"
                    src={queen.image_url}
                    alt="queen's profile"
                    style={{ width: "15rem" }}
                />
            </div>
            <div className="card-body p-2">
                <h6 className="card-title">
                    {queen.name.length > 17
                        ? queen.name.substring(0, 17) + "..."
                        : queen.name}
                </h6>
            </div>
        </div>
    );
};
