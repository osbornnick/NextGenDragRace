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

export const NoSearchTerm = () => {
    return <h1>Search for something in the Navbar</h1>;
};

export const Results = () => {
    const { searchTerm } = useParams();
    console.log(searchTerm);
    const [results, setResults] = useState([]);
    useEffect(() => {
        searchQueens(searchTerm).then((res) => {
            setResults(res);
        });
    }, [searchTerm]);

    return (
        <>
            <h1>Results!</h1>
            {results ? JSON.stringify(results) : ""}
        </>
    );
};
