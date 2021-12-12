import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getUserDetails } from "../../services/userService";
import { getUsersRosters } from "../../services/rosterService";
import { getUsersComments } from "../../services/commentService";
import { useDispatch, useSelector } from "react-redux";

const OtherProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [rosters, setRosters] = useState([]);
    const { comments } = useSelector((state) => state.comments);
    const dispatch = useDispatch();

    useEffect(() => {
        getUserDetails(id).then(setUser);
        getUsersRosters(id).then(setRosters);
        getUsersComments(dispatch, id);
    }, []);
    if (!user) return "Loading...";
    return (
        <>
            {JSON.stringify(user)}
            {JSON.stringify(rosters)}
            {JSON.stringify(comments)};
        </>
    );
};

export default OtherProfile;
