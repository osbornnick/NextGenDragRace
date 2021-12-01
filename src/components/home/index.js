import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { paginateQueens } from "../../services/queenService";
import { useDispatch, useSelector } from "react-redux";
import { QueenCard } from "./queenCard";

const selectQueens = (state) => state.queens.queens;

const Home = () => {
    const dispatch = useDispatch();
    const queens = useSelector(selectQueens);
    useEffect(() => {
        paginateQueens(dispatch, null);
    }, []);
    return (
        <>
            <h1>Home</h1>
            <Link to="login">Login page</Link>
            <div className="row d-flex flex-row">
                {queens
                    ? queens.map((q) => <QueenCard queen={q} />)
                    : "loading queens"}
            </div>
        </>
    );
};

export default Home;
