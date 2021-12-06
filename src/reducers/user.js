const user = (state = { user: null }, action) => {
    switch (action.type) {
        case "login":
            return {
                user: action.user,
            };
        case "logout":
            return { user: null };
        default:
            return state;
    }
};

export default user;
