import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <h1>Home</h1>
            <Link to="login">Login page</Link>
        </>
    );
};

export default Home;
