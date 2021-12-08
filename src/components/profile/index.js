import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
    const { currentUser } = useSelector((state) => state.currentUser);
    return (
        <>
            <h1>Profile</h1>
            {JSON.stringify(currentUser)}
        </>
    );
};

export default Profile;
