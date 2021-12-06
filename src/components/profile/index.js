import React, { useState } from "react";
// import { useSelector } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserDetails } from "../../services/userService";

const Profile = () => {
    // const user = useSelector((state) => state.user);
    const auth = getAuth();
    const [user, setUser] = useState(null);
    onAuthStateChanged(auth, (u) => {
        if (u) {
            getUserDetails(u.uid).then((u) => setUser(u));
        } else {
            setUser(null);
        }
    });
    return (
        <>
            <h1>Profile</h1>
            {JSON.stringify(user)}
        </>
    );
};

export default Profile;
