import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getUserDetails } from "../../services/userService";

const OtherProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    useEffect(() => getUserDetails(id).then((u) => setUser(u)), []);
    return JSON.stringify(user);
};

export default OtherProfile;
