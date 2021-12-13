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
            <h1>NextGenDragRace: Home</h1>
            <h4 className= "text-light">
                All of the tea on the queens of Drag Race, in a non-boring layout.
            </h4>
            <p> Want to create your own dream team of queens? Register up above and join the kiki!</p>
            <h3> _ </h3>
            <div className="container">
            <div className="row d-flex flex-row ">
                <div className="col">
                <h3> Season (season_num) </h3>
                </div>
            </div>
            <div className="row d-flex flex-row">
                <h5>Click on a queen to view their stats and track record on the show </h5>
                {queens
                    ? queens.map((q, i) => <QueenImage queen={q} key={q.id} />)
                    : "loading queens"}
                </div>
            </div>
            <div> Powered by NoKeyNoShade API </div>
        </>
    );
};

export default Home;
