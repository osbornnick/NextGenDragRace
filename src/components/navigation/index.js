import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { logout } from "../../services/userService.js";
import { useSelector } from "react-redux";

const Navbar = (props) => {
    const { currentUser } = useSelector((state) => state.currentUser);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="home">
                    <img src="/images/logo.png" alt="go home" height="50px" />
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
                    <span className="navbar-toggler-icon"></span>
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
                    <LoginOrLogout user={currentUser} />
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
            <>
                <button
                    type="button"
                    className="btn btn-outline-light me-2"
                    onClick={() => navigate("login")}
                >
                    Login
                </button>
                <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => navigate("register")}
                >
                    Sign Up
                </button>
            </>
        );
    }
};

export default Navbar;
