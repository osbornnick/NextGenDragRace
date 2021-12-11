import { useState, useEffect } from "react";
import { getRostersQueens } from "../../services/rosterService";

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
    useEffect(() => getRostersQueens(id).then(setQueens), []);
    return (
        <ul className="list-group">
            {queens
                ? queens.map((queen, i) => (
                      <li className="list-group-item" key={i}>
                          {queen.name} {JSON.stringify(queen)}
                      </li>
                  ))
                : ""}
        </ul>
    );
};

export const RosterList = (props) => {
    const { rosters } = props;
    return (
        <ul className="list-group">
            {rosters.map((r) => (
                <li className="list-group-item list-group-item-action" key={r.id}>
                    {r.name}
                </li>
            ))}
        </ul>
    );
};
