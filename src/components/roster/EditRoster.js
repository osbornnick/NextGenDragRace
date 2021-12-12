import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRoster } from "../../services/rosterService";

const EditRoster = (props) => {
    const { setEditing } = props;
    const { roster } = useSelector((state) => state.roster);
    const [name, setName] = useState(roster.name);
    const [queens, setQueens] = useState(roster.queens);
    const [queenCount, setQueenCount] = useState(roster.queenCount);
    const [queensUpdated, setQueensUpdated] = useState(false);
    const dispatch = useDispatch();
    const handleSave = () => {
        const r = queensUpdated
            ? { ...roster, name, queens, queenCount }
            : { name, id: roster.id };
        updateRoster(dispatch, r);
        setEditing(false);
    };
    return (
        <div className="card" style={{ width: "40rem" }}>
            <div className="card-body">
                <div className="card-title d-flex align-items-center">
                    <h5 className="m-0">
                        <input
                            type="text"
                            className="form-control"
                            placeholder={roster.name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </h5>
                    <button
                        className="btn btn-secondary ms-auto"
                        onClick={() => setEditing(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-success ms-1"
                        onClick={() => handleSave()}
                    >
                        Save
                    </button>
                </div>
                <div className="card-text">
                    <ul className="list-group list-group-flush rounded mb-2">
                        {queens.map((queen, i) => (
                            <li className="list-group-item" key={i}>
                                {queen.name}
                                <i
                                    className="fas fa-times fa-pull-right"
                                    style={{
                                        color: "red",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => {
                                        setQueenCount(queenCount - 1);
                                        setQueens(
                                            queens.filter(
                                                (q) => q.id !== queen.id
                                            )
                                        );
                                        setQueensUpdated(true);
                                    }}
                                ></i>
                            </li>
                        ))}
                    </ul>
                    <div className="text-muted text-center">
                        Add new queens from their details page
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditRoster;
