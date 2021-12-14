import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setQueenById } from "../../../services/queenService";
import { useParams } from "react-router-dom";
import CommentSection from "../../comment";
import { MyRostersModal } from "../../roster/MyRostersModal";
import Accordian from "../../utils/Accordian";

const selectQueen = (state) => state.queen;

const Details = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { queen } = useSelector(selectQueen);
    const { currentUser } = useSelector((state) => state.currentUser);
    useEffect(() => {
        setQueenById(dispatch, params.id);
    }, [dispatch, params.id]);
    if (!queen) return "Loading";
    return (
        <>
            <div className="row mb-3">
                <div className="col-md-6 d-flex">
                    <img
                        src={queen.image_url}
                        className="img-fluid mx-auto col-lg-8 col-12 mb-2"
                        style={{ borderRadius: "10%" }}
                        alt="queens profile"
                    />
                </div>
                <div className="col-md-6 d-flex flex-column justify-content-center">
                    <div className="mb-4">
                        <h1 className="d-flex">
                            {queen.name}{" "}
                            <span className="ms-auto">
                                <AddToRosterButton currentUser={currentUser} />
                            </span>
                        </h1>
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
                            {queen.seasons.map((season, i) => {
                                return (
                                    <li className="list-group-item" key={i}>
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

const AddToRosterButton = (props) => {
    const { currentUser } = props;
    if (currentUser)
        return (
            <>
                <button
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#rosterModal"
                >
                    Add to Roster
                </button>
                <MyRostersModal />
            </>
        );
    return "";
};

const episodeMap = (episode, i) => {
    return (
        <li className="list-group-item d-flex align-items-center" key={i}>
            <i className="fas fa-video me-2"></i>
            <span>
                "{episode.title}" S{episode.seasonId} E{episode.episodeInSeason}
                ({episode.airDate})
            </span>
        </li>
    );
};

const challengeMap = (challenge, i) => {
    return (
        <li className="list-group-item d-flex align-items-center" key={i}>
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

export default Details;
