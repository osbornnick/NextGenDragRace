const myRosters = (state = { myRosters: [] }, action) => {
    switch (action.type) {
        case "set-rosters":
            return {
                myRosters: action.myRosters,
            };
        case "add-roster":
            return { rosters: [...state.myRosters, action.roster] };
        case "delete-roster":
            return null;
        default:
            return state;
    }
};

export default myRosters;
