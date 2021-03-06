import React, { useState } from "react";
import { createUser, updateCurrentUser } from "../../services/userService";
import { useNavigate } from "react-router";
import loadingImage from "../../svg/loading.svg";
import { useDispatch } from "react-redux";

const Register = (props) => {
    return (
        <div className="d-flex justify-content-center align-items-center h-100  mt-5">
            <div className="mx-3 d-none d-md-block">
                <img
                    className="rounded img-fluid"
                    src="/images/rupaul.jpg"
                    alt="rupauls logo"
                />
            </div>
            <RegistrationCard />
        </div>
    );
};

const RegistrationCard = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [handle, setHandle] = useState("");
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleRegister = async () => {
        let success = false;
        if (handle === "") {
            setErrorMessage("Please choose a handle");
            return;
        }
        setLoading(true);
        await createUser(username, password).then((code) => {
            if (code === "auth/invalid-email") {
                setErrorMessage("invalid e-mail");
            } else if (code === "auth/email-already-in-use") {
                setErrorMessage("An account already exists with this e-mail");
            } else if (code === "auth/weak-password") {
                setErrorMessage("Please choose a stronger password");
            } else if (code === "auth/admin-restricted-operation") {
                setErrorMessage("Please enter an Email and Password");
            } else if (code === "auth/internal-error") {
                setErrorMessage("Please try again");
            } else if (code === 200) {
                success = true;
            } else {
                console.log(code);
            }
        });
        setLoading(false);
        if (success) {
            updateCurrentUser(dispatch, {
                firstName,
                lastName,
                handle,
            });
            navigate("/privacy");
        }
    };
    const handleKeyPress = (e) => {
        if (e.code === "Enter") handleRegister();
    };
    return (
        <div className="card" style={{ minWidth: "25rem" }}>
            <div className="card-body">
                <h5 className="card-title">RuPaul's Registration</h5>
                {loading ? (
                    <div className="d-flex justify-content-center mb-2">
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
                <div className="row mb-2">
                    <div className="col-md-6">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="a"
                                id="handle"
                                onChange={(e) =>
                                    setHandle(e.target.value.replace(/\s/g, ""))
                                }
                            />
                            <label htmlFor="handle" className="form-label">
                                Handle
                            </label>
                        </div>
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-md-6">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                placeholder="first name"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <label htmlFor="firstName" className="form-label">
                                First Name
                            </label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                placeholder="last name"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <label htmlFor="lastName" className="form-label">
                                Last Name
                            </label>
                        </div>
                    </div>
                </div>
                <div className="form-floating mb-2">
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="email"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor="username" className="form-label">
                        Email
                    </label>
                </div>
                <div className="form-floating mb-2">
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="email"
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                </div>
                <button className="btn btn-primary" onClick={handleRegister}>
                    Register
                </button>
            </div>
        </div>
    );
};

export default Register;
