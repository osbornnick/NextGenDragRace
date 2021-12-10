export const Rosters = (props) => {
    const { rosters } = props;
    return <> {rosters ? JSON.stringify(rosters) : ""} </>;
};

export const Roster = (props) => {};
