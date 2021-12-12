const currentUser = (state = { currentUser: null }, action) => {
    switch (action.type) {
        case "login":
            return {
                currentUser: action.user,
            };
        case "logout":
            return { currentUser: null };
        case "update-user":
            return { currentUser: action.currentUser };
        default:
            return state;
    }
};

export default currentUser;
