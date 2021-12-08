import { useParams } from "react-router";

const OtherProfile = () => {
    const { id } = useParams();
    console.log("other profile");
    return JSON.stringify(id);
};

export default OtherProfile;
