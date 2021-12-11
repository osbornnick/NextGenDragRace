import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setQueenById } from "../../../services/queenService";
import { useParams } from "react-router-dom";
import CommentSection from "../../comment";
import { MyRostersModal } from "../../roster/MyRostersModal";

const selectQueen = (state) => state.queen;

const Details = (props) => {
    const params = useParams();
    const dispatch = useDispatch();
    const { queen } = useSelector(selectQueen);
    const { currentUser } = useSelector((state) => state.currentUser);
    useEffect(() => {
        setQueenById(dispatch, params.id);
    }, []);
    return (
        <>
            {currentUser ? (
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
            ) : (
                ""
            )}

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
