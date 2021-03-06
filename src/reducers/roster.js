const roster = (state = { roster: { queens: [] } }, action) => {
    switch (action.type) {
        case "set-roster":
            return { roster: action.roster };
        case "update-roster":
            return { roster: { ...state.roster, ...action.roster } };
        default:
            return state;
    }
};

export default roster;
