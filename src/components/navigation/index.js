import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { logout } from "../../services/userService.js";

const Navbar = (props) => {
    const navigate = useNavigate();
    const auth = getAuth();
    const [user, setUser] = useState(null);
    onAuthStateChanged(auth, (u) => {
        if (u) setUser(u);
        else setUser(null);
    });
    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="home">
                    <img
                        src="/images/lipstick.png"
                        alt="go home"
                        height="32px"
                    />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* TODO: make active pages show active header */}
                        <li className="nav-item">
                            <Link to="profile" className="nav-link">
                                Profile
                            </Link>
                        </li>
                        {/* <li className="nav-item"></li>
                        <li className="nav-item"></li> */}
                    </ul>
                    <form className="d-flex me-2">
                        <input
                            className="form-control"
                            type="search"
                            placeholder="search..."
                            aria-label="search"
                        />
                    </form>
                    <LoginOrLogout user={user} />
                    <button type="button" className="btn btn-warning">
                        Sign Up
                    </button>
                </div>
            </div>
        </nav>
    );
};

const LoginOrLogout = (props) => {
    const { user } = props;
    const navigate = useNavigate();
    if (user) {
        return (
            <button
                type="button"
                className="btn btn-danger me-2"
                onClick={() => logout()}
            >
                Logout
            </button>
        );
    } else {
        return (
            <button
                type="button"
                className="btn btn-outline-light me-2"
                onClick={() => navigate("login")}
            >
                Login
            </button>
        );
    }
};

export default Navbar;