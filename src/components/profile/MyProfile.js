import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MyRosterList } from "../roster";
import { getRostersForCurrentUser } from "../../services/rosterService";
import { useNavigate } from "react-router";
import { CommentSummary } from "../comment";
import { getUsersComments } from "../../services/commentService";
import { updateCurrentUser } from "../../services/userService";
import UserCard from "./UserCard";

const MyProfile = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.currentUser);
    const { myRosters } = useSelector((state) => state.myRosters);
    const [editing, setEditing] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        getRostersForCurrentUser(dispatch);
        getUsersComments(dispatch, currentUser && currentUser.id);
    }, [dispatch, currentUser]);
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
                {editing ? (
                    <EditUser setEditing={setEditing} />
                ) : (
                    <>
                        <UserCard user={currentUser} ownProfile />
                        <div className="d-flex justify-content-center align-items-center">
                            <button
                                className="btn btn-danger m-2"
                                onClick={() => setEditing(true)}
                            >
                                Edit Profile
                            </button>
                        </div>
                    </>
                )}
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

const EditUser = (props) => {
    const { setEditing } = props;
    const { currentUser } = useSelector((state) => state.currentUser);
    const [userDetails, setUserDetails] = useState(currentUser);
    const dispatch = useDispatch();
    if (!currentUser) return "Loading";
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">
                        <div className="input-group">
                            <div className="input-group-text">@</div>
                            <input
                                type="text"
                                placeholder={currentUser.handle}
                                className="form-control"
                                onChange={(e) =>
                                    setUserDetails({
                                        ...userDetails,
                                        handle: e.target.value.replace(
                                            /\s/g,
                                            ""
                                        ),
                                    })
                                }
                            />
                        </div>
                    </h5>
                    <p className="card-text">
                        <div className="row mb-2">
                            <div className="col">
                                <label
                                    htmlFor="firstName"
                                    className="form-label"
                                >
                                    First name
                                </label>
                                <input
                                    type="text"
                                    placeholder={currentUser.firstName || ""}
                                    className="form-control"
                                    id="firstName"
                                    onChange={(e) =>
                                        setUserDetails({
                                            ...userDetails,
                                            firstName: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="col">
                                <label
                                    htmlFor="lastName"
                                    className="form-label"
                                >
                                    Last name
                                </label>
                                <input
                                    type="text"
                                    placeholder={currentUser.lastName || ""}
                                    className="form-control"
                                    id="lastName"
                                    onChange={(e) =>
                                        setUserDetails({
                                            ...userDetails,
                                            lastName: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <textarea
                            className="form-control"
                            onChange={(e) =>
                                setUserDetails({
                                    ...userDetails,
                                    bio: e.target.value,
                                })
                            }
                            defaultValue={userDetails.bio}
                        />
                    </p>
                </div>
            </div>
            <div className="d-flex justify-content-center align-items-center">
                <button
                    className="btn btn-secondary m-2"
                    onClick={() => setEditing(false)}
                >
                    Cancel
                </button>
                <button
                    className="btn btn-success m-2"
                    onClick={() => {
                        updateCurrentUser(dispatch, userDetails);
                        setEditing(false);
                    }}
                >
                    Save
                </button>
            </div>
        </>
    );
};

export default MyProfile;
