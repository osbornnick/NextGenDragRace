import React, { useEffect } from "react";
import { paginateQueens } from "../../services/queenService";
import { useDispatch, useSelector } from "react-redux";
import { QueenImage } from "./queenCard";

const selectQueens = (state) => state.queens;

const Home = () => {
    const dispatch = useDispatch();
    const { queens } = useSelector(selectQueens);
    useEffect(() => {
        paginateQueens(dispatch, 0);
    }, []);
    return (
        <>
            <h1>Home</h1>
            <div className="row d-flex flex-row">
                {queens
                    ? queens.map((q, i) => <QueenImage queen={q} key={q.id} />)
                    : "loading queens"}
            </div>
        </>
    );
};

export default Home;
