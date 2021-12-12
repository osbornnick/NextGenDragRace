import { getDoc } from "@firebase/firestore";

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

export const getQueenByRef = (ref) => {
    return getDoc(ref).then((snap) => {
        return { ...snap.data(), id: snap.id };
    });
};

// get queen by id
export const setQueenById = (dispatch, id) => {
    const url = API_URL + "/" + id;
    return fetch(url)
        .then((res) => res.json())
        .then((data) =>
            dispatch({
                type: "set-queen",
                queen: data,
            })
        );
};

export const getQueenById = (id) => {
    const url = API_URL + "/" + id;
    return fetch(url).then((res) => res.json());
};

// GET EVERY QUEEN I GUESS
export const searchQueens = (name) => {
    const url = `${API_URL}/all`;
    return fetch(url)
        .then((res) => res.json())
        .then((data) => {
            return data.filter((q) =>
                q.name.toLowerCase().includes(name.toLowerCase())
            );
        });
};
