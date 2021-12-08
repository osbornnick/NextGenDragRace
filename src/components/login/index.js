import React from "react";
import Login from "./Login.js";
import { useSelector } from "react-redux";

const LoginPage = () => {
    const { currentUser } = useSelector((state) => state.currentUser);
    return (
        <div className="d-flex justify-content-center align-items-center h-100 mt-5">
            <div className="mx-3 d-none d-md-block">
                <img
                    className="rounded img-fluid"
                    src="/images/rupaul.jpg"
                    alt="rupauls logo"
                />
            </div>
            {currentUser ? "You are currently logged in" : <Login />}
        </div>
    );
};

export default LoginPage;
