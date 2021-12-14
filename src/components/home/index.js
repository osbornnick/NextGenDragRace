import React, { useEffect, useState } from "react";
import { paginateQueens } from "../../services/queenService";
import { useDispatch, useSelector } from "react-redux";
import { getAllSeasons } from "../../services/seasonService";
import Accordian from "../utils/Accordian";
import { useNavigate } from "react-router";
import { getNewestUser } from "../../services/userService";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";
import { CommentSummary } from "../comment";
import { getUsersComments } from "../../services/commentService";
// const selectQueens = (state) => state.queens;

const Home = () => {
    const dispatch = useDispatch();
    // const { queens } = useSelector(selectQueens);
    const { currentUser } = useSelector((state) => state.currentUser);
    const [newestUser, setNewestUser] = useState();

    useEffect(() => {
        paginateQueens(dispatch, 0);
        getNewestUser().then(setNewestUser);
        getUsersComments(dispatch, currentUser && currentUser.id);
    }, [dispatch, currentUser]);
    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-6">
                    <h1>NextGenDragRace</h1>
                    <h4 className="text-light">
                        All of the tea on the queens of Drag Race.
                    </h4>
                    <p>
                        Want to create your own dream team of queens? Register
                        up above and join the kiki!
                    </p>
                    <div className="mb-2">
                        {newestUser && <WelcomeNewestUser user={newestUser} />}
                    </div>
                    {currentUser && (
                        <CommentSummary title={"Your Recent Comments"} />
                    )}
                </div>
                <div className="col-xl-6">
                    <h3>Queens by Season</h3>
                    <Seasons />
                </div>
            </div>
            {/* <div className="row d-flex flex-row">
                {queens
                    ? queens.map((q, i) => <QueenImage queen={q} key={q.id} />)
                    : "loading queens"}
            </div> */}
        </div>
    );
};

const Seasons = () => {
    const [seasons, setSeasons] = useState([]);
    const navigate = useNavigate();
    useEffect(() => getAllSeasons().then(setSeasons), []);
    seasons.sort((a, b) => a.id - b.id);
    const queenMap = (queen) => (
        <li
            className="list-group-item list-group-item-action d-flex align-items-center"
            key={queen.id}
            onClick={() => navigate(`/details/queens/${queen.id}`)}
            style={{ cursor: "pointer" }}
        >
            {queen.place} {queen.name}{" "}
            {queen.place === 1 && (
                <i
                    className="fas fa-trophy ms-1"
                    style={{ color: "#FFD700" }}
                ></i>
            )}
            <i className="far fa-arrow-alt-circle-right ms-auto"></i>
        </li>
    );

    return seasons.map((season) => (
        <div className="mb-2">
            <Accordian
                name={"Season " + season.seasonNumber}
                mapFunction={queenMap}
                list={season.queens.sort((a, b) => a.place - b.place)}
            />
        </div>
    ));
};

const WelcomeNewestUser = (props) => {
    const { user } = props;
    return (
        <div className="card">
            <div className="card-body">
                <div className="card-text">
                    <h5 className="m-0">Welcome to our newest user,</h5>
                    <h5 className="my-1">
                        <span style={{ color: "pink" }}>@{user.handle}</span>!
                    </h5>
                    <div className="text-muted">
                        <div>
                            Joined{" "}
                            {DateTime.fromSeconds(
                                user.dateJoined.seconds
                            ).toRelative()}{" "}
                        </div>
                        <Link to={`/profile/${user.id}`} className="text-reset">
                            View their profile
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
