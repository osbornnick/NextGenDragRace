const UserCard = (props) => {
    const { user } = props;
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
            </div>
        </div>
    );
};

export default UserCard;
