const myRosters = (state = { myRosters: [] }, action) => {
    switch (action.type) {
        case "set-rosters":
            return {
                myRosters: action.myRosters,
            };
        case "add-roster":
            return { myRosters: [...state.myRosters, action.roster] };
        case "delete-roster":
            return {
                myRosters: state.myRosters.filter(
                    (r) => r.id !== action.roster.id
                ),
            };
        case "update-rosters":
            return {
                myRosters: state.myRosters.map((r) =>
                    r.id === action.roster.id ? action.roster : r
                ),
            };
        default:
            return state;
    }
};

export default myRosters;
