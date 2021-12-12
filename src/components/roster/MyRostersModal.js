import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRostersForCurrentUser } from "../../services/rosterService";
import { addQueenToRoster } from "../../services/rosterService";

export const MyRostersModal = () => {
    const { myRosters } = useSelector((state) => state.myRosters);
    const dispatch = useDispatch();
    useEffect(() => getRostersForCurrentUser(dispatch), []);
    return (
        <div className="modal fade" id="rosterModal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add to which Roster?</h5>
                    </div>
                    <RosterList rosters={myRosters} dispatch={dispatch} />
                </div>
            </div>
        </div>
    );
};

const RosterList = (props) => {
    const { rosters, dispatch } = props;
    const { queen } = useSelector((state) => state.queen);
    const handleClick = (roster) => {
        addQueenToRoster(
            dispatch,
            {
                id: queen.id,
                name: queen.name,
            },
            roster
        );
    };
    return (
        <ul className="list-group-flush p-0">
            {rosters.map((r) => (
                <li
                    className="list-group-item list-group-item-action d-flex justify-content-between align-items-center fs-5"
                    key={r.id}
                    data-bs-dismiss="modal"
                    onClick={() => handleClick(r)}
                >
                    <span>{r.name}</span>
                    <span className="badge bg-secondary rounded-pill">
                        {r.queenCount}
                    </span>
                </li>
            ))}
        </ul>
    );
};
