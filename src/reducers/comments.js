const comments = (state = [], action) => {
    switch (action.type) {
        case "set-comments":
            return { comments: action.comments };
        case "add-comment":
            return { comments: [action.comment, ...state.comments] };
        case "delete-comment":
            return {
                comments: state.comments.map((c) =>
                    c.id === action.delete ? { ...c, isDeleted: true } : c
                ),
            };
        default:
            return state;
    }
};

export default comments;
