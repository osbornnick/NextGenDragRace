import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getQueenById } from "../../../services/queenService";
import { useParams } from "react-router-dom";
import CommentSection from "../../comment";
import "./queenImage.css"

const selectQueen = (state) => state.queen;

const Details = (props) => {
    const params = useParams();
    const dispatch = useDispatch();
    const { queen } = useSelector(selectQueen);
    useEffect(() => {
        getQueenById(dispatch, params.id);
    }, []);
    return (
        <>
            <div className = "row mb-3">
                <div className = "col-6">
                    <img src={queen.image_url} className="wd-queen-image mb-4"/>
                    <h4>
                        Season appearances & ranking:
                    </h4>
                        {
                            queen.seasons.map(season => {
                                return (
                                    <li className="list-group-item p-1 mb-2">
                                        <i className="fas fa-star"></i>
                                        <span > Season {season.seasonNumber} </span>
                                            <span> Rank {season.place}</span>
                                    </li>
                                )
                            })
                        }
                        <br/>
                        <h4>
                            Episodes:
                        </h4>
                        {
                            queen.episodes.map(episode => {
                                return (
                                    <li className="list-group-item p-2">
                                        <i className="fas fa-video me-1"></i>
                                        <span>"{episode.title}"</span>
                                        <span > season {episode.seasonId} </span>
                                        <span className="me-1"> episode {episode.episodeInSeason}</span>
                                        <span>({episode. airDate})</span>


                                    </li>
                                )
                            })
                        }

                </div>
                <div className="col-6">
                    <h2>
                        Introducing queen {queen.name}
                    </h2>
                    <br/>
                    <p >
                        <h4 className="mt-2">Epic quote: </h4>
                        <i className="fas fa-hand-holding-heart me-1"></i>
                        <span>{queen.quote}</span>
                    </p>
                    <br/>
                    <h4>
                        Challenges the queen had been through:
                    </h4>

                        {
                            queen.challenges.map(challenge => {
                                return (
                                    <li className="list-group-item">
                                        {challenge.won && <i className="fas fa-trophy me-1"></i>}
                                        {challenge.description}
                                    </li>
                                )
                            })
                        }

                </div>
            </div>

            {queen ? (
                <CommentSection parentEntityType="queens" parentId={queen.id} />
            ) : (
                ""
            )}
        </>
    );
};

export default Details;
