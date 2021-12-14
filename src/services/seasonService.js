const API_URL = "https://www.nokeynoshade.party/api/seasons";

export const getSeasonsQueens = (seasonId) => {
    const url = `${API_URL}/${seasonId}/queens`;
    return fetch(url).then((res) => res.json());
};

export const getAllSeasons = () => {
    const url = API_URL;
    return fetch(url).then((res) => res.json());
};
