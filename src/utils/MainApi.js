const BASE_URL = "https://api.movie.copy.project.nomoredomains.work";

function handleCheckResponse(res) {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка ${res.status}`);
    }
}

export const signUp = (name, email, password) => {
    console.log(email)
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  })
  .then((res) => handleCheckResponse(res));
};

export const signIn = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
    .then((res) => handleCheckResponse(res));
};

export const signOut = () => {
    return fetch(`${BASE_URL}/signout`, {
        method: "POST",
        credentials: "include",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
        },
    })
    .then((res) => {
        if (res.ok) {
            return res;
        } else {
            return Promise.reject(`Ошибка ${res.status}`);
        }
    });
};

export const getUserProfile = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        credentials: "include",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
    .then((res) => handleCheckResponse(res));
};

export const updateUserProfile = (name, email) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email }),
    })
    .then((res) => handleCheckResponse(res));
};

export const getSavedMovies = () => {
    return fetch(`${BASE_URL}/movies`, {
        method: "GET",
        credentials: "include",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
    })
    .then((res) => handleCheckResponse(res));
};

export const saveMovie = (movie) => {
    return fetch(`${BASE_URL}/movies`, {
        method: "POST",
        credentials: "include",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(movie),
    })
    .then((res) => handleCheckResponse(res));
};

export const deleteMovie = (movieId) => {
    return fetch(`${BASE_URL}/movies/${movieId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
    })
    .then((res) => handleCheckResponse(res));
};