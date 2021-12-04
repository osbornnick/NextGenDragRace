import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getQueenById } from "../../services/queenService";

const selectQueen = (state) => state.queen;

const Details = (props) => {
    const dispatch = useDispatch();
    const queen = useSelector(selectQueen);
    useEffect(() => {
        getQueenById(dispatch, props.id);
    }, []);
};

export default Details;
