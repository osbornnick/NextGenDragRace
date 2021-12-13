import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getUserDetails } from "../../services/userService";
import { getUsersRosters } from "../../services/rosterService";
import { getUsersComments } from "../../services/commentService";
import { useDispatch } from "react-redux";
import { CommentSummary } from "../comment";
import UserCard from "./UserCard";
import { RosterList } from "../roster";

const OtherProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [rosters, setRosters] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        getUserDetails(id).then(setUser);
        getUsersRosters(id).then(setRosters);
        getUsersComments(dispatch, id);
    }, []);
    if (!user) return "Loading...";
    return (
        <div className="row">
            <div className="col-lg-6 mb-2">
                <UserCard user={user} />
            </div>
            <div className="col-lg-6">
                <div className="mb-2">
                    <RosterList rosters={rosters} />
                </div>
                <CommentSummary />
            </div>
        </div>
    );
};

export default OtherProfile;
