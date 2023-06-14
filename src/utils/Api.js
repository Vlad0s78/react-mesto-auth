class Api {
  constructor({ baseUrl, headers }) {
    this._address = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  _request(endpoint, options) {
    return fetch(`${this._address}/${endpoint}`, options)
    .then(this._checkResponse);
  }

  getUserInfo() {
    return this._request(`users/me`, {
      method: "GET",
      headers: this._headers,
    });
  }

  updateUserInfo({ name, about }) {
    return this._request(`users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  getInitialCards() {
    return this._request(`cards`, {
      method: "GET",
      headers: this._headers,
    });
  }

  addNewCard({ name, link }) {
    return this._request(`cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  updateAvatar({ avatar }) {
    return this._request(`users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
  }

  deleteCardFromServer(cardId) {
    return this._request(`cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this._request(`cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
      });
    } else {
      return this._request(`cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
      });
    }
  }

  getUsers() {
    return this._request(`users`, {
      method: "GET",
      headers: this._headers,
    });
  }
}

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-64",
  headers: {
    authorization: "f64efd3e-3c8d-4834-a748-041ca1b1af96",
    "Content-Type": "application/json",
  },
});
