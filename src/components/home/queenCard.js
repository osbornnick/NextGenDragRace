export const QueenCard = (queen) => {
    queen = queen.queen;
    return (
        <div
            className="card p-0 m-2"
            style={{ maxWidth: "18rem", maxHeight: "25rem" }}
        >
            <div className="card-img-top overflow-hidden">
                <img
                    // className="card-img-top"
                    src={queen.image_url}
                    alt="queen's profile"
                    style={{ width: "18rem" }}
                />
            </div>
            <div className="card-body">
                <h5 className="card-title">{queen.name}</h5>
                <div className="card-text">Just some sample text</div>
                <a href="#" className="btn btn-secondary">
                    See more
                </a>
            </div>
        </div>
    );
};
