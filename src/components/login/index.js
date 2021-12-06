import React, { useState } from "react";
import Login from "./Login.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const LoginPage = () => {
    const [user, setUser] = useState(null);
    const auth = getAuth();
    onAuthStateChanged(auth, (u) => {
        if (u) setUser(u);
        else setUser(null);
    });
    return (
        <div className="d-flex justify-content-center align-items-center h-100 mt-5">
            <div className="mx-3 d-none d-md-block">
                <img
                    className="rounded img-fluid"
                    src="/images/rupaul.jpg"
                    alt="rupauls logo"
                />
            </div>
            {user ? "You are currently logged in" : <Login />}
        </div>
    );
};

export default LoginPage;
