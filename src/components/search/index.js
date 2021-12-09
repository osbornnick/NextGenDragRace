import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Outlet } from "react-router";
import { searchQueens } from "../../services/queenService.js";

export const Search = () => {
    return (
        <div>
            <h1>Search</h1>
            <Outlet />
        </div>
    );
};

export const Results = () => {
    const { searchTerm } = useParams();
    const [results, setResults] = useState([]);
    useEffect(() => {
        console.log("requesting from API");
        searchQueens(searchTerm).then((res) => {
            console.log(res);
            setResults(res);
        });
    }, []);

    return (
        <>
            <h1>Results!</h1>
            {results ? JSON.stringify(results) : ""}
        </>
    );
};
