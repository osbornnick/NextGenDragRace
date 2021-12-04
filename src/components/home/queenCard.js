import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./card.css";

export const QueenImage = (props) => {
    const { queen } = props;
    const [imgSrc, setImgSrc] = useState(queen.image_url);
    const fallbackSrc = "/images/rupaul.jpg";
    const onerr = () => {
        console.log("on err event fired");
        setImgSrc(fallbackSrc);
    };
    const navigate = useNavigate();
    // add gold border if winner
    const container_class = queen.winner
        ? "image-container overflow-hidden p-0 m-2 rounded-3 position-relative border border-3"
        : "image-container overflow-hidden p-0 m-2 rounded-3 position-relative";
    return (
        <div
            className={container_class}
            style={{ maxWidth: "12rem", maxHeight: "12rem" }}
            onClick={() => navigate(`details/${queen.id}`)}
        >
            <img
                src={imgSrc ? imgSrc : fallbackSrc}
                alt="to queens profile"
                className="img-fluid queen-image"
                onError={onerr}
            />
            <h5 className="position-absolute overlay-name top-50 start-50 translate-middle">
                {queen.name}
            </h5>
        </div>
    );
};

// currently unused
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
