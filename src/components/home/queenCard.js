// TODO: make just images, mouse over to see name
export const QueenCard = (props) => {
    const { queen } = props;
    return (
        <div
            className="card p-0 m-2"
            style={{ maxWidth: "12rem", maxHeight: "12rem" }}
        >
            <div className="card-img-top overflow-hidden">
                <img
                    // className="card-img-top"
                    src={queen.image_url}
                    alt="queen's profile"
                    style={{ width: "15rem" }}
                />
            </div>
            <div className="card-body">
                <h6 className="card-title">{queen.name}</h6>
            </div>
        </div>
    );
};
