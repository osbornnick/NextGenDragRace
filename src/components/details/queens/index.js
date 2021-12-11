import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getQueenById } from "../../../services/queenService";
import { useParams } from "react-router-dom";
import CommentSection from "../../comment";
import "./queenImage.css";

const selectQueen = (state) => state.queen;

const Details = (props) => {
    const params = useParams();
    const dispatch = useDispatch();
    const { queen } = useSelector(selectQueen);
    useEffect(() => {
        getQueenById(dispatch, params.id);
    }, []);
    if (!queen) return "Loading";
    return (
        <>
            <div className="row mb-3">
                <div className="col-md-6 d-flex">
                    <img
                        src={queen.image_url}
                        className="img-fluid mx-auto col-lg-8 col-12"
                        style={{ borderRadius: "10%" }}
                        alt="queens profile"
                    />
                </div>
                <div className="col-md-6 d-flex flex-column justify-content-center">
                    <div className="mb-4">
                        <h1>{queen.name}</h1>
                        <div className="list-group">
                            <div className="list-group-item d-flex align-items-center">
                                <i className="fas fa-hand-holding-heart me-2"></i>
                                <span className="fst-italic">
                                    {queen.quote}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4>Season appearances & ranking</h4>
                        <ul className="list-group">
                            {queen.seasons.map((season) => {
                                return (
                                    <li className="list-group-item">
                                        <i className="fas fa-star me-2"></i>
                                        <span>
                                            Season {season.seasonNumber}
                                        </span>
                                        <span> Rank {season.place}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 mb-4">
                    <Accordian
                        name="Episodes"
                        list={queen.episodes}
                        mapFunction={episodeMap}
                    />
                </div>
                <div className="col-lg-6 mb-4">
                    <Accordian
                        name="Challenges"
                        list={queen.challenges}
                        mapFunction={challengeMap}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <CommentSection
                        parentEntityType="queens"
                        parentId={queen.id}
                    />
                </div>
            </div>
        </>
    );
};

const episodeMap = (episode) => {
    return (
        <li className="list-group-item d-flex align-items-center">
            <i className="fas fa-video me-2"></i>
            <span>
                "{episode.title}" S{episode.seasonId} E{episode.episodeInSeason}{" "}
                ({episode.airDate})
            </span>
        </li>
    );
};

const challengeMap = (challenge) => {
    return (
        <li className="list-group-item d-flex align-items-center">
            {challenge.description}
            {challenge.won && (
                <i
                    className="fas fa-trophy ms-1"
                    style={{ color: "#FFD700" }}
                ></i>
            )}
        </li>
    );
};

const Accordian = (props) => {
    const { name, list, mapFunction } = props;
    const [caret, setCaret] = useState("down");
    const toggleCaret = () => {
        setCaret(caret === "down" ? "up" : "down");
    };
    return (
        <>
            <ul className="list-group">
                <li
                    className="list-group-item list-group-item-action d-flex align-items-center justify-content-between"
                    role="button"
                    data-bs-toggle="collapse"
                    data-bs-target={"#" + name}
                    onClick={() => toggleCaret()}
                >
                    <h4 className="mb-0">{name}</h4>
                    <i className={"fas fa-caret-" + caret}></i>
                </li>
                <div className="collapse" id={name}>
                    {list.map(mapFunction)}
                </div>
            </ul>
        </>
    );
};

export default Details;
