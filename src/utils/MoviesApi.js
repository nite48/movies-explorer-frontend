export const BASE_URL = "https://api.nomoreparties.co/beatfilm-movies";

function handleCheckResponse(res) {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка ${res.status}`);
    }
}

export const getAllMovies = () => {
    return fetch(`${BASE_URL}/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
    .then((res) => handleCheckResponse(res));
};