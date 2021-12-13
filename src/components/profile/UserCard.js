import { getAuth } from "@firebase/auth";

const UserCard = (props) => {
    const auth = getAuth();
    console.log(auth.currentUser);

    const { user, ownProfile } = props;
    const fullName =
        (user.firstName || user.lastName) &&
        (user.firstName || "") + " " + (user.lastName || "");
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">
                    <span className="me-2">@{user.handle}</span>
                    {user.verified ? (
                        <i
                            className="fas fa-certificate"
                            style={{ color: "lightblue" }}
                        ></i>
                    ) : (
                        ""
                    )}
                </h5>
                {fullName ? <p>{fullName}</p> : ""}
                <p className="card-text">{user.bio}</p>
                {ownProfile && (
                    <p className="text-muted">
                        Last login at:{" "}
                        {auth.currentUser.metadata.lastSignInTime}
                    </p>
                )}
            </div>
        </div>
    );
};

export default UserCard;
