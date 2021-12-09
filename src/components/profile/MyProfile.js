import { useSelector } from "react-redux";

const MyProfile = () => {
    const { currentUser } = useSelector((state) => state.currentUser);
    return (
        <>
            <h1>Profile</h1>
            {JSON.stringify(currentUser)}
            {/* STYLING HERE, ADD FUNCTIONALITY TO EDIT THIS */}
        </>
    );
};

export default MyProfile;
