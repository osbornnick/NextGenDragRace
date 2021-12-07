const comments = (state = [], action) => {
    switch (action.type) {
        case "set-comments":
            return action.comments;
        case "add-comment":
            return [action.comment, ...state.comments];
        default:
            return state;
    }
};

export default comments;
