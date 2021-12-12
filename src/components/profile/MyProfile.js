import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MyRosterList } from "../roster";
import { getRostersForCurrentUser } from "../../services/rosterService";

const MyProfile = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.currentUser);
    const { myRosters } = useSelector((state) => state.myRosters);
    useEffect(() => getRostersForCurrentUser(dispatch), [currentUser]);
    return (
        <>
            <h1>Profile</h1>
            {JSON.stringify(currentUser)}
            {/* STYLING HERE, ADD FUNCTIONALITY TO EDIT THIS */}
            <div className="row">
                <div className="col">
                    <MyRosterList rosters={myRosters} />
                </div>
            </div>
        </>
    );
};

export default MyProfile;
