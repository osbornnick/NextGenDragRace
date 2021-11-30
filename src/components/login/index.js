import React, { useState } from "react";
import { login } from "../../services/userService.js";
import loadingImage from "../../svg/loading.svg";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleLogin = async () => {
        setLoading(true);
        await login(username, password)
            .then((code) => {
                if (code === "auth/invalid-email") {
                    setErrorMessage("Invalid e-mail.");
                } else if (code === "auth/invalid-password") {
                    setErrorMessage("Incorrect password");
                } else if (code === "auth/too-many-requests") {
                    setErrorMessage("Too many login requests.");
                } else {
                    navigate("/profile");
                    return false;
                }
                return true;
            })
            .then((shouldSet) => (shouldSet ? setLoading(false) : ""));
    };
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="mx-3 d-none d-md-block">
                <img
                    className="rounded img-fluid"
                    src="/images/rupaul.jpg"
                    alt="rupauls logo"
                />
            </div>
            <div className="card" style={{ minWidth: "25rem" }}>
                <div className="card-body">
                    <h5 className="card-title">RuPaul's Login</h5>
                    {loading ? (
                        <div className="d-flex justify-content-center">
                            <img src={loadingImage} alt="loading icon" />
                        </div>
                    ) : (
                        ""
                    )}

                    {errorMessage ? (
                        <div className="alert alert-danger">{errorMessage}</div>
                    ) : (
                        ""
                    )}
                    <div className="mb-1">
                        <label
                            htmlFor="exampleInputEmail1"
                            className="form-label"
                        >
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="pword" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="pword"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={handleLogin}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
