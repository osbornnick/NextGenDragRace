const queen = (state = [], action) => {
    switch (action.type) {
        case "set-queen":
            return {
                queen: action.queen,
            };
        default:
            return state;
    }
};

export default queen;
