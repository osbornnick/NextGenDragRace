import { useState, useEffect } from "react";
import { getRostersQueens, getRoster } from "../../services/rosterService";
import { useNavigate } from "react-router";
import EditRoster from "./EditRoster";
import { useSelector } from "react-redux";

export const Rosters = (props) => {
    const { rosters } = props;
    return (
        <div className="row">
            <div className="col">
                <h1>Rosters</h1>
                <ul className="list-group">
                    {rosters.map((ros) => (
                        <li className="list-group-item" key={ros.id}>
                            <span>{ros.name}</span>
                            <Roster id={ros.id} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export const Roster = (props) => {
    const { id } = props;
    const [queens, setQueens] = useState([]);
    const [roster, setRoster] = useState({});
    const [editing, setEditing] = useState(false);
    const { currentUser } = useSelector((state) => state.currentUser);
    const navigate = useNavigate();
    useEffect(() => {
        getRoster(id).then(setRoster);
        getRostersQueens(id).then(setQueens);
    }, []);
    if (editing)
        return (
            <EditRoster
                roster={roster}
                setEditing={setEditing}
                queens={queens}
                setRoster={setRoster}
            />
        );
    return (
        <div className="card" style={{ width: "40rem" }}>
            <div className="card-body">
                <div className="card-title d-flex align-items-center">
                    <h5 className="m-0">{roster.name}</h5>
                    {currentUser && currentUser.id === roster.user ? (
                        <button
                            className="btn btn-info ms-auto"
                            onClick={() => setEditing(true)}
                        >
                            Edit Roster
                        </button>
                    ) : (
                        ""
                    )}
                </div>
                <div className="card-text">
                    <ul className="list-group list-group-flush rounded">
                        {queens
                            ? queens.map((queen, i) => (
                                  <li
                                      className="list-group-item list-group-item-action"
                                      onClick={() =>
                                          navigate(
                                              `/details/queens/${queen.id}`
                                          )
                                      }
                                      key={i}
                                  >
                                      {queen.name}
                                  </li>
                              ))
                            : ""}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export const RosterList = (props) => {
    const { rosters } = props;
    const navigate = useNavigate();
    return (
        <ul className="list-group">
            {rosters.map((r) => (
                <li
                    className="list-group-item  list-group-item-action"
                    key={r.id}
                    onClick={() => navigate(`/details/rosters/${r.id}`)}
                >
                    {r.name}
                </li>
            ))}
        </ul>
    );
};
