const comments = (state = [], action) => {
    switch (action.type) {
        case "set-comments":
            return { comments: action.comments };
        case "add-comment":
            return { comments: [action.comment, ...state.comments] };
        default:
            return state;
    }
};

export default comments;
