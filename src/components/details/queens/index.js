import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getQueenById } from "../../../services/queenService";
import { useParams } from "react-router-dom";
import CommentSection from "../../comment";

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
            {JSON.stringify(queen)} 
            {/* STYLING HERE */}
            {queen ? (
                <CommentSection parentEntityType="queens" parentId={queen.id} />
            ) : (
                ""
            )}
        </>
    );
};

export default Details;
