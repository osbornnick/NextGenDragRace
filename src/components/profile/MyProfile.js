import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MyRosterList } from "../roster";
import { getRostersForCurrentUser } from "../../services/rosterService";
import { useNavigate } from "react-router";
import { CommentSummary } from "../comment";
import { getUsersComments } from "../../services/commentService";
import UserCard from "./UserCard";

const MyProfile = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.currentUser);
    const { myRosters } = useSelector((state) => state.myRosters);
    const navigate = useNavigate();
    useEffect(() => {
        getRostersForCurrentUser(dispatch);
        getUsersComments(dispatch, currentUser && currentUser.id);
    }, [currentUser]);
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
            <div className="col-lg-6 mb-2">
                <UserCard user={currentUser} />
            </div>
            <div className="col-lg-6">
                <div className="mb-2">
                    <MyRosterList rosters={myRosters} />
                </div>
                <CommentSummary />
            </div>
        </div>
    );
};

export default MyProfile;
