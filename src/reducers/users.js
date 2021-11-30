const user = (state = { user: null }, action) => {
    switch (action.type) {
        case "login":
            return { user: action.user };
        case "error":
            // console.log(action.error);
            return state;
        default:
            return state;
    }
};

export default user;
