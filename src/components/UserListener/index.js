import { useDispatch } from "react-redux";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { getUserDetails } from "../../services/userService";

const UserListener = () => {
    const dispatch = useDispatch();
    onAuthStateChanged(getAuth(), (u) => {
        if (u) {
            getUserDetails(u.uid).then((user) =>
                dispatch({ type: "login", user })
            );
        } else {
            dispatch({ type: "logout" });
        }
    });
    return "";
};

export default UserListener;
