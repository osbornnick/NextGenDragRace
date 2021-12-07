import React, { useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
    const { user } = useSelector((state) => state.user);
    return (
        <>
            <h1>Profile</h1>
            {JSON.stringify(user)}
        </>
    );
};

export default Profile;
