import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateRoster } from "../../services/rosterService";

const EditRoster = (props) => {
    const { roster, setEditing, queens, setRoster } = props;
    const [name, setName] = useState(roster.name);
    const [currentQueens, setCurrentQueens] = useState(queens);
    const dispatch = useDispatch();
    const handleSave = () => {
        updateRoster(dispatch, { ...roster, name });
        setRoster({ ...roster, name });
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
                        {currentQueens
                            ? currentQueens.map((queen, i) => (
                                  <li className="list-group-item" key={i}>
                                      {queen.name}
                                      <i
                                          className="fas fa-times fa-pull-right"
                                          style={{
                                              color: "red",
                                              cursor: "pointer",
                                          }}
                                          onClick={() =>
                                              setCurrentQueens(
                                                  currentQueens.filter(
                                                      (q) => q.id !== queen.id
                                                  )
                                              )
                                          }
                                      ></i>
                                  </li>
                              ))
                            : ""}
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
