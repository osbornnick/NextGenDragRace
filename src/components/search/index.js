import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Outlet } from "react-router";
import { searchQueens } from "../../services/queenService.js";
import { countComments } from "../../services/commentService.js";
import { useNavigate } from "react-router";

export const Search = () => {
    return (
        <div>
            <h1>Search</h1>
            <Outlet />
        </div>
    );
};

export const NoSearchTerm = () => {
    return <h1>Search for something in the Navbar</h1>;
};

export const Results = () => {
    const { searchTerm } = useParams();
    const [results, setResults] = useState([]);
    useEffect(() => {
        searchQueens(searchTerm).then((res) => {
            setResults(res);
        });
    }, [searchTerm]);

    return (
        <>
            <div className="ms-2">
                <h5>
                    <span style={{ opacity: 0.5 }}>You searched: </span>
                    {searchTerm}
                </h5>
                <h5>{results.length} Result(s)</h5>
            </div>
            <div className="row justify-content-center">
                <div className="col d-flex justify-content-center">
                    <ul className="list-group" style={{ maxWidth: "50rem" }}>
                        {results
                            ? results.map((r, i) => (
                                  <Result
                                      queen={r}
                                      searchTerm={searchTerm}
                                      key={i}
                                  />
                              ))
                            : ""}
                    </ul>
                </div>
            </div>
        </>
    );
};

const Result = (props) => {
    const { queen, searchTerm } = props;
    const navigate = useNavigate();
    const handleClick = () => navigate(`/details/queens/${queen.id}`);
    const [numComments, setNumComments] = useState(0);
    useEffect(
        () =>
            countComments("queens", queen.id).then((size) =>
                setNumComments(size)
            ),
        [queen]
    );
    return (
        <li
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            onClick={handleClick}
            style={{ cursor: "pointer" }}
        >
            <div>
                <div className="fs-5">
                    {boldSubstring(queen.name, searchTerm)}{" "}
                    {queen.winner ? (
                        <i
                            className="fas fa-chess-queen"
                            style={{ color: "#FFD700" }}
                        ></i>
                    ) : (
                        ""
                    )}
                    {queen.missCongeniality ? (
                        <i className="fas fa-bolt text-success"></i>
                    ) : (
                        ""
                    )}
                </div>
                <div>"{queen.quote}"</div>
            </div>
            <span className="badge bg-primary rounded-pill mx-1">
                {numComments}
            </span>
        </li>
    );
};

const boldSubstring = (string, substring) => {
    const index = string.toLowerCase().indexOf(substring.toLowerCase());

    return (
        <>
            {string.substring(0, index)}
            <span className="fw-bolder">
                {string.substring(index, index + substring.length)}
            </span>
            {string.substring(index + substring.length)}
        </>
    );
};
