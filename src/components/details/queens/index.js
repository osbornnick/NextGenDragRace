import React, { useEffect } from "react";
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
                <div className="col-6">
                    <img
                        src={queen.image_url}
                        className="mb-4 img-fluid align-self-end"
                        style={{ maxWidth: "30rem", borderRadius: "10%" }}
                        alt="queens profile"
                    />
                </div>
                <div className="col-6">
                    <h1>{queen.name}</h1>
                    <div>
                        <h4 className="mt-2">Epic quote: </h4>
                        <div className="list-group">
                            <div className="list-group-item">
                                <i className="fas fa-hand-holding-heart me-1"></i>
                                <span>{queen.quote}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <h4>Season appearances & ranking:</h4>
                    <ul className="list-group">
                        {queen.seasons.map((season) => {
                            return (
                                <li className="list-group-item">
                                    <i className="fas fa-star me-2"></i>
                                    <span> Season {season.seasonNumber} </span>
                                    <span> Rank {season.place}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="col-6">
                    <h4>Episodes:</h4>
                    <ul className="list-group">
                        {queen.episodes.map((episode) => {
                            return (
                                <li className="list-group-item">
                                    <i className="fas fa-video me-2"></i>
                                    <span>"{episode.title}"</span>
                                    <span> season {episode.seasonId} </span>
                                    <span className="me-1">
                                        {" "}
                                        episode {episode.episodeInSeason}
                                    </span>
                                    <span>({episode.airDate})</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="col-6">
                    <h4>Challenges:</h4>
                    <ul className="list-group">
                        {queen.challenges.map((challenge) => {
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
                        })}
                    </ul>
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

export default Details;
