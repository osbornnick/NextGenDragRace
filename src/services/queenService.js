const API_URL = "http://www.nokeynoshade.party/api/queens";

export const paginateQueens = async (dispatch, offset) => {
    const limit = 10;
    let url;
    if (offset > 0) {
        url = `${API_URL}?limit=${limit}&offset=${offset}`;
    } else {
        url = `${API_URL}?limit=${limit}`;
    }
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            dispatch({ type: "set-queens", queens: data });
        });
};

// get queen by id
export const getQueenById = async (dispatch, id) => {
    const url = API_URL + "/" + id;
    fetch(url)
        .then((res) => res.json())
        .then((data) =>
            dispatch({
                type: "set-queen",
                queen: data,
            })
        );
};
