const queens = (state = [], action) => {
    switch (action.type) {
        case "set-queens":
            return {
                queens: action.queens,
            };
        default:
            return state;
    }
};

export default queens;
