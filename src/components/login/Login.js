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
                } else if (code === "auth/wrong-password") {
                    setErrorMessage("Incorrect password");
                } else if (code === "auth/too-many-requests") {
                    setErrorMessage("Too many login requests.");
                } else if (code === "auth/internal-error") {
                    setErrorMessage("Please enter a password.");
                } else if (code === 200) {
                    navigate("/profile");
                    return false;
                }
                return true;
            })
            .then((shouldSet) => (shouldSet ? setLoading(false) : ""));
    };
    const handleKeyPress = (e) => {
        if (e.code === "Enter") handleLogin();
    };
    return (
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
                <div className="mb-2 form-floating">
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail"
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="a"
                    />
                    <label htmlFor="exampleInputEmail" className="form-label">
                        Email address
                    </label>
                </div>
                <div className="mb-2 form-floating">
                    <input
                        type="password"
                        className="form-control"
                        id="pword"
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="a"
                    />
                    <label htmlFor="pword" className="form-label">
                        Password
                    </label>
                </div>
                <button className="btn btn-primary me-2" onClick={handleLogin}>
                    Login
                </button>
                <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => navigate("/register")}
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default Login;
