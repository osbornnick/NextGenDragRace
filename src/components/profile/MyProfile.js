import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MyRosterList } from "../roster";
import { getRostersForCurrentUser } from "../../services/rosterService";
import { useNavigate } from "react-router";

const MyProfile = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.currentUser);
    const { myRosters } = useSelector((state) => state.myRosters);
    const [myComments, setMyComments] = useState([]);
    const navigate = useNavigate();
    useEffect(() => getRostersForCurrentUser(dispatch), [currentUser]);
    if (!currentUser)
        return (
            <div className="row h-100">
                <div className="col d-flex justify-content-center align-items-center flex-column h-100">
                    <h1>Login or Signup</h1>
                    <div>
                        <button
                            type="button"
                            className="btn btn-outline-light me-2"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            className="btn btn-warning"
                            onClick={() => navigate("/register")}
                        >
                            Sign Up
                        </button>{" "}
                    </div>
                </div>
            </div>
        );
    return (
        <div className="row">
            <div className="col-6">
                <div className="d-flex align-items-center mb-2">
                    <h3 className="pe-2 m-0">@{currentUser.handle}</h3>
                    {currentUser.verified ? (
                        <i
                            className="fas fa-certificate"
                            style={{ color: "lightblue" }}
                        ></i>
                    ) : (
                        ""
                    )}
                </div>
            </div>
            <div className="col-6">
                <MyRosterList rosters={myRosters} />
            </div>
            {/* STYLING HERE, ADD FUNCTIONALITY TO EDIT THIS */}
        </div>
    );
};

export default MyProfile;
