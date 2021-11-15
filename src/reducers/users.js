const user = (state = { user: null }, action) => {
    switch (action.type) {
        case "login":
            return { user: action.user };
        default:
            return state;
    }
};

export default user;
