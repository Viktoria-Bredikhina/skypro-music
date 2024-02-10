export async function getTracksAll() {
  const response = await fetch(
    "https://skypro-music-api.skyeng.tech/catalog/track/all/",
    {
      method: "GET",
    }
  );
  if (!response.ok) {
    throw new Error("Ошибка сервера");
  }
  const data = await response.json();
  return data;
}

export async function RegistrationApi(email, password) {
  return fetch("https://skypro-music-api.skyeng.tech/user/signup/", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      username: email,
    }),
    headers: {
      "content-type": "application/json",
    },
  })
    .catch((error) => {
      if (error.message === "Failed to fetch") {
        throw new Error("Нет подключения к интернету");
      }
    })
    .then((response) => {
      if (response.status === 400) {
        return response.json().then((errorResponse) => {
          if (errorResponse.username) {
            throw new Error(errorResponse.username);
          }
          if (errorResponse.email) {
            throw new Error(errorResponse.email);
          }
          if (errorResponse.password) {
            throw new Error(errorResponse.password);
          }
        });
      }
      if (response.status === 500) {
        throw new Error("Сервер сломался");
      }
      return response.json();
    });
}

export async function LoginApi(email, password) {
  return fetch("https://skypro-music-api.skyeng.tech/user/login/", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "content-type": "application/json",
    },
  })
    .catch((error) => {
      if (error.message === "Failed to fetch") {
        throw new Error("Нет подключения к интернету");
      }
    })
    .then((response) => {
      if (response.status === 400) {
        return response.json().then((errorResponse) => {
          if (errorResponse.email) {
            throw new Error(errorResponse.email);
          }
          if (errorResponse.password) {
            throw new Error(errorResponse.password);
          }
          throw new Error("Произошла неизвестная ошибка.");
        });
      }
      if (response.status === 401) {
        return response.json().then((errorResponse) => {
          throw new Error(errorResponse.detail);
        });
      }
      return response.json();
    });
}